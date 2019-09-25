import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/common.css';
import fire from '../fire';
let userName;
let userID;
let userRightCounter;
let userWrongCounter;
import Chart from 'react-google-charts'
 
class Profile extends Component {
    state = {
        user: this.props.userUid

    }
    componentDidMount = () => {
        fire.firestore().collection('MemberShip').doc(this.state.user).get().then((doc) => {
            if (doc.exists) {
                let userInfo = doc.data()
                userName = userInfo.NAME;
                userID = userInfo.ID;
                userRightCounter = userInfo.rightCounter;
                userWrongCounter = userInfo.wrongCounter;
            }
            this.setState({
                userName: userName,
                userID: userID,
                userRightCounter: userRightCounter,
                userWrongCounter: userWrongCounter
            })
        })
    }
    render() {

        return (
            <div className="container">
                <div className="profile">
                    <div className="profileZone">
                        <div className="text">會員姓名：<span id="name">{this.state.userName}</span></div>
                        <div className="text">帳號：<span id="account">{this.state.userID}</span></div>
                        <div className="count">累計答對：<span id="right">{this.state.userRightCounter}</span></div>
                        <div className="count">累計答錯：<span id="wrong">{this.state.userWrongCounter}</span></div>
                        <Link to='/addquiz'>
                            <button className="hvr-sweep-to-right" >我要出題</button>
                        </Link>
                    </div>
                  
                    <Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['答對',this.state.userRightCounter],
    ['答錯',this.state.userWrongCounter],
  ]}
  options={{
    title: '你的答題正確率',
    is3D: true,
    colors: ['skyblue', '#ffe65d'],
    animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true
                },
                enableInteractivity: false,
  }}
  chartEvents={[
    {
      eventName: 'animationfinish',
      callback: () => {
        console.log('Animation Finished')
      },
    },
  ]}
  rootProps={{ 'data-testid': '2' }}
/>
                </div>
            </div>
        )
    }
}

export default Profile;