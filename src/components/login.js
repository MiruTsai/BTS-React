import React, { Component } from 'react';
import '../../css/login.css';
import Logo from './logo';
import SignInAnime from './signInAnime';

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
                    <div className="text">會員登入</div>
                    <p>請輸入您的會員帳號</p>
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
                <div className="text">會員申請</div>
                <p>加入會員享受更多方便功能</p>
                <div className="text2">姓名</div>
                <input type="text" id="signUpName" name="userName" placeholder="請輸入您的姓名" onChange={this.updateInput} />
                <div className="text2">帳號</div>
                <input type="text" id="signUpEmail" name="email" placeholder="請輸入您的 E-mail" onChange={this.updateInput} />
                <div className="text2">密碼</div>
                <input type="password" id="signUpPW" name="password" placeholder="您的密碼長度建議6位數以上" onChange={this.updateInput} />
                <button onClick={() => this.props.signUP(this)} className="signButton">送出</button>
            </div >
        }
        return (
            <React.Fragment>
				<SignInAnime animeClass={this.props.animeClass}/>
                <Logo />
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