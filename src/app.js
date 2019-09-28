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
        animeClass:'hideAnime',
        loginContainerClass:'loginContainer'
    }

    signUP = (e) => {
        if (e.state.email.length < 4) {
            alert('請輸入正確 E-mail 地址');
            return;
        }
        if (e.state.password.length < 6) {
            alert('請輸入大於六位數密碼');
            return;
        }
        fire.auth().createUserWithEmailAndPassword(e.state.email, e.state.password).then(() => {
             user = fire.auth().currentUser.uid
            fire.firestore().collection('MemberShip').doc(user).set({
                ID: e.state.email,
                NAME: e.state.userName,
                rightCounter: 0,
                wrongCounter: 0
            })
            localStorage.setItem('uid', user);
            this.setState({
                userUid: user,
                userRightCounter: 0,
                userWrongCounter: 0,
                animeClass:'anime fadeAnime',
                loginContainerClass:'hideLoginContainer'
            })
        }).catch((error) => {
            console.log(error);
        })
        setTimeout(function () { e.props.history.push('/') }, 3700)
    }

    login = (childrendata) => {
        if (childrendata.state.email.length < 4) {
            alert('請輸入正確E-mail地址');
            return;
        }
        if (childrendata.state.password.length < 6) {
            alert('請輸入正確密碼');
            return;
        }
        fire.auth().signInWithEmailAndPassword(childrendata.state.email, childrendata.state.password).then(() => {
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
            animeClass:'anime fadeAnime',
            loginContainerClass:'hideLoginContainer'
        })
        setTimeout(function () { childrendata.props.history.push('/') }, 3700)
    }


    authListener = (e) => {
        let user = this.state.userUid
        if (user === '') {
            e.props.history.push('/profile')
        } else {
            e.props.history.push('/profile')
        }
    }

    quizEntry = (e) => {
        let user = this.state.userUid
        if (user === '') {
            alert('請登入會員');
            e.props.history.push('/login');
        } else {
            e.props.history.push('/quizboard');
        }
    }
    preTestEntry = (e) => {
        let user = this.state.userUid
        console.log(e)
        if (user === '') {
            alert('請登入會員');
            e.props.history.push('/login');
        } else {
        e.props.history.push('/preTest');
        }    
    }
    render() {
        console.log('indextest')
        return (
                <BrowserRouter>
                    <Route exact path="/" render={(props) => <Index {...props} auth={this.authListener} quizEntry={this.quizEntry} preTestEntry={this.preTestEntry} />} />
                    <Route path="/login" render={(props) => <Login {...props} login={this.login} signUP={this.signUP} userUid={this.state.userUid} animeClass={this.state.animeClass} loginContainerClass={this.state.loginContainerClass}/>} />
                    <Route path="/profile" render={(props) => <Profile {...props} userUid={this.state.userUid} />} />
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