import React, { Component } from "react";
import "../../css/preTest.css"
import { Link } from "react-router-dom";
import GetTicketGuide from "./guide";
import TextType from "./quizType/textType";
import PictureType from "./quizType/pictureType";
import PictureType2 from "./quizType/pictureType2";
let index;
let currentQuiz;
let seconds = 0;
let randomTime;
let getSound;
let failSound;

class AnswerBlock extends Component {
    state = {
        ANSWER: "",
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount = () => {
        window.addEventListener("keydown", event => {
            if (event.keyCode === 13 || event.keyCode === 108) {
                this.props.checkAnswer(this);
                this.state.ANSWER = "";
            }
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="answerBlock">
                    <div className="note">請在答案框輸入答案<br /> <span className="quiz-subtext">* 僅限半形數字，請勿填寫中文</span></div>
                    <input type="text" name="ANSWER" className="quiz-answer" value={this.state.ANSWER} onChange={this.handleChange} />
                    <button type="button" className="quiz-button" onClick={() => this.props.checkAnswer(this)}>確定</button>
                </div>
            </React.Fragment>
        )
    }
}

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
        this.countDown = setInterval(() => {
            seconds++
            console.log(seconds);
        }, 1000);
        seconds = 0;
    }
    componentWillUnmount = () => {
        clearInterval(this.countDown);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
    checkAnswer = (e) => {
        this.setState({ loadingClass: "preloading" });
        console.log("ANSWER", e.state.ANSWER)
        randomTime = Math.floor(Math.random() * 10000)
        if (e.state.ANSWER === this.state.quizs[index].ANSWER) {
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
                            ANSWER: ""
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
                        ANSWER: ""
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
        }, 5000);
    }
    backToIndex = () => {
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
                        <AnswerBlock checkAnswer={this.checkAnswer} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default PreTest;