import React, { Component } from "react";
import "../../css/preTest.css"
import { Link } from "react-router-dom";
import GetTicketGuide from "./Guide";
import TextType from "./quizType/TextType";
import PictureType from "./quizType/PictureType";
import PictureType2 from "./quizType/PictureType2";
let index;
let currentQuiz;

class AnswerBlock extends Component {
    state = {
        ANSWER: ""
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
    componentWillUnmount = () => {
        window.removeEventListener("keydown", event => {
            if (event.keyCode === 13 || event.keyCode === 108) {
                this.props.checkAnswer(this);
                this.state.ANSWER = "";
            }
        })
    }
    render () {
        const { checkAnswer } = this.props;
        const { ANSWER } = this.state;
        return (
            <React.Fragment>
                <div className="answerBlock">
                    <div className="note">請在答案框輸入答案<br /> <span className="quiz-subtext">* 僅限半形數字，請勿填寫中文</span></div>
                    <input type="text" name="ANSWER" className="quiz-answer" value={ANSWER} onChange={this.handleChange} />
                    <button type="button" className="quiz-button" onClick={() => checkAnswer(this)}>確定</button>
                </div>
            </React.Fragment>
        )
    }
}

class PreTest extends Component {
    seconds = 0 ;
    getSound = new Audio("../../source/get.mp3");
    failSound = new Audio("../../source/fail.mp3");
    state = {
        quizs: this.props.quizs,
        loadingClass: "hide",
        maskClass: "hideMask",
        logoClass: "hide",
        timerClass: "hideTimer",
        containerClass: "hide",
        resBoardClass: "hideResBoard",
        alertBlockClass: "hide",
        guideClass: "guide"
    }
    componentDidMount = () => {
        this.countDown = setInterval(() => {
            this.seconds++
        }, 1000);
        this.seconds = 0;
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
            guideClass: "hide",
            timerClass: "timer"
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
        let randomTime = Math.floor(Math.random() * 10000);
        if (e.state.ANSWER === this.state.quizs[index].ANSWER) {
            if (this.seconds < 5) {
                setTimeout(() => {
                    this.setState({
                        logoClass: "hide",
                        loadingClass: "hide",
                        maskClass: "preTestMask",
                        containerClass: "hide",
                        resPic: "../../img/concert2S.jpg",
                        resPicClass: "preResPic",
                        response: "",
                        resBoardClass: "hideResBoard"
                    })
                    this.getSound.play();
                    setTimeout(() => {
                        this.props.history.push("/")
                    }, 7000)
                }, randomTime)
            } else {
                setTimeout(() => {
                    this.setState({
                        logoClass: "hide",
                        loadingClass: "hide",
                        maskClass: "preTestMask",
                        containerClass: "hide",
                        resPicClass: "wrongResPic",
                        resPic: "../../img/fail.gif",
                        response: "手腳太慢被搶光了...",
                        resBoardClass: "response"
                    })
                    this.failSound.play();
                    setTimeout(() => {
                        this.setState({
                            alertBlockClass: "alertBlock"
                        })
                    }, 7000)
                }, randomTime)
            }
        } else {
            setTimeout(() => {
                this.setState({
                    logoClass: "hide",
                    loadingClass: "hide",
                    maskClass: "preTestMask",
                    containerClass: "hide",
                    resPic: "../../img/fail.gif",
                    resPicClass: "wrongResPic",
                    response: "答案錯囉...",
                    resBoardClass: "response"
                })
                this.failSound.play();
                setTimeout(() => {
                    this.setState({
                        alertBlockClass: "alertBlock"
                    })
                }, 7000)
            }, randomTime)
            this.seconds = 0;
        }
        e.state.ANSWER = "";
    }
    oneMoreTime = () => {
        this.setState({
            alertBlockClass: "hide",
            timerClass: "timer",
            containerClass: "hide"
        })
        setTimeout(() => {
            this.setState({
                containerClass: "preContainer",
                maskClass: "hideMask",
                logoClass: "preTestlogo",
                timerClass: "hideTimer",
                resPicClass: "hideMask"
            })
        }, 5000);
    }
    backToIndex = () => {
        this.props.history.push("/")
    }
    render () {
        const { quizs } = this.state;
        index = Math.floor(Math.random() * quizs.length);
        if (quizs[index].TAG === "text") {
            currentQuiz = <TextType quizs={quizs} index={index} />
        } else if (quizs[index].TAG === "picture") {
            currentQuiz = <PictureType quizs={quizs} index={index} />
        } else {
            currentQuiz = <PictureType2 quizs={quizs} index={index} />
        }
        this.seconds = 0;
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
                    <img src={this.state.resPic} className={this.state.resPicClass} />
                    <div className={this.state.resBoardClass}>{this.state.response}</div>
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