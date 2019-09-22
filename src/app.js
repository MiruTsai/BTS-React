import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Link, withRouter } from 'react-router-dom';
import Logo from './components/logo';
import Login from './components/login';
import Index from './components/index';
import Addquiz from './components/addquiz';
import QuizBoard from './components/quizboard';
import Profile from './components/profile';
import fire from './fire'
import '../css/common.css';
import '../css/hover-min.css';
let newquizs = [];
const root = document.querySelector('.root');


class App extends Component {
    state = {
        userUid: '',
    }
    signUP = () => {
        if (this.state.email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (this.state.password.length < 6) {
            alert('Please enter a password.');
            return;
        }
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            fire.firestore().collection('MemberShip').doc().set({
                ID: this.state.email,
                NAME: this.state.userName,
                rightCounter: 0,
                wrongCounter: 0
            })
            this.setState({
                userUid: fire.auth().currentUser.uid
            })
        })
            .catch((error) => {
                console.log(error);
            })
    }
    componentDidMount = () => {
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
        this.setState({ Quizs: newquizs })
    }
    login = (childrendata) => {
        console.log(childrendata);
        if (childrendata.state.email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (childrendata.state.password.length < 6) {
            alert('Please enter a password.');
            return;
        }
        fire.auth().signInWithEmailAndPassword(childrendata.state.email, childrendata.state.password).then(() => {
            localStorage.setItem('uid', fire.auth().currentUser.uid);
            console.log(fire.auth().currentUser);
            this.setState({
                userUid: fire.auth().currentUser.uid
            })
          
        }).catch((error) => {
            console.log(error);
        })
        setTimeout(function(){childrendata.props.history.push('/')},3000)
    }


    authListener = (e) =>{
        let user = this.state.userUid
        if(user===''){
            e.props.history.push('/login')
        }else{
            e.props.history.push('/profile')
        }
    }

    // quizEntry = (e) => {
    //     let user = this.state.userUid
    //     if(user===''){
    //         alert('請登入會員');
    //         e.props.history.push('/login');
    //     }else{
    //         e.props.history.push('/quizboard');
    //     }
    // }
    render() {
        console.log(this)
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Logo />
                    <Route exact path="/" render={(props) => <Index {...props} auth={this.authListener} quizEntry={this.quizEntry}/>} />
                    <Route path="/login" render={(props) => <Login {...props} login={this.login} userUid={this.state.userUid}/>} />
                    <Route path="/profile" render={(props) => <Profile {...props} />} />
                    <Route path="/Addquiz" component={Addquiz} />
                    <Route path="/quizboard" render={(props)=><QuizBoard {...props} quizs={this.state.Quizs}/>} />
                </BrowserRouter>
</React.Fragment>
        )
    }
}


ReactDOM.render(
    <App />
    , root);


export default withRouter(App)