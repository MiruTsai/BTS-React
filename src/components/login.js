import React from 'react';
import '../../css/login.css'
// import Fire from '../../config/firebaseConfig'




class Login extends React.Component {
    state = {
        email: '',
        password: '',
        status: 'signIn'
    }
    login = (e) => {
        this.setState({

        })
        Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        })
    }
    signUp = () => {
        this.setState({
            status: 'signUp'
        })
    }
    signIn = () => {
        this.setState({
            status: 'signIn'
        })
    }

    render() {
        let loginZone;
        if (this.state.status === "signIn") {
            loginZone = <div className="login">
                <div className="loginZone">
                    <div className="text">會員登入</div>
                    <p>請輸入您的會員帳號</p>
                    <div className="text2">帳號</div>
                    <input type="text" id="signInEmail" placeholder="請輸入您的 E-mail" value={this.state.email} />
                    <div className="text2">密碼</div>
                    <input type="password" id="signInPW" value={this.state.password} />
                    <button onClick={this.login} className="signButton">登入</button>
                </div>
            </div>
        } else {
            loginZone = < div className="signup" >
                <div className="text">會員申請</div>
                <p>加入會員享受更多方便功能</p>
                <div className="text2">姓名</div>
                <input type="text" id="signUpName" placeholder="請輸入您的姓名" />
                <div className="text2">帳號</div>
                <input type="text" id="signUpEmail" placeholder="請輸入您的 E-mail" />
                <div className="text2">密碼</div>
                <input type="password" id="signUpPW" placeholder="您的密碼長度建議6位數以上" />
                <button className="signButton">送出</button>
            </div >
        }
        return (
            <div className="loginContainer">
            <div className="sign">
                <button className="loginButton" onClick={this.signIn}>Sign In</button>
                <button className="loginButton" onClick={this.signUp}>Sign Up</button>
                </div>
                {loginZone}
            </div>
        )
    }
}
export default Login;
