import React, { useState, useContext } from 'react'
import SignInAnime from './SignInAnime'
import firebase from 'firebase'
import fire from '../Fire'
import '../../css/login.css'
import { UserAuthContext } from '../contexts/UserAuthContext'
import { FireContext } from '../contexts/FireContext'
import { GroupContext } from '../contexts/GroupContext'
import { AlertContext } from '../contexts/AlertContext'
const LoginPage = (props) => {
    const { updateUserData, userData } = useContext(UserAuthContext)    
    const { applyMember, getQuizs } = useContext(FireContext)
    const { setQuizs } = useContext(GroupContext)
    const { updateAlertMsg, toggleAlert } = useContext(AlertContext)
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ status, setStatus ] = useState(false)
    const checkLoginInfo = () => {
        if (email === '' || password === '') {
            updateAlertMsg('請輸入正確資訊')            
            return false
        }
        if (email.length < 4 || !email.includes('@')) {
            updateAlertMsg('請輸入正確 E-mail 地址')
            return false
        }
        if (password.length < 6) {
            updateAlertMsg('請輸入大於六位數密碼')
            return false
        }     
        return true   
    }
    const googleLogin = () => {
        let provider = new firebase.auth.GoogleAuthProvider()
        fire.auth().signInWithPopup(provider).then((result) => {
            let user = result.user
            fire.firestore().collection('MemberShip').doc(user.uid).get().then((doc) => {
                if (doc.exists) {
                    updateUserData({auth: true, uid: user.uid, NAME: doc.data().NAME})
                } else {
                    applyMember(user.uid, user.email, user.displayName)
                    updateUserData({auth: true, uid: user.uid, NAME: user.displayName})
                }
                getQuizs(setQuizs)
                localStorage.setItem('user', JSON.stringify({uid: user.uid, name: doc.data().NAME}))
            })
        }).then(() => {
            setTimeout(() => { props.history.push('/') }, 4700)
        })
    }
    const login = () => {
        if(!checkLoginInfo()){
            return
        }
        fire.auth().signInWithEmailAndPassword(email, password).then(() => {
            let userUid = fire.auth().currentUser.uid
            fire.firestore().collection('MemberShip').doc(userUid).get().then((doc) => {
                if (doc.exists) {
                    updateUserData({auth: true, uid: userUid, NAME: doc.data().NAME})
                    localStorage.setItem('user', JSON.stringify({uid: userUid, name: doc.data().NAME}))
                }
            })
            getQuizs(setQuizs)
        }).then(() => {
            setTimeout(() => { props.history.push('/') }, 4700)
        }).catch((error) => {
            if (error.code.slice(5, error.code.length) === 'wrong-password') {
                updateAlertMsg('糟糕！密碼打錯囉')
                toggleAlert()                
            } else {
                updateAlertMsg('糟糕！密碼打錯囉')
                toggleAlert()                
            }
        })
    }
    const signUp = () => {
        if(!checkLoginInfo()){
            return
        }
        if (name === '') {
            updateAlertMsg('請輸入您的姓名')
            return
        }
        let userUid;
        fire.auth().createUserWithEmailAndPassword(email, password).then(() => {
            userUid = fire.auth().currentUser.uid
            localStorage.setItem('user', JSON.stringify({uid: userUid, name: name}))
            updateUserData({auth: true, uid: userUid, NAME: name})
            getQuizs(setQuizs)
        }).then(() => {
            userUid = fire.auth().currentUser.uid
            applyMember(userUid, email, name)
        }).then(() => {
            fire.auth().currentUser.sendEmailVerification()
        }).then(() => {
            setTimeout(() => { props.history.push('/') }, 4700)
        }).catch((error) => {
            console.log('Error getting documents: ', error)
        })
    }
    
    return (
        <>            
            <SignInAnime animeClass={userData.auth ? 'signAnime fadeAnime': 'hide'} />
            <div className={userData.auth ? 'hide' : 'loginContainer container'}>            
                <div className='sign'>
                    <button className='loginButton' onClick={() => setStatus(true)}>會員登入</button>
                    <button className='loginButton' onClick={() => setStatus(false)}>申請會員</button>
                </div>
                {status ? (
                    <div className='login'>
                        <div className='loginZone'>
                            <div className='loginText'>會員登入</div>
                            <div className='subtext'>請輸入您的會員帳號</div>
                            <div className='text2'>帳號</div>
                            <input type='email' id='signInEmail' placeholder='測試帳號：test@test.com' value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <div className='text2'>密碼</div>
                            <input type='password' id='signInPW' value={password} placeholder='測試密碼：123456' onChange={(e)=>setPassword(e.target.value)} />
                            <button onClick={login} className='signButton'>登入</button>
                            <button className='googleSignButton' onClick={googleLogin}>用 Google 帳號登入</button>
                        </div>
                    </div>) : (
                    < div className='signUp' >
                        <div className='loginText'>會員申請</div>
                        <div className='subtext'>加入會員享受更多方便功能</div>
                        <div className='text2'>姓名</div>
                        <input type='text' id='signUpName' placeholder='請輸入您的姓名' value={name} onChange={(e)=>setName(e.target.value)} />
                        <div className='text2'>帳號</div>
                        <input type='text' id='signUpEmail' placeholder='請輸入您的E-mail' value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <div className='text2'>密碼</div>
                        <input type='password' id='signUpPW' placeholder='您的密碼長度必須 6 位數以上' value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <button onClick={signUp} className='signButton'>送出</button>
                    </div >)
                }
            </div>
        </>
    )
}

export default LoginPage