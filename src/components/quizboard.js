import React, { Component } from "react";
import "../../css/quiz.css";
import fire from "../fire";
import QuizAnime from "./quizanime";
import Scalper from "./scalper";
import { Link } from "react-router-dom";
import TextType from "./quizType/textType";
import PictureType from "./quizType/pictureType";
import PictureType2 from "./quizType/pictureType2";
let currentQuiz;
let index;
let num = 1;
let wrongSound;
let rightSound;
let errorSound;
let userRightCounter;
let userWrongCounter;
let quizRightCounter;
let quizWrongCounter;
let rightResIndex;
let wrongResIndex;

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

class QuizBoard extends React.Component {
    state = {
        wrongQuizs: [],
        rightQuizs: [],
        rightCounter: 0,
        wrongCounter: 0,
        quizs: this.props.quizs,
        resBoardClass: "hideResBoard",
        containerClass: "hideContainer",
        animeClass: "anime",
        blurLayer: "hideBlurLayer",
        res: "",
        scalper: "hideScalper",
        rightResponse: ["group_right_1.gif", "group_right_2.gif", "group_right_3.gif", "jhope_right_1.gif", "jimin_right_1.gif", "jin_right_1.gif", "jin_right_2.gif", "jk_right_1.gif", "jk_right_2.gif", "rm_right_1.gif", "rm_right_2.gif", "suga_right_1.gif", "suga_right_1.gif", "v_right_1.gif", "v_right_2.gif"],
        wrongResponse: ["group_wrong_1.gif", "group_wrong_2.gif", "jhope_wrong_1.gif", "jhope_wrong_3.gif", "jhope_wrong_4.gif", "jimin_wrong_1.gif", "jimin_wrong_2.gif", "jin_wrong_1.gif", "jin_wrong_2.gif", "jin_wrong_3.gif", "jk_wrong_1.gif", "suga_wrong_1.gif", "suga_wrong_2.gif", "rm_wrong_1.gif"],
    }
    componentDidMount = () => {
        wrongSound = new Audio();
        wrongSound.src = "../../source/wrong.mp3";
        rightSound = new Audio();
        rightSound.src = "../../source/right.mp3";
        errorSound = new Audio();
        errorSound.src = "../../source/error.mp3";
        window.addEventListener("keydown", event => {
            if (event.keyCode === 32) {
                this.closeRes();
            }
        })
        window.setTimeout(() => {
            this.setState({
                animeClass: "hideQuizAnime",
                containerClass: "quizContainer"
            })
        }, 2000)
        fire.firestore().collection("MemberShip").doc(this.props.userUid).get().then((doc) => {
            if (doc.exists) {
                let userInfo = doc.data();
                userRightCounter = userInfo.rightCounter;
                userWrongCounter = userInfo.wrongCounter;
            }
        })
    }
    componentWillUnmount = () => {
        fire.firestore().collection("MemberShip").doc(this.props.userUid).update({
            rightCounter: userRightCounter + this.state.rightQuizs.length,
            wrongCounter: userWrongCounter + this.state.wrongQuizs.length
        })
    }
    checkAnswer = (e) => {
        quizRightCounter = this.state.quizs[index].rightCounter;
        quizWrongCounter = this.state.quizs[index].wrongCounter;
        rightResIndex = Math.floor(Math.random() * this.state.rightResponse.length);
        wrongResIndex = Math.floor(Math.random() * this.state.wrongResponse.length);
        if (e.state.ANSWER === this.state.quizs[index].ANSWER) {
            fire.firestore().collection("QUIZS").doc(this.state.quizs[index].id).update({
                rightCounter: quizRightCounter + 1,
            }).then(() => {
                this.setState((prevState) => ({
                    rightCounter: prevState.rightCounter + 1,
                    rightQuizs: [...this.state.rightQuizs, this.state.quizs[index]],
                    quizs: this.state.quizs.filter(p => p.QUIZ !== this.state.quizs[index].QUIZ),
                    res: "答對了！只有 " + Math.floor(quizRightCounter / (quizRightCounter + quizWrongCounter) * 100) + "% 的人答對呢！",
                    resBoardClass: "resBoard",
                    resPic: "../../img/right/" + this.state.rightResponse[rightResIndex],
                    containerClass: "hideContainer",
                    blurLayer: "blurLayer"
                }))
                rightSound.play();
            })
        } else {
            fire.firestore().collection("QUIZS").doc(this.state.quizs[index].id).update({
                wrongCounter: quizWrongCounter + 1,
            }).then(() => {
                this.setState((prevState) => ({
                    wrongCounter: prevState.wrongCounter + 1,
                    wrongQuizs: [...this.state.wrongQuizs, this.state.quizs[index]],
                    quizs: this.state.quizs.filter(p => p.QUIZ !== this.state.quizs[index].QUIZ),
                    res: "答案是 " + this.state.quizs[index].ANSWER + "。" + "沒關係有 " + Math.floor(quizWrongCounter / (quizRightCounter + quizWrongCounter) * 100) + "% 的人沒答對。",
                    resBoardClass: "resBoard",
                    resPic: "../../img/wrong/" + this.state.wrongResponse[wrongResIndex],
                    containerClass: "hideContainer",
                    blurLayer: "blurLayer",
                }))
                wrongSound.play();
            })
        }
        e.state.ANSWER = "";
    }
    closeRes = () => {
        this.setState({
            resBoardClass: "hideResBoard",
            containerClass: "quizContainer",
            blurLayer: "hideBlurLayer",
            resPic: ""
        })
        if (this.state.wrongQuizs.length === 40) {
            this.setState({
                scalper: "scalper",
                containerClass: "hideContainer"
            })
            errorSound.play();
            setTimeout(() => { this.props.history.push("/") }, 6000)
        }
    }

    render() {
        const { quizs, resBoardClass, res, resPic, blurLayer, scalper, animeClass, containerClass, rightQuizs, wrongQuizs } = this.state;
        if (!quizs.length) {
            this.props.history.push("/profile");
        } else {
            index = Math.floor(Math.random() * quizs.length)
            if (quizs[index].TAG === "text") {
                currentQuiz = <TextType quizs={quizs} index={index} />
            } else if (quizs[index].TAG === "picture") {
                currentQuiz = <PictureType quizs={quizs} index={index} />
            } else {
                currentQuiz = <PictureType2 quizs={quizs} index={index} />
            }
        }
        return (
            <React.Fragment>
                <div className={resBoardClass}>
                    <div className="board-Title">BTS-TMI</div>
                    <div className="layer">
                        <img className="resPic" src={resPic} />
                        <div className="res">{res}</div>
                        <button type="button" className="qres-button" onClick={this.closeRes}>知道了</button>
                    </div>
                </div>
                <div className={blurLayer}>
                </div>
                <Scalper fake={scalper} />
                <Link to="/">
                    <img src="/../img/LOGO.png" className="quizLogo" />
                </Link>
                <QuizAnime animeClass={animeClass} />
                <div className={containerClass} >
                    <div className="top">
                        <div className="quizBlock">
                            {currentQuiz}
                        </div>
                        <AnswerBlock checkAnswer={this.checkAnswer} />
                    </div>
                    <div className="counter">
                        <div className="all">還有：{quizs.length}</div>
                        <div className="right">答對：{rightQuizs.length}</div>
                        <div className="wrong">答錯：{wrongQuizs.length}</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default QuizBoard;