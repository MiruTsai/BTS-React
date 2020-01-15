import React, { Component } from "react";
import Logo from "./Logo";
import Response from "./Response";
import Groups from "./Groups";

const IndexPic = (props) => {
    return (
        <div className="groupPic">
            <img src={"/img/group/" + props.Group + ".jpg"} className="indexPic" />
        </div>
    )
}

class Index extends Component {
    render () {
        const { Group, chooseGroup, alertMessage, alertBlock, blurLayer, closeAlert, auth, quizEntry, preTestEntry } = this.props;
        if (Group === "IZONE") {
            this.groupName = "IZ*ONE";
            this.mainDescribe = "Eyes On Me!"
            this.subDescribe = "Write it on the clouds, so it won't disappear."
        } else if (Group === "TWICE") {
            this.groupName = "TWICE";
            this.mainDescribe = "One In A Million! Hello, we are Twice!"
        this.subDescribe = "You make me feel special, no matter how the worlds brings me down.";
        }else{
            this.groupName = "BTS";
            this.mainDescribe = " Love yourself. Love myself. Peace! ";
            this.subDescribe = "I have come to love myself for who I am, for who I was, and for who I hope to become."
        }
        return (
            <>
                <Logo Group={Group} />
                <Response alertMessage={alertMessage} alertBlock={alertBlock} blurLayer={blurLayer} closeAlert={() => closeAlert(this)} Group={Group}/>
                <div className="indexContainer">
                    <div className="leftSide">
                        <div className="mobile_user member" onClick={() => auth(this)}>
                            <img src="img/user.svg" className="userIcon" />
                        </div>
                        <div className="index-textZone">
                            <h3>{this.mainDescribe}</h3>
                            <div className="title">{this.groupName} Too Much Information</div>
                            <h5>{this.subDescribe}</h5>
                        </div>
                        <Groups chooseGroup={chooseGroup} Group={Group} />
                        <div className="iconZone">
                            <div className="indexIcon hvr-push" id="test" onClick={() => quizEntry(this)}>
                                <img src="/img/edit.svg" className="icon" />
                                <div className="iconText">測驗模式</div>
                            </div>
                            <div className="indexIcon hvr-push" id="preTest" onClick={() => preTestEntry(this)}>
                                <img src="/img/clock.svg" className="icon" />
                                <div className="iconText">模擬搶票</div>
                            </div>
                        </div>
                    </div>
                    <IndexPic Group={Group} />
                    <div className="user member hvr-float-shadow" onClick={() => auth(this)}>
                        <img src="/img/user.svg" className="userIcon" />
                    </div>
                </div>
            </>
        )
    }
}
export default Index;