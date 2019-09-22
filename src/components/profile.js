import React, { Component } from 'react';
import '../../css/common.css';
import fire from '../fire';

class Profile extends Component {
    signOut = () => {
        fire.auth().signOut().then(function () {
            localStorage.clear();
        }).catch(function (error) {
            alert('Oh no! 哪裡出錯了！')
        });
    }

    render() {
        return (
            <div className="container">
                <div className="profile">
                    <div className="profileZone">
                        <div className="text">會員姓名：<span id="name"></span></div>
                        <div className="text">帳號：<span id="account"></span></div>
                        <div className="count">累計答對：<span id="right"></span></div>
                        <div className="count">累計答錯：<span id="wrong"></span></div>
                        <button className="hvr-sweep-to-right" >我要出題</button>
                        <button className="hvr-sweep-to-right" onClick={this.signOut}>登出</button>
                    </div>
                    <div id="chart_div"></div>
                </div>
            </div>
        )
    }
}

export default Profile;