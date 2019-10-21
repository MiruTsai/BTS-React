import React, { Component } from "react";
import Logo from "./Logo";
import Response from "./Response";

const IndexPic = () => {
    return (
        <div className="btspic">
            <img src="/img/group.jpg" className="indexPic" />
        </div>
    )
}

class Index extends Component {
    render () {
        const { alertMessage, alertBlock, blurLayer, closeAlert, auth, quizEntry, preTestEntry } = this.props
        return (
            <>
                <Logo />
                <Response alertMessage={alertMessage} alertBlock={alertBlock} blurLayer={blurLayer} closeAlert={() => closeAlert(this)} />
                <div className="indexContainer">
                    <div className="leftSide">
                        <div className="mobile_user member" onClick={() => auth(this)}>
                            <img src="img/user.svg" className="userIcon" />
                        </div>
                        <div className="index-textZone">
                            <h3>Love yourself. Love myself. Peace!</h3>
                            <div className="title">BTS Too Much Information</div>
                            <h5>I have come to love myself for who I am, <br />
                                for who I was, and for who I hope to become.</h5>
                        </div>
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
                    <IndexPic />
                    <div className="user member hvr-float-shadow" onClick={() => auth(this)}>
                        <img src="/img/user.svg" className="userIcon" />
                    </div>
                </div>
            </>
        )
    }
}
export default Index;