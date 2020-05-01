import React, { Component } from "react"
import SignInAnime from "./SignInAnime"
import QuizAnime from "./Quizanime"
import Response from "./Response"
import { Link } from "react-router-dom"
import "../../css/login.css"

class Login extends Component {
    state = {
        userName: "",
        email: "",
        password: "",
        status: true
    }

    changeStatus = (boolean) => {
        this.setState({
            status: boolean,
            userName: "",
            password: "",
            email: ""
        })
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render () {
        const { email, password, status } = this.state
        const { Group, alertMessage, alertBlock, signUP, login, animeClass, loginContainerClass, googleLogin, loginClass } = this.props
        let groupName
        Group === "IZ*ONE" ? groupName = "IZONE" : groupName = Group
        return (
            <>
                <Response Group={Group} alertMessage={alertMessage} alertBlock={alertBlock} switch={() => this.props.switch()} />
                <SignInAnime animeClass={animeClass} />
                <Link to="/">
                    <img src={"/../img/logo/" + groupName + ".PNG"} className="loginLogo" />
                </Link>
                <QuizAnime animeClass={loginClass} Group={Group} />
                <div className={loginContainerClass}>
                    <div className="sign">
                        <button className="loginButton" onClick={() => this.changeStatus(true)}>會員登入</button>
                        <button className="loginButton" onClick={() => this.changeStatus(false)}>申請會員</button>
                    </div>
                    {status ? (
                        <div className="login">
                            <div className="loginZone">
                                <div className="loginText">會員登入</div>
                                <div className="subtext">請輸入您的會員帳號</div>
                                <div className="text2">帳號</div>
                                <input type="text" id="signInEmail" name="email" placeholder="測試帳號：test@test.com" value={email} onChange={this.updateInput} />
                                <div className="text2">密碼</div>
                                <input type="password" id="signInPW" name="password" value={password} placeholder="測試密碼：123456" onChange={this.updateInput} />
                                <button onClick={() => login(this)} className="signButton">登入</button>
                                <button className="googleSignButton" onClick={() => googleLogin(this)}>用 Google 帳號登入</button>
                            </div>
                        </div>) : (
                            < div className="signup" >
                                <div className="loginText">會員申請</div>
                                <div className="subtext">加入會員享受更多方便功能</div>
                                <div className="text2">姓名</div>
                                <input type="text" id="signUpName" name="userName" placeholder="請輸入您的姓名" onChange={this.updateInput} />
                                <div className="text2">帳號</div>
                                <input type="text" id="signUpEmail" name="email" placeholder="請輸入您的E-mail" onChange={this.updateInput} />
                                <div className="text2">密碼</div>
                                <input type="password" id="signUpPW" name="password" placeholder="您的密碼長度必須 6 位數以上" onChange={this.updateInput} />
                                <button onClick={() => signUP(this)} className="signButton">送出</button>
                            </div >)
                    }
                </div>
            </>
        )
    }
}

export default Login