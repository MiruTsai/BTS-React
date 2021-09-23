import React, { useContext, useState, useEffect } from 'react'
import Logo from './Logo'
import Groups from './Groups'
import { UserAuthContext } from '../contexts/UserAuthContext'
import { AlertContext } from '../contexts/AlertContext'
import { GroupContext } from '../contexts/GroupContext'
import { FireContext } from '../contexts/FireContext'

const IndexPic = () => {
    const { groupName } = useContext(GroupContext)
    return (
        <div className='groupPic'>
            <img src={'/img/group/' + groupName + '.jpg'} className='indexPic' />
        </div>
    )
}

const Index = (props) => {
    const { userData, updateUserData } = useContext(UserAuthContext)
    const { getQuizs, getGroupInfo, getUserInfo } = useContext(FireContext)
    const { updateAlertMsg } = useContext(AlertContext)
    const { setQuizs, groupName, groupInfo, setGroupInfo } = useContext(GroupContext)   
 
    // 有先前登入紀錄
    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            getUserInfo(user.uid, updateUserData)            
        }
        getGroupInfo(updateGroupInfo)
    }, [])
    useEffect(() => {        
        getQuizs(setQuizs)
        
    }, [groupName])
    const checkIfLogin = () => {
        if (!userData.auth) {
            updateAlertMsg('請登入會員')
            return false;
        }
        return true;
    }
    const updateGroupInfo = (res) => {
        setGroupInfo(prev => {
            return { ...prev, ...res }
        })
    }
    const entrySwitch = (entryPoint) => {
        if (checkIfLogin()) {
            switch (entryPoint) {
                case 'quizBoard':
                    props.history.push('/quizBoard')
                    break
                case 'profile':
                    props.history.push('/profile')
                    break
                case 'album':
                    props.history.push('/album')
                    break
                case 'addQuiz':
                    props.history.push('/addQuiz')
                    break
                case 'preTest':
                    props.history.push('/preTest')
                    break
            }
        } else {
            props.history.push('/LoginPage')
        }
    }
    return (
        <div className='indexContainer container'>
            <div className='leftSide'>
                <div className='mobile_user member' onClick={() => entrySwitch('profile')}>
                    <i className='fas fa-user'></i>
                </div>
                <div className='index-textZone'>
                    <h3>{groupInfo[groupName].mainDesc || 'Love yourself. Love myself. Peace!'}</h3>
                    <div className='title'>{groupInfo[groupName].name || 'BTS'} Too Much Information</div>
                    <h5>{groupInfo[groupName].subDesc || 'I have come to love myself for who I am, for who I was, and for who I hope to become.'}</h5>
                </div>
                <div className='selectGroup'>
                    <Groups />
                </div>
                <div className='iconZone'>
                    <div className='indexIcon hvr-push' onClick={() => entrySwitch('quizBoard')}>                    
                        <i className='far fa-edit' />
                        <div className='iconText'>測驗模式</div>
                    </div>
                    <div className='indexIcon hvr-push' onClick={() => entrySwitch('preTest')}>
                        <i className='far fa-clock' />
                        <div className='iconText'>模擬搶票</div>
                    </div>
                    <div className='indexIcon hvr-push' onClick={() => entrySwitch('addQuiz')}>
                        <i className='far fa-list-alt' />
                        <div className='iconText'>我要出題</div>
                    </div>
                    {/* <div className='indexIcon hvr-push' onClick={() => this.albumEntry()}>
                            <i className='fas fa-music'></i>
                                <div className='iconText'>歷年專輯</div>
                            </div> */}
                    <div className='indexIcon hvr-push'>
                        <i className='far fa-envelope' />
                        <div className='iconText'><a href='mailto:zct398@gmail.com'>聯絡我</a></div>
                    </div>
                </div>
            </div>
            <IndexPic />
            <div className='user member hvr-float-shadow' onClick={() => entrySwitch('profile')}>
                <i className='fas fa-user'></i>
            </div>
        </div>
    )
}


export default Index