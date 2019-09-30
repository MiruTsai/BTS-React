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
let newUserQuizs = [];
let user;
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
            fire.auth().currentUser.sendEmailVerification().then(function() {
               console.log('success');
            })
            fire.firestore().collection('MemberShip').doc(fire.auth().currentUser.uid).set({
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
                newUserQuizs.push(y);
            });
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });
        console.log('test', newUserQuizs)
        let currentUser = fire.auth().currentUser.uid;
        localStorage.setItem('uid', currentUser);
        this.setState({
            userUid: currentUser,
            userRightCounter: 0,
            userWrongCounter: 0,
            animeClass: 'anime fadeAnime',
            loginContainerClass: 'hideLoginContainer',
            Quizs: newUserQuizs
        })
        setTimeout(function () { e.props.history.push('/') }, 5700)
    }

    login = (a) => {
        if (a.state.email.length < 4) {
            this.setState({
                alertMessage: '請輸入正確 E-mail 地址',
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
            this.setState({
                userUid: user,
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
            animeClass: 'anime fadeAnime',
            loginContainerClass: 'hideLoginContainer'
        })
        setTimeout(function () { a.props.history.push('/') }, 5700)
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
                    alertMessage={this.state.alertMessage} alertBlock={this.state.alertBlock} blurLayer={this.state.blurLayer} closeAlert={this.closeAlert} />}
                    userUid={this.state.userUid}
                />
                <Route path="/login" render={(props) => <Login {...props}
                    alertMessage={this.state.alertMessage} alertBlock={this.state.alertBlock} blurLayer={this.state.blurLayer} closeAlert={this.closeAlert}
                    login={this.login} signUP={this.signUP} userUid={this.state.userUid} animeClass={this.state.animeClass} loginContainerClass={this.state.loginContainerClass} />} />
                <Route path="/profile" render={(props) => <Profile {...props} userUid={this.state.userUid} logOut={this.logOut} />} />
                <Route path="/quizboard" render={(props) => <QuizBoard {...props} quizs={this.state.Quizs} userUid={this.state.userUid} />} />
                <Route path="/Addquiz" component={Addquiz} closeAlert={this.closeAlert} />
                <Route path="/preTest" render={(props) => <PreTest {...props} quizs={this.state.Quizs} closeAlert={this.closeAlert} />} />
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
    <App />
    , root);

export default withRouter(App)