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
    checkIfLogin = () => {
        if (this.props.userUid === "") {
            this.setState({
                alertMessage: "請登入會員",
                alertBlock: true
            })
            return false;
        }
        return true;
    }
    quizEntry = () => {
        if (this.checkIfLogin()){
            this.props.history.push("/quizBoard")
        }
    }
    preTestEntry = () => {
        if (this.checkIfLogin()){
            this.props.history.push("/preTest")
        }
    }
    addQuizEntry = () => {
        if (this.checkIfLogin()){
            this.props.history.push("/addQuiz")
        }
    }
    albumEntry = () => {
        if (this.checkIfLogin()){
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
        const { Group, chooseGroup, groupInfo } = this.props
        const { alertMessage, alertBlock } = this.state
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
                            <h3>{groupInfo[Group].mainDesc}</h3>
                            <div className="title">{groupInfo[Group].name} Too Much Information</div>
                            <h5>{groupInfo[Group].subDesc}</h5>
                        </div>
                        <div className="selectGroup">
                        <Groups chooseGroup={chooseGroup} Group={Group} />
                        </div>
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
                            {/* <div className="indexIcon hvr-push" onClick={() => this.albumEntry()}>
                            <i className="fas fa-music"></i>
                                <div className="iconText">歷年專輯</div>
                            </div> */}
                            <div className="indexIcon hvr-push">
                            <i className="far fa-envelope" />
                                <div className="iconText"><a href="mailto:zct398@gmail.com">聯絡我</a></div>
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