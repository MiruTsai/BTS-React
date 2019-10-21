import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/common.css";
import "../../css/index.css";
import fire from "../Fire";
import Chart from "react-google-charts";

class Profile extends Component {
  state = {
    userName: "",
    userID: "",
    userRightCounter: "",
    userWrongCounter: ""
  }
  componentDidMount = () => {
    fire.firestore().collection("MemberShip").doc(this.props.userUid).get().then((doc) => {
      if (doc.exists) {
        let userInfo = doc.data()
        this.setState({
          userName: userInfo.NAME,
          userID: userInfo.ID,
          userRightCounter: userInfo.rightCounter,
          userWrongCounter: userInfo.wrongCounter
        })
      } else {
        return;
      }
    })
  }

  render () {
    const { userName, userID, userRightCounter, userWrongCounter } = this.state
    return (

      <React.Fragment>
        <Link to="/">
          <img src="/../img/LOGO.png" className="profileLogo" />
        </Link>
        <div className="proContainer">
          <div className="profile">
            <div className="profileZone">
              <div className="profile-header">會員資料</div>
              <div className="profile-text">會員姓名： {userName}</div>
              <div className="profile-text">帳號： {userID}</div>
              <div className="profile-text">累計答對： {userRightCounter}</div>
              <div className="profile-text">累計答錯： {userWrongCounter}</div>
              <Link to="/addquiz">
                <button type="button" className="profile-btn hvr-push">我要出題</button>
              </Link>
            </div>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Task", "Hours per Day"],
                ["答對",
                  userRightCounter
                ],
                ["答錯",
                  userWrongCounter
                ]
              ]}
              options={{
                title: "你的答題正確率",
                is3D: true,
                colors: ["skyblue", "#ffe65d"],
                animation: {
                  duration: 1000,
                  easing: "out",
                  startup: true
                },
                enableInteractivity: false
              }}
              chartEvents={[
                {
                  eventName: "animationfinish"
                }
              ]}
              rootProps={{ "data-testid": "2" }}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Profile;