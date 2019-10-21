import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import Login from "./components/Login";
import Index from "./components/Index";
import Addquiz from "./components/Addquiz";
import QuizBoard from "./components/Quizboard";
import Profile from "./components/Profile";
import PreTest from "./components/PreTest";
import fire from "./Fire";
import "../css/common.css";
import "../css/index.css"
const root = document.querySelector(".root");

class App extends Component {
    newquizs = [];
    state = {
        userUid: "",
        animeClass: "hide",
        loginContainerClass: "loginContainer",
        alertMessage: "",
        alertBlock: "hide",
        blurLayer: "hide"
    }
    signUP = (e) => {
        if (e.state.email === "" || e.state.password === "") {
            this.setState({
                alertMessage: "請輸入正確申請資訊",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer"
            });
            return
        }
        if (e.state.email.length < 4) {
            this.setState({
                alertMessage: "請輸入正確 E-mail 地址",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer"
            });
            return;
        }
        if (e.state.password.length < 6) {
            this.setState({
                alertMessage: "請輸入大於六位數密碼",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer"
            });
            return;
        }
        fire.auth().createUserWithEmailAndPassword(e.state.email, e.state.password).then(() => {
            let user = fire.auth().currentUser.uid;
            localStorage.setItem("uid", user);
            this.setState({
                userUid: user,
                userRightCounter: 0,
                userWrongCounter: 0,
                animeClass: "anime fadeAnime",
                loginContainerClass: "hide"
            })
            fire.auth().currentUser.sendEmailVerification().then(() => {
                fire.firestore().collection("QUIZS").get().then((querySnapshot) => {
                    querySnapshot.forEach(function (doc) {
                        let x = doc.id;
                        let y = doc.data();
                        y.id = x;
                        this.newquizs.push(y);
                    });
                    this.setState({
                        Quizs: this.newquizs
                    })
                    fire.firestore().collection("MemberShip").doc(fire.auth().currentUser.uid).set({
                        ID: e.state.email,
                        NAME: e.state.userName,
                        rightCounter: 0,
                        wrongCounter: 0
                    })
                })
            })
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        })
        setTimeout(() => { e.props.history.push("/") }, 5700)
    }

    login = (a) => {
        if (a.state.email === "" || a.state.password === "") {
            this.setState({
                alertMessage: "請輸入正確登入資訊",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer"
            });
            return
        }
        if (a.state.email.length < 4) {
            this.setState({
                alertMessage: "請輸入正確 E-mail 地址",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer"
            })
            return;
        }
        if (a.state.password.length < 6) {
            this.setState({
                alertMessage: "請輸入正確密碼",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer"
            });
            return;
        }
        fire.auth().signInWithEmailAndPassword(a.state.email, a.state.password).then(() => {
            let user = fire.auth().currentUser.uid;
            if (!user) {
                return
            } else {
                localStorage.setItem("uid", user);
                this.setState({
                    userUid: user,
                    animeClass: "anime fadeAnime",
                    loginContainerClass: "hide"
                });
                fire.firestore().collection("QUIZS").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let x = doc.id;
                        let y = doc.data();
                        y.id = x;
                        this.newquizs.push(y);
                    });
                    this.setState({
                        Quizs: this.newquizs
                    });
                })
            }
            setTimeout(() => { a.props.history.push("/") }, 5700)
        }).catch((error) => {
            if (error.code.slice(5, error.code.length) === "wrong-password") {
                this.setState({
                    alertMessage: "糟糕！密碼打錯囉",
                    alertBlock: "alertBlock",
                    blurLayer: "alertBlurlayer"
                })
            } else {
                this.setState({
                    alertMessage: "糟糕！沒有這個人喔",
                    alertBlock: "alertBlock",
                    blurLayer: "alertBlurlayer"
                })
            }
        });
    }
    authListener = (e) => {
        if (this.state.userUid === "") {
            e.props.history.push("/login")
        } else {
            e.props.history.push("/profile")
        }
    }
    quizEntry = (e) => {
        if (this.state.userUid === "") {
            this.setState({
                alertMessage: "請登入會員",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer"
            })
        } else {
            e.props.history.push("/quizboard");
        }
    }
    preTestEntry = (e) => {
        if (this.state.userUid === "") {
            this.setState({
                alertMessage: "請登入會員",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer"
            })
        } else {
            e.props.history.push("/preTest");
        }
    }
    closeAlert = (e) => {
        if (this.state.userUid === "") {
            e.props.history.push("/login");
            this.setState({
                alertMessage: "",
                alertBlock: "hide",
                blurLayer: "hide"
            })
        } else {
            this.setState({
                alertMessage: "",
                alertBlock: "hide",
                blurLayer: "hide"
            })
        }
    }
    render () {
        const { alertMessage, alertBlock, userUid, Quizs, animeClass, blurLayer, loginContainerClass } = this.state;
        return (
            <BrowserRouter>
                <Route exact path="/" render={(props) => <Index {...props} auth={this.authListener} quizEntry={this.quizEntry} preTestEntry={this.preTestEntry}
                    alertMessage={alertMessage} alertBlock={alertBlock} blurLayer={blurLayer} closeAlert={this.closeAlert} />}
                    userUid={userUid} />
                <Route path="/login" render={(props) => <Login {...props} alertMessage={alertMessage} alertBlock={alertBlock} closeAlert={this.closeAlert}
                    blurLayer={blurLayer} login={this.login} signUP={this.signUP} userUid={userUid} animeClass={animeClass}
                    loginContainerClass={loginContainerClass} />} />
                <Route path="/profile" render={(props) => <Profile {...props} userUid={userUid} logOut={this.logOut} />} />
                <Route path="/quizboard" render={(props) => <QuizBoard {...props} quizs={Quizs} userUid={userUid} />} />
                <Route path="/addquiz" component={Addquiz} closeAlert={this.closeAlert} />
                <Route path="/preTest" render={(props) => <PreTest {...props} quizs={Quizs} closeAlert={this.closeAlert} />} />
            </BrowserRouter>
        )
    }
}
ReactDOM.render(
    <App />
    , root);

export default withRouter(App)