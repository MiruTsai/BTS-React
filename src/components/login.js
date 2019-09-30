import React, { Component } from 'react';
import '../../css/login.css';
import SignInAnime from './signInAnime';
import Response from './response';
import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        userName: '',
        email: '',
        password: '',
        status: 'signIn',
    }

    signUpSide = () => {
        this.setState({
            status: 'signUp'
        })
    }

    signInSide = () => {
        this.setState({
            status: 'signIn'
        })
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        let loginZone;
        if (this.state.status === "signIn") {
            loginZone = <div className="login">
                <div className="loginZone">
                    <div className="loginText">會員登入</div>
                    <div className="subtext">請輸入您的會員帳號</div>
                    <div className="text2">帳號</div>
                    <input type="text" id="signInEmail" name="email" placeholder="請輸入您的 E-mail" value={this.state.email} onChange={this.updateInput} />
                    <div className="text2">密碼</div>
                    <input type="password" id="signInPW" name="password" value={this.state.password} onChange={this.updateInput} />
                    <button
                        onClick={() => this.props.login(this)}
                        className="signButton">登入</button>
                </div>
            </div>
        } else {
            loginZone = < div className="signup" >
                <div className="loginText">會員申請</div>
                <div className="subtext">加入會員享受更多方便功能</div>
                <div className="text2">姓名</div>
                <input type="text" id="signUpName" name="userName" placeholder="請輸入您的姓名" onChange={this.updateInput} />
                <div className="text2">帳號</div>
                <input type="text" id="signUpEmail" name="email" placeholder="請輸入您的 E-mail" onChange={this.updateInput} />
                <div className="text2">密碼</div>
                <input type="password" id="signUpPW" name="password" placeholder="您的密碼長度必須 6 位數以上" onChange={this.updateInput} />
                <button onClick={() => this.props.signUP(this)} className="signButton">送出</button>
            </div >
        }
        return (
            <React.Fragment>
                <Response alertMessage={this.props.alertMessage} alertBlock={this.props.alertBlock} blurLayer={this.props.blurLayer} closeAlert={() => this.props.closeAlert(this)} />
                <SignInAnime animeClass={this.props.animeClass} />
                <Link to="/">
                    <img src="/../img/LOGO.png" className="loginLogo" />
                </Link>
                <div className={this.props.loginContainerClass}>
                    <div className="sign">
                        <button className="loginButton" onClick={this.signInSide}>會員登入</button>
                        <button className="loginButton" onClick={this.signUpSide}>申請會員</button>
                    </div>
                    {loginZone}
                </div>
            </React.Fragment>
        )
    }
}

export default Login;