import React, { Component } from "react"
import Logo from "./Logo"
import Response from "./Response"
import Groups from "./Groups"

const IndexPic = (props) => {
    let groupName = props.Group
    if(props.Group==="IZ*ONE"){
        groupName="IZONE"
    }
    return (
        <div className="groupPic">
            <img src={"/img/group/" + groupName + ".jpg"} className="indexPic" />
        </div>
    )
}

class Index extends Component {
    state = {
        alertMessage: "",
        alertBlock: false
    }
    switch = () => {
        if (this.props.userUid === "") {
            this.props.history.push("/login")
            this.setState({
                alertMessage: "",
                alertBlock: !this.state.alertBlock
            })
        } else {
            this.setState({
                alertMessage: "",
                alertBlock: !this.state.alertBlock
            })
        }
    }

    quizEntry = () => {
        if (this.props.userUid === "") {
            this.setState({
                alertMessage: "請登入會員",
                alertBlock: true
            })
        } else {
            this.props.history.push("/quizboard")
        }
    }
    preTestEntry = () => {
        if (this.props.userUid === "") {
            this.setState({
                alertMessage: "請登入會員",
                alertBlock: true
            })            
        } else {
            this.props.history.push("/preTest")
        }
    }
    addQuizEntry = () => {
        if (this.props.userUid === "") {
            this.setState({
                alertMessage: "請登入會員",
                alertBlock: true
            })            
        } else {
            this.props.history.push("/addquiz")
        }
    }
    albumEntry = () => {
        if (this.props.userUid === "") {
            this.setState({
                alertMessage: "請登入會員",
                alertBlock: true
            })            
        } else {
            this.props.history.push("/album")
        }
    }
    authListener = () => {
        if (this.props.userUid === "") {
            this.props.history.push("/login")
        } else {
            this.props.history.push("/profile")
        }
    }
    render () {
        const { Group, chooseGroup } = this.props
        const { alertMessage, alertBlock } = this.state
        if (Group === "IZ*ONE") {
            this.groupName = "IZ*ONE"
            this.mainDescribe = "Eyes On Me!"
            this.subDescribe = "Write it on the clouds, so it won't disappear."
        } else if (Group === "TWICE") {
            this.groupName = "TWICE"
            this.mainDescribe = "One In A Million! Hello, we are Twice!"
            this.subDescribe = "You make me feel special, no matter how the worlds brings me down."
        } else {
            this.groupName = "BTS"
            this.mainDescribe = " Love yourself. Love myself. Peace! "
            this.subDescribe = "I have come to love myself for who I am, for who I was, and for who I hope to become."
        }
        return (
            <>
                <Logo Group={Group} />
                <Response alertMessage={alertMessage} alertBlock={alertBlock} Group={Group} switch={this.switch} />
                <div className="indexContainer">
                    <div className="leftSide">
                        <div className="mobile_user member" onClick={() => this.authListener()}>
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="index-textZone">
                            <h3>{this.mainDescribe}</h3>
                            <div className="title">{this.groupName} Too Much Information</div>
                            <h5>{this.subDescribe}</h5>
                        </div>
                        <Groups chooseGroup={chooseGroup} Group={Group} />
                        <div className="iconZone">
                            <div className="indexIcon hvr-push" onClick={() => this.quizEntry()}>
                                <i className="far fa-edit" />
                                <div className="iconText">測驗模式</div>
                            </div>
                            <div className="indexIcon hvr-push" onClick={() => this.preTestEntry()}>
                                <i className="far fa-clock" />
                                <div className="iconText">模擬搶票</div>
                            </div>
                            <div className="indexIcon hvr-push" onClick={() => this.addQuizEntry()}>
                            <i className="far fa-list-alt" />
                                <div className="iconText">我要出題</div>
                            </div>
                            <div className="indexIcon hvr-push" onClick={() => this.albumEntry()}>
                            <i className="fas fa-music"></i>
                                <div className="iconText">歷年專輯</div>
                            </div>
                        </div>
                    </div>
                    <IndexPic Group={Group} />
                    <div className="user member hvr-float-shadow" onClick={() => this.authListener()}>
                        <i className="fas fa-user"></i>
                    </div>
                </div>
            </>
        )
    }
}
export default Index