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
    state = {
        userUid: "",
        animeClass: "hide",
        loginContainerClass: "loginContainer",
        alertMessage: "",
        alertBlock: "hide",
        blurLayer: "hide",
        Group: "BTS"
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
                animeClass: "signAnime fadeAnime",
                loginContainerClass: "hide"
            })
            fire.auth().currentUser.sendEmailVerification().then(() => {
                fire.firestore().collection(this.state.Group + "QUIZS").get().then((querySnapshot) => {
                    this.newquizs = [];
                    querySnapshot.forEach((doc) => {
                        let x = doc.id;
                        let y = doc.data();
                        y.id = x;
                        this.newquizs.push(y);
                    });
                    fire.firestore().collection("MemberShip").doc(fire.auth().currentUser.uid).set({
                        ID: e.state.email,
                        NAME: e.state.userName,
                        rightCounter: 0,
                        wrongCounter: 0
                    })
                    this.setState({
                        quizs: this.newquizs,
                        userName: e.state.userName
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
            fire.firestore().collection(this.state.Group + "QUIZS").get().then((querySnapshot) => {
                let user = fire.auth().currentUser.uid;
                this.newquizs = [];
                querySnapshot.forEach((doc) => {
                    let x = doc.id;
                    let y = doc.data();
                    y.id = x;
                    this.newquizs.push(y);
                });
                fire.firestore().collection("MemberShip").doc(user).get().then((doc) => {
                    if (doc.exists) {
                        let userInfo = doc.data()
                        this.setState({
                            quizs: this.newquizs,
                            animeClass: "signAnime fadeAnime",
                            loginContainerClass: "hide",
                            userName: userInfo.NAME,
                            userUid: user
                        })
                    }
                })
            })
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
    chooseGroup = (e) => {
        this.setState({
            Group: e.target.value
        });
        fire.firestore().collection(e.target.value + "QUIZS").get().then((querySnapshot) => {
            this.newquizs = [];
            querySnapshot.forEach((doc) => {
                let x = doc.id;
                let y = doc.data();
                y.id = x;
                this.newquizs.push(y);
            });
            this.setState({
                quizs: this.newquizs
            });
        })
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
        const { Group, alertMessage, alertBlock, userUid, quizs, animeClass, blurLayer, loginContainerClass, userName } = this.state;
        return (
            <div className={Group + "layer"}>
                <BrowserRouter>
                    <Route exact path="/" render={(props) => <Index {...props} auth={this.authListener} quizEntry={this.quizEntry} preTestEntry={this.preTestEntry}
                        alertMessage={alertMessage} alertBlock={alertBlock} blurLayer={blurLayer} closeAlert={this.closeAlert} userUid={userUid} chooseGroup={this.chooseGroup} Group={Group} />}
                    />
                    <Route path="/login" render={(props) => <Login {...props} alertMessage={alertMessage} alertBlock={alertBlock} closeAlert={this.closeAlert}
                        blurLayer={blurLayer} login={this.login} signUP={this.signUP} userUid={userUid} animeClass={animeClass}
                        loginContainerClass={loginContainerClass} Group={Group} />} />
                    <Route path="/profile" render={(props) => <Profile {...props} userUid={userUid} logOut={this.logOut} Group={Group} chooseGroup={this.chooseGroup} />} />
                    <Route path="/quizboard" render={(props) => <QuizBoard {...props} quizs={quizs} userUid={userUid} Group={Group} />} />
                    <Route path="/addquiz" render={(props) => <Addquiz {...props} closeAlert={this.closeAlert} Group={Group} chooseGroup={this.chooseGroup} userName={userName} />} />
                    <Route path="/preTest" render={(props) => <PreTest {...props} quizs={quizs} closeAlert={this.closeAlert} Group={Group} />} />

                </BrowserRouter>
            </div>
        )
    }
}
ReactDOM.render(
    <App />
    , root);

export default withRouter(App)