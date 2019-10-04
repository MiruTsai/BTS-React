import React, { Component } from "react";
import "../../css/preTest.css"
import { Link } from "react-router-dom";
import GetTicketGuide from "./guide";
import TextType from "./quizType/textType";
import PictureType from "./quizType/pictureType";
import PictureType2 from "./quizType/pictureType2";
let answer;
let index;
let currentQuiz;
let seconds = 0;
let randomTime;
let getSound;
let failSound;

class PreTest extends Component {
    state = {
        quizs: this.props.quizs,
        loadingClass: "hideLoading",
        maskClass: "hideMask",
        logoClass: "hideLogo",
        timerClass: "hideTimer",
        containerClass: "hideContainer",
        resBoardClass: "hideResBoard",
        alertBlockClass: "hideAlertBlock",
        guideClass: "guide"
    }
    componentDidMount = () => {
        getSound = new Audio();
        getSound.src = "../../source/get.mp3";
        failSound = new Audio();
        failSound.src = "../../source/fail.mp3";
        seconds = 0;
        this.countDown = setInterval(() => {
            seconds++
            console.log(seconds);
        }, 1000);
    }
    componentWillUnmount = ()=>{
        clearInterval(this.countDown);
    }
    handleChange = (e) => {
        answer = e.target.value
    }
    closeGuide = () => {
        this.setState({
            guideClass: "hideGuide",
            timerClass: "timer",
        })
        setTimeout(() => {
            this.setState({
                containerClass: "preContainer",
                logoClass: "logo",
                timerClass: "hideTimer"
            })
        }, 5000);
    }
    checkAnswer = () => {
        this.setState({ loadingClass: "preloading" });
        randomTime = Math.floor(Math.random() * 10000)
        if (answer === this.state.quizs[index].ANSWER) {
            if (seconds < 8) {
                setTimeout(() => {
                    this.setState({
                        logoClass: "hideLogo",
                        loadingClass: "hideLoading",
                        maskClass: "preTestMask",
                        containerClass: "hideContainer",
                        resPic: "../../img/concert2S.jpg",
                        response: ""
                    })
                    getSound.play();
                    setTimeout(() => {
                        this.props.history.push("/")
                    }, 7000)
                }, randomTime)
            } else {
                setTimeout(() => {
                    this.setState({
                        logoClass: "hideLogo",
                        loadingClass: "hideLoading",
                        maskClass: "preTestMask",
                        containerClass: "hideContainer",
                        resPicClass: "preTestMask",
                        resPic: "../../img/fail.gif",
                        response: "手腳太慢被搶光了..."
                    })
                    failSound.play();
                    setTimeout(() => {
                        this.setState({
                            alertBlockClass: "alertBlock",
                        })
                    }, 7000)
                }, randomTime)
            }
        } else {
            setTimeout(() => {
                this.setState({
                    logoClass: "hideLogo",
                    loadingClass: "hideLoading",
                    maskClass: "preTestMask",
                    containerClass: "hideContainer",
                    resPic: "../../img/fail.gif",
                    resPicClass: "preTestMask",
                    response: "答案錯囉..."
                })
                failSound.play();
                setTimeout(() => {
                    this.setState({
                        alertBlockClass: "alertBlock",
                    })
                }, 7000)
            }, randomTime)
            seconds = 0;
        }
    }
    oneMoreTime = () => {
        this.setState({
            alertBlockClass: "hideAlertBlock",
            timerClass: "timer",
            containerClass: "hideContainer",
        })
        setTimeout(() => {
            this.setState({
                containerClass: "preContainer",
                maskClass: "hideMask",
                logoClass: "preTestlogo",
                timerClass: "hideTimer",
                resPicClass: "hidemask",
            })
            // setInterval(() => {
            //     seconds++
            //     console.log(seconds);
            // }, 1000);
        }, 5000);
        // clearInterval(countDown);
    }
    backToIndex = () => {
        // clearInterval(countDown);
        this.props.history.push("/")
    }
    render() {
        const { quizs } = this.state;
        index = Math.floor(Math.random() * quizs.length);
        if (quizs[index].TAG === "text") {
            currentQuiz = <TextType quizs={quizs} index={index} />
        } else if (quizs[index].TAG === "picture") {
            currentQuiz = <PictureType quizs={quizs} index={index} />
        } else {
            currentQuiz = <PictureType2 quizs={quizs} index={index} />
        }
        
        seconds = 0;
        
        return (
            <React.Fragment>
                <Link to="/">
                    <img src="/../img/LOGO.png" className={this.state.logoClass} />
                </Link>
                <GetTicketGuide closeGuide={this.closeGuide} guideClass={this.state.guideClass} />
                <div className={this.state.alertBlockClass}>
                    <div className="boardTitle">BTS-TMI</div>
                    <div className="pre-alertBoard">
                        <button type="button" className="preRes-button" onClick={() => this.oneMoreTime()}>再玩一次</button>
                        <button type="button" className="preRes-button" onClick={() => this.backToIndex()}>回首頁</button>
                    </div>
                </div>
                <div className={this.state.loadingClass}>
                    <img src="../../img/loading.gif" />
                </div>
                <div className={this.state.maskClass}>
                    <img src={this.state.resPic} className={this.resPicClass} />
                    <div className="response">{this.state.response}</div>
                </div>
                <div className={this.state.timerClass}>11:59</div>
                <div className={this.state.containerClass}>
                    <div className="top">
                        <div className="quizBlock">
                            {currentQuiz}
                        </div>
                        <div className="answerBlock">
                            <div className="note">請在下方答案框輸入答案<br /><span className="quiz-subtext"> * 僅限半形數字，請勿填寫中文</span></div>
                            <input type="text" className="quiz-answer" value={this.state.answer} onChange={this.handleChange} />
                        </div>
                        <button type="button" onClick={this.checkAnswer} className="sendAnswer">送出</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default PreTest;