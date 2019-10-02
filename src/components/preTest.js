import React, { Component } from "react";
import "../../css/preTest.css"
import { Link } from "react-router-dom";
let answer;
let index;
let currentQuiz;
let seconds = 0;
let randomTime;
let getSound;
let failSound;
let countDown;

class PreTest extends Component {
    state = {
        quizs: this.props.quizs,
        loadingClass: "hideLoading",
        timerClass: "timer",
        maskClass: "hideMask",
        logoClass: "hideLogo",
        containerClass: "hideContainer",
        sendButtonClass: "sendAnswer",
        resBoardClass: "hideResBoard",
        resPic: "resPic",
        alertBlockClass: "hideAlertBlock"
    }
    componentDidMount = () => {
        getSound = new Audio();
        getSound.src = "../../source/get.mp3";
        failSound = new Audio();
        failSound.src = "../../source/fail.mp3";
        setTimeout(() => {
            this.setState({
                containerClass: "preContainer",
                logoClass: "logo",
                timerClass: "hideTimer"
            })
        }, 5000);
        seconds = 0
    }
    handleChange = (e) => {
        answer = e.target.value
    }
    checkAnswer = () => {
        console.log(this)
        this.setState({ loadingClass: "preloading" });
        randomTime = Math.floor(Math.random() * 10000)
        if (answer === this.state.quizs[index].ANSWER) {
            if (seconds < 8) {
                setTimeout(() => {
                    this.setState({
                        logoClass: "hideLogo",
                        loadingClass: "hideLoading",
                        maskClass: "preTestMask",
                        sendButtonClass: "hideSendAnswer",
                        containerClass: "hideContainer",
                        resPic: "../../img/concert2S.jpg",
                        response: ""
                    })
                    getSound.play();
                    setTimeout(() => {
                        this.props.history.push("/")
                    }, 7000)
                    clearInterval(countDown);
                }, randomTime)

            } else {
                setTimeout(() => {
                    this.setState({
                        logoClass: "hideLogo",
                        loadingClass: "hideLoading",
                        maskClass: "preTestMask",
                        sendButtonClass: "hideSendAnswer",
                        containerClass: "hideContainer",
                        resPicClass: "preTestMask",
                        resPic: "../../img/fail.gif",
                        response: "手腳太慢了被搶走了"
                    })
                    failSound.play();
                    setTimeout(() => {
                        this.setState({
                            alertBlockClass: "alertBlock",
                        })
                    }, 7000)
                    clearInterval(countDown);

                }, randomTime)
            }
        } else {
            setTimeout(() => {
                this.setState({
                    logoClass: "hideLogo",
                    loadingClass: "hideLoading",
                    maskClass: "preTestMask",
                    sendButtonClass: "hideSendAnswer",
                    containerClass: "hideContainer",
                    resPic: "../../img/fail.gif",
                    resPicClass: "preTestMask",
                    response: "票券已完售"
                })
                failSound.play();
                setTimeout(() => {
                    this.setState({
                        alertBlockClass: "alertBlock",
                    })
                }, 7000)
                clearInterval(countDown);
            }, randomTime)

            seconds = 0;
        }
    }
    oneMoreTime = () => {
        this.setState({
            alertBlockClass: "hideAlertBlock",
            timerClass: "timer",
            containerClass: "hideContainer",
            sendButtonClass: "sendAnswer"
        })
        setTimeout(() => {
            this.setState({
                containerClass: "preContainer",
                maskClass: "hideMask",
                logoClass: "preTestlogo",
                timerClass: "hideTimer",
                resPicClass: "hidemask",
                resPic: "hideResPic",
            })
        }, 5000);
        clearInterval(countDown);
    }
    backToIndex = () => {
        clearInterval(countDown);
        this.props.history.push("/")
    }
    render() {
        seconds = 0
        countDown = setInterval(() => {
            seconds++
            console.log(seconds)
        }, 1000);
        index = Math.floor(Math.random() * this.state.quizs.length)
        console.log("pre", index)
        const options = this.state.quizs[index].OPTIONS.map((option, num) => {
            return (
                <div className="option" key={Math.random()}> ( {num + 1} ) {option} </div>
            )
        })
        const picOption = this.state.quizs[index].OPTIONS.map((option, num) => {
            return (
                <div className="picOption" key={Math.random()}> ( {num + 1} )
                <img className="picSource" src={option} />
                </div>
            )
        })
        if (this.state.quizs[index].TAG === "text") {
            currentQuiz =
                <React.Fragment>
                    <div className="quiz">{this.state.quizs[index].QUIZ}</div>
                    <div className="options">
                        {options}
                    </div>
                </React.Fragment>
        } else if (this.state.quizs[index].TAG === "picture") {
            currentQuiz =
                <React.Fragment>
                    <div className="quiz">{this.state.quizs[index].QUIZ}</div>
                    <div className="options">
                        {picOption}
                    </div>
                </React.Fragment>
        } else {
            currentQuiz =
                <React.Fragment>
                    <div className="pic_quiz_title">{this.state.quizs[index].QUIZ}</div>
                    <img src={this.state.quizs[index].QUIZPIC} className="pic_quiz_img hvr-grow" />
                    <div className="options">
                        {options}
                    </div>
                </React.Fragment>
        }
        return (
            <React.Fragment>
                <Link to="/">
                    <img src="/../img/LOGO.png" className={this.state.logoClass} />
                </Link>
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
                            <div className="note">請在下方答案框輸入答案<br /><span> * 僅限半形數字，請勿填寫中文</span></div>
                            <input type="text" className="quiz-answer" value={this.state.answer} onChange={this.handleChange} />
                        </div>
                        <button type="button" onClick={this.checkAnswer} className={this.state.sendButtonClass}>送出</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PreTest;