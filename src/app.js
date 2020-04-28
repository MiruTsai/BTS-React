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
import "../css/common.css"
import "../css/index.css"
const root = document.querySelector(".root")

class App extends Component {
    state = {
        userUid: "",
        animeClass: "hide",
        loginContainerClass: "loginContainer",
        Group: "TWICE",
        KKBOXtoken: "Eq5_jtTe3y3XYYWutk1C-g=="
    }

    getQuizs = () => {
        this.newquizs = []
        let groupName = ""
        this.state.Group === "IZ*ONE" ? groupName = "IZONE" : groupName = this.state.Group
        fire.firestore().collection(groupName + "QUIZS").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let x = doc.id
                let y = doc.data()
                y.id = x
                this.newquizs.push(y)
            })
        })
        return this.newquizs
    }

    signUP = (e) => {
        if (e.state.email === "" || e.state.password === "") {
            this.setState({
                alertMessage: "請輸入正確申請資訊",
                alertBlock: "alertBlock"
            })
            return
        }
        if (e.state.email.length < 4) {
            this.setState({
                alertMessage: "請輸入正確 E-mail 地址",
                alertBlock: "alertBlock"
            })
            return
        }
        if (e.state.password.length < 6) {
            this.setState({
                alertMessage: "請輸入大於六位數密碼",
                alertBlock: "alertBlock"
            })
            return
        }
        fire.auth().createUserWithEmailAndPassword(e.state.email, e.state.password).then(() => {
            let user = fire.auth().currentUser.uid
            this.newquizs = this.getQuizs()
            localStorage.setItem("uid", this.user)
            this.setState({
                userUid: user,
                userRightCounter: 0,
                userWrongCounter: 0,
                animeClass: "signAnime fadeAnime",
                loginContainerClass: "hide",
                quizs: this.newquizs,
                userName: e.state.userName
            })
            fire.auth().currentUser.sendEmailVerification().then(() => {
                fire.firestore().collection("MemberShip").doc(user).set({
                    ID: e.state.email,
                    NAME: e.state.userName,
                    rightCounter: 0,
                    wrongCounter: 0
                })
            })
        }).catch((error) => {
            console.log("Error getting documents: ", error)
        })
        setTimeout(() => { e.props.history.push("/") }, 5700)
    }

    login = (a) => {
        if (a.state.email === "" || a.state.password === "") {
            this.setState({
                alertMessage: "請輸入正確登入資訊",
                alertBlock: "alertBlock"
            })
            return
        }
        if (a.state.email.length < 4) {
            this.setState({
                alertMessage: "請輸入正確 E-mail 地址",
                alertBlock: "alertBlock"
            })
            return
        }
        if (a.state.password.length < 6) {
            this.setState({
                alertMessage: "請輸入正確密碼",
                alertBlock: "alertBlock"
            })
            return
        }
        fire.auth().signInWithEmailAndPassword(a.state.email, a.state.password).then(() => {
            this.user = fire.auth().currentUser.uid
            this.newquizs = this.getQuizs()
            fire.firestore().collection("MemberShip").doc(this.user).get().then((doc) => {
                if (doc.exists) {
                    this.setState({
                        quizs: this.newquizs,
                        animeClass: "signAnime fadeAnime",
                        loginContainerClass: "hide",
                        userName: doc.data().NAME,
                        userUid: this.user
                    })
                }
            })
            setTimeout(() => { a.props.history.push("/") }, 3700)
        }).catch((error) => {
            if (error.code.slice(5, error.code.length) === "wrong-password") {
                this.setState({
                    alertMessage: "糟糕！密碼打錯囉",
                    alertBlock: "alertBlock"
                })
            } else {
                this.setState({
                    alertMessage: "糟糕！沒有這個人喔",
                    alertBlock: "alertBlock"
                })
            }
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
        const { Group, alertMessage, alertBlock, userUid, quizs, animeClass, loginContainerClass, userName, KKBOXtoken } = this.state
        let groupName = ""
        Group === "IZ*ONE" ? groupName = "IZONE" : groupName = Group
        return (
            <div className={groupName + "layer"}>
                <BrowserRouter>
                    <Route exact path="/" render={(props) => <Index {...props} userUid={userUid} chooseGroup={this.chooseGroup} Group={Group} />} />
                    <Route path="/login" render={(props) => <Login {...props} alertMessage={alertMessage} alertBlock={alertBlock} switch={this.switch}
                        login={this.login} signUP={this.signUP} userUid={userUid} animeClass={animeClass}
                        loginContainerClass={loginContainerClass} Group={Group} />} />
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