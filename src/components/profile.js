import React, { Component } from "react"
import { Link } from "react-router-dom"
import "../../css/common.css"
import "../../css/index.css"
import QuizAnime from "../components/Quizanime"
import Groups from "../components/Groups"
import fire from "../Fire"
import Chart from "react-google-charts"

class Profile extends Component {
  state = {
    animeClass: "anime",
    proContainerClass: "hide",
    userInfo: ""
  }
  componentDidMount = () => {
    fire.firestore().collection("MemberShip").doc(this.props.userUid).get().then((doc) => {
      if (doc.exists) {
        let userInfo = doc.data()
        this.setState({
          userInfo,
          animeClass: "hide",
          proContainerClass: "proContainer"
        })
      }
    })
  }
  render () {
    const { animeClass, proContainerClass, userInfo } = this.state
    const { Group, chooseGroup } = this.props
    return (
      <>
        <Link to="/">
          <img src={"/../img/logo/" + Group + ".PNG"} className="profileLogo" />
        </Link>
        <QuizAnime animeClass={animeClass} Group={Group} />
        <div className={proContainerClass}>
        <Groups chooseGroup={chooseGroup} Group={Group} />
          <div className="profile">            
            <div className="profileZone">
              <div className="profile-header">會員資料</div>
              <div className="profile-text">會員姓名： {userInfo["NAME"]}</div>
              <div className="profile-text">帳號： {userInfo["ID"]}</div>
              <div className="profile-text">累計答對： {userInfo[Group + "rightCounter"]}</div>
              <div className="profile-text">累計答錯： {userInfo[Group + "wrongCounter"]}</div>              
            </div>
            
          </div>
          <Chart
              width={"500px"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Task", "Hours per Day"],
                ["答對",
                  userInfo[Group + "rightCounter"]
                ],
                ["答錯",
                  userInfo[Group + "wrongCounter"]
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
      </>
    )
  }
}
export default Profile