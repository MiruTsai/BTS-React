import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Link, withRouter } from 'react-router-dom';
import Logo from './components/logo';
import Login from './components/login';
import Index from './components/index';
import Addquiz from './components/addquiz';
import QuizBoard from './components/quizboard';
import Profile from './components/profile';
import PreTest from './components/preTest';
import fire from './fire';
import '../css/common.css';
import '../css/hover-min.css';
let newquizs = [];
let userRightCounter;
let userWrongCounter;
let user
const root = document.querySelector('.root');

class App extends Component {
    state = {
        userUid: '',
        animeClass: 'hideAnime',
        loginContainerClass: 'loginContainer',
        alertMessage: '',
        alertBlock: 'hideAlertBlock',
        blurLayer: 'hideblurLayer'
    }

    signUP = (e) => {
        if (e.state.email.length < 4) {
            this.setState({
                alertMessage: '請輸入正確 E-mail 地址',
                alertBlock: 'alertBlock',
                blurLayer: 'alertBlurlayer'
            });
            return;
        }
        if (e.state.password.length < 6) {
            this.setState({
                alertMessage: '請輸入大於六位數密碼',
                alertBlock: 'alertBlock',
                blurLayer: 'alertBlurlayer'
            });
            return;
        }
        fire.auth().createUserWithEmailAndPassword(e.state.email, e.state.password).then(() => {
            localStorage.setItem('uid', fire.auth().currentUser.uid);
            fire.firestore().collection('MemberShip').doc(user).set({
                ID: e.state.email,
                NAME: e.state.userName,
                rightCounter: 0,
                wrongCounter: 0
            })

        }).catch((error) => {
            console.log(error);
        })
        fire.firestore().collection("QUIZS").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let x = doc.id;
                let y = doc.data();
                y.id = x;
                newquizs.push(y);
            });
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });
        let currentUser = localStorage.getItem('uid');
        this.setState({
            userUid: currentUser,
            Quizs: newquizs,
            userRightCounter: 0,
            userWrongCounter: 0,
            animeClass: 'anime fadeAnime',
            loginContainerClass: 'hideLoginContainer'
        })
        setTimeout(function () { e.props.history.push('/') }, 3700)
    }

    login = (a) => {
        if (a.state.email.length < 4) {
            this.setState({
                alertMessage: '請輸入正確E-mail地址',
                alertBlock: 'alertBlock',
                blurLayer: 'alertBlurlayer'
            })
            return;
        }
        if (a.state.password.length < 6) {
            this.setState({
                alertMessage: '請輸入正確密碼',
                alertBlock: 'alertBlock',
                blurLayer: 'alertBlurlayer'
            })
            return;
        }
        fire.auth().signInWithEmailAndPassword(a.state.email, a.state.password).then(() => {
            user = fire.auth().currentUser.uid
            localStorage.setItem('uid', user);
            fire.firestore().collection('MemberShip').doc(user).get().then((doc) => {
                if (doc.exists) {
                    let userInfo = doc.data()
                    userRightCounter = userInfo.rightCounter;
                    userWrongCounter = userInfo.wrongCounter;
                }
                this.setState({
                    userUid: user,
                    userRightCounter: userRightCounter,
                    userWrongCounter: userWrongCounter,
                })
            })
        }).catch((error) => {
            console.log(error);
            alert(error)
            return
        });
        fire.firestore().collection("QUIZS").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let x = doc.id;
                let y = doc.data();
                y.id = x;
                newquizs.push(y);
            });
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });
        this.setState({
            Quizs: newquizs,
            userUid: user,
            userRightCounter: userRightCounter,
            userWrongCounter: userWrongCounter,
            animeClass: 'anime fadeAnime',
            loginContainerClass: 'hideLoginContainer'
        })
        setTimeout(function () { a.props.history.push('/') }, 3700)
    }
    logOut = (e) => {
        fire.auth().signOut().then(function () {
            localStorage.clear();
            this.setState({
                userUid: ''
            })
            e.props.history.push('/')
        }).catch(function (error) {
            alert('Oh no! 哪裡出錯了！')
        });
    }
    authListener = (e) => {
        let user = this.state.userUid
        if (user === '') {
            e.props.history.push('/login')
        } else {
            e.props.history.push('/profile')
        }
    }

    quizEntry = (e) => {
        if (this.state.userUid === '') {
            this.setState({
                alertMessage: '請登入會員',
                alertBlock: 'alertBlock',
                blurLayer: 'alertBlurlayer'
            })
        } else {
            e.props.history.push('/quizboard');
        }
    }
    preTestEntry = (e) => {
        if (this.state.userUid === '') {
            this.setState({
                alertMessage: '請登入會員',
                alertBlock: 'alertBlock',
                blurLayer: 'alertBlurlayer'
            })
        } else {
            e.props.history.push('/preTest');
        }
    }

    closeAlert = (e) => {
        if (this.state.userUid === '') {
            e.props.history.push('/login');
            this.setState({
                alertMessage: '',
                alertBlock: 'hideAlertBlock',
                blurLayer: 'hideBlurLayer'
            })
        } else {
            this.setState({
                alertMessage: '',
                alertBlock: 'hideAlertBlock',
                blurLayer: 'hideBlurLayer'
            })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" render={(props) => <Index {...props} auth={this.authListener} quizEntry={this.quizEntry} preTestEntry={this.preTestEntry}
                    alertMessage={this.state.alertMessage} alertBlock={this.state.alertBlock} blurLayer={this.state.blurLayer} closeAlert={this.closeAlert} />} />
                <Route path="/login" render={(props) => <Login {...props}
                    alertMessage={this.state.alertMessage} alertBlock={this.state.alertBlock} blurLayer={this.state.blurLayer} closeAlert={this.closeAlert}
                    login={this.login} signUP={this.signUP} userUid={this.state.userUid} animeClass={this.state.animeClass} loginContainerClass={this.state.loginContainerClass} />} />
                <Route path="/profile" render={(props) => <Profile {...props} userUid={this.state.userUid} logOut={this.logOut}/>} />
                <Route path="/quizboard" render={(props) => <QuizBoard {...props} quizs={this.state.Quizs} userUid={this.state.userUid} userRightCounter={this.state.userRightCounter} userWrongCounter={this.state.userWrongCounter} />} />
                <Route path="/Addquiz" component={Addquiz} />
                <Route path="/preTest" render={(props) => <PreTest {...props} quizs={this.state.Quizs} />} />
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
    <App />
    , root);


export default withRouter(App)