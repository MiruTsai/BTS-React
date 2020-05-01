import React, { Component } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, withRouter } from "react-router-dom"
import Login from "./components/Login"
import Index from "./components/Index"
import Addquiz from "./components/Addquiz"
import QuizBoard from "./components/Quizboard"
import Profile from "./components/Profile"
import PreTest from "./components/PreTest"
import Album from "./components/Album"
import fire from "./Fire"
import firebase from "firebase"
import "../css/common.css"
import "../css/index.css"
const root = document.querySelector(".root")

class App extends Component {
    state = {
        userUid: "",
        animeClass: "hide",
        loginClass: "hide",
        loginContainerClass: "loginContainer",
        Group: "TWICE",
        KKBOXtoken: "Eq5_jtTe3y3XYYWutk1C-g=="
    }
    getQuizs = () => {
        let newquizs = []
        let groupName = ""
        this.state.Group === "IZ*ONE" ? groupName = "IZONE" : groupName = this.state.Group
        fire.firestore().collection(groupName + "QUIZS").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let x = doc.id
                let y = doc.data()
                y.id = x
                newquizs.push(y)
            })
        })
        return newquizs
    }
    settingFirebaseUserInfo = (uid, email, name) => {
        fire.firestore().collection("MemberShip").doc(uid).set({
            ID: email,
            NAME: name,
            BTSrightCounter: 0,
            BTSwrongCounter: 0,
            TWICErightCounter: 0,
            TWICEwrongCounter: 0,
            IZONErightCounter: 0,
            IZONEwrongCounter: 0
        })
    }
    settingStateUserInfo = (uid, name) => {
        let quizs = this.getQuizs()
        this.setState({
            quizs: quizs,
            userUid: uid,
            userName: name,
            loginClass: "hide",
            animeClass: "signAnime fadeAnime",
            loginContainerClass: "hide"
        })
    }
    alertMessage = (message) => {
        this.setState({
            alertMessage: message,
            alertBlock: "alertBlock"
        })
    }
    checkLoginInfo = (e) => {
        let error = false
        if (e.state.email === "" || e.state.password === "") {
            this.alertMessage("請輸入正確資訊")
            error = true
            return error
        }
        if (e.state.email.length < 4) {
            this.alertMessage("請輸入正確 E-mail 地址")
            error = true     
            return error
        }
        if (e.state.password.length < 6) {
            this.alertMessage("請輸入大於六位數密碼")
            error = true
            return error
        }        
    }

    signUP = (e) => {
        if(this.checkLoginInfo(e)){
            return
        }
        this.setState({
            loginClass: "anime",
            loginContainerClass: "hide"
        })
        fire.auth().createUserWithEmailAndPassword(e.state.email, e.state.password).then(() => {
            let userUid = fire.auth().currentUser.uid
            localStorage.setItem("uid", userUid)
            this.settingStateUserInfo(userUid, e.state.userName)
        }).then(() => {
            let userUid = fire.auth().currentUser.uid
            this.settingFirebaseUserInfo(userUid, e.state.email, e.state.userName)
        }).then(() => {
            fire.auth().currentUser.sendEmailVerification()
        }).then(() => {
            setTimeout(() => { e.props.history.push("/") }, 4700)
        }).catch((error) => {
            console.log("Error getting documents: ", error)
        })
    }

    login = (e) => {
        if(this.checkLoginInfo(e)){
            return
        }
        this.setState({
            loginClass: "anime",
            loginContainerClass: "hide"
        })
        fire.auth().signInWithEmailAndPassword(e.state.email, e.state.password).then(() => {
            let userUid = fire.auth().currentUser.uid
            fire.firestore().collection("MemberShip").doc(userUid).get().then((doc) => {
                if (doc.exists) {
                    this.settingStateUserInfo(userUid, doc.data().NAME)
                }
            })
        }).then(() => {
            setTimeout(() => { e.props.history.push("/") }, 4700)
        }).catch((error) => {
            if (error.code.slice(5, error.code.length) === "wrong-password") {
                this.setState({
                    alertMessage: "糟糕！密碼打錯囉",
                    alertBlock: "alertBlock",
                    loginClass: "hide",
                    loginContainerClass: "loginContainer"
                })
            } else {
                this.setState({
                    alertMessage: "糟糕！沒有這個人喔",
                    alertBlock: "alertBlock",
                    loginClass: "hide",
                    loginContainerClass: "loginContainer"
                })
            }
        })
    }

    googleLogin = (e) => {
        let provider = new firebase.auth.GoogleAuthProvider()
        this.setState({
            loginClass: "anime",
            loginContainerClass: "hide"
        })
        fire.auth().signInWithPopup(provider).then((result) => {
            let user = result.user
            fire.firestore().collection("MemberShip").doc(user.uid).get().then((doc) => {
                if (doc.exists) {
                    this.settingStateUserInfo(user.uid, doc.data().NAME)
                } else {
                    this.settingFirebaseUserInfo(user.uid, user.email, user.displayName)
                    this.settingStateUserInfo(user.uid, user.displayName)
                }
            })
        }).then(() => {
            setTimeout(() => { e.props.history.push("/") }, 4700)
        })
    }
    chooseGroup = (e) => {
        this.setState({ Group: e.target.value }, () => {
            this.newquizs = this.getQuizs()
            this.setState({
                quizs: this.newquizs
            })
        })
    }
    switch = () => {
        if (this.props.userUid === "") {
            this.props.history.push("/login")
            this.setState({
                alertMessage: "",
                alertBlock: !this.state.alertBlock
            })
        } else {
            this.setState({
                alertMessage: "",
                alertBlock: !this.state.alertBlock
            })
        }
    }
    render () {
        const { Group, alertMessage, alertBlock, userUid, quizs, animeClass, loginClass, loginContainerClass, userName, KKBOXtoken } = this.state
        let groupName = ""
        Group === "IZ*ONE" ? groupName = "IZONE" : groupName = Group
        return (
            <div className={groupName + "layer"}>
                <BrowserRouter>
                    <Route exact path="/" render={(props) => <Index {...props} userUid={userUid} chooseGroup={this.chooseGroup} Group={Group} />} />
                    <Route path="/login" render={(props) => <Login {...props} alertMessage={alertMessage} alertBlock={alertBlock} switch={this.switch}
                        login={this.login} signUP={this.signUP} userUid={userUid} animeClass={animeClass} loginClass={loginClass}
                        loginContainerClass={loginContainerClass} Group={Group} googleLogin={this.googleLogin} />} />
                    <Route path="/profile" render={(props) => <Profile {...props} userUid={userUid} logOut={this.logOut} Group={Group} chooseGroup={this.chooseGroup} />} />
                    <Route path="/quizboard" render={(props) => <QuizBoard {...props} quizs={quizs} userUid={userUid} Group={Group} />} />
                    <Route path="/addquiz" render={(props) => <Addquiz {...props} quizs={quizs} Group={Group} chooseGroup={this.chooseGroup} userName={userName} />} />
                    <Route path="/preTest" render={(props) => <PreTest {...props} quizs={quizs} switch={this.switch} Group={Group} />} />
                    <Route path="/album" render={(props) => <Album {...props} token={KKBOXtoken} Group={Group} />}></Route>
                </BrowserRouter>
            </div>
        )
    }
}
ReactDOM.render(
    <App />
    , root)

export default withRouter(App)