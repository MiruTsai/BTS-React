import React from 'react';
import '../../css/main.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
// import Login from './login';
// import Fire from '../../config/firebaseConfig'
// import Profile from './profile';


const IndexPic = () => {
    return (
        <div className="btspic">
            <img src="/../img/group.jpg" className="indexPic" />
        </div>
    )
}

const MemberIcon = (props) => {
    return (
        <div className="user member hvr-float-shadow" onClick={props.checkUser}>
            <img src="/../img/user.svg" className="userIcon" />
        </div>
    )
}

const IndexLeftside = () => {
    return (
        <div className="leftSide">
            <div className="index_textZone">
                <h3>Love yourself. Love myself. Peace!</h3>
                <div className="title">BTS Too Much Information</div>
                <h5>I have come to love myself for who I am, <br />
                    for who I was, and for who I hope to become.</h5>
            </div>
            <div className="iconZone">
                <Link to="/addquiz">
                    <div className="indexIcon hvr-float-shadow" id="test">
                        <img src="/../img/edit.svg" className="icon" />
                        <div className="text">測驗模式</div>
                    </div>
                </Link>
                <Link to="/login">
                    <div className="indexIcon hvr-float-shadow" id="preTest">
                        <img src="/../img/clock.svg" className="icon" />
                        <div className="text">模擬搶票</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

class Index extends React.Component {
    state = {
        user: {}
    }
    authListener() {
        Fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
                // localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
                <Profile />
            }
        }
        )
    }
    render() {
        return (
            <div className="indexContainer">
                <IndexLeftside />
                <IndexPic />
                <MemberIcon checkUser={this.authListener} />
                {/* {this.state.user ? (<Profile />) : (<Login />)} */}
            </div>
        )
    }
}
export default Index;