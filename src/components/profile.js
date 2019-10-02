import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/common.css";
import "../../css/main.css";
import fire from "../fire";
import Chart from "react-google-charts";
let userName;
let userID;
let userRightCounter;
let userWrongCounter;

class Profile extends Component {
  state = {
    user: this.props.userUid
  }
  componentDidMount = () => {
      fire.firestore().collection("MemberShip").doc(this.state.user).get().then((doc) => {
          if (doc.exists) {
              let userInfo = doc.data()
              console.log("userInfo",userInfo)
              userName = userInfo.NAME;
              userID = userInfo.ID;
              userRightCounter = userInfo.rightCounter;
              userWrongCounter = userInfo.wrongCounter;
              this.setState({
                userName: userName,
                userID: userID,
                userRightCounter: userRightCounter,
                userWrongCounter: userWrongCounter
            })
          }else{
            return ;
          }
          
      })
  }
  render() {

    return (
      <React.Fragment>
        <Link to="/">
                    <img src="/../img/LOGO.png" className="profileLogo" />
                </Link>
        <div className="proContainer">
          <div className="profile">
            <div className="profileZone">
              <div className="profile-header">會員資料</div>
              <div className="profile-text">會員姓名： {this.state.userName}</div>
              <div className="profile-text">帳號： {this.state.userID}</div>
              <div className="profile-text">累計答對： {this.state.userRightCounter}</div>
              <div className="profile-text">累計答錯： {this.state.userWrongCounter}</div>
              {/* <input type="radio" name="bias" id="Jin" value="Jin" /><label for="Jin">Jin</label>
              <input type="radio" name="bias" id="SUGA" value="SUGA" /><label for="SUGA">SUGA</label>
              <input type="radio" name="bias" id="j-hope" value="j-hope" /><label for="j-hope">j-hope</label>
              <input type="radio" name="bias" id="RM" value="RM" /><label for="RM">RM</label>
              <input type="radio" name="bias" id="Jimin" value="Jimin" /><label for="Jimin">Jimin</label>
              <input type="radio" name="bias" id="V" value="V" /><label for="V">V</label>
              <input type="radio" name="bias" id="JK" value="JK" /><label for="JK">Jung Kook</label> */}
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
                   this.state.userRightCounter
                ],
                ["答錯", 
                   this.state.userWrongCounter
                ],
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
                enableInteractivity: false,
              }}
              chartEvents={[
                {
                  eventName: "animationfinish",
                  callback: () => {
                    console.log("Animation Finished")
                  },
                },
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