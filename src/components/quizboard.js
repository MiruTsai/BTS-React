import React, { Component } from "react";
import "../../css/quiz.css";
import fire from "../Fire";
import QuizAnime from "./Quizanime";
import Scalper from "./Scalper";
import { Link } from "react-router-dom";
import TextType from "./quizType/TextType";
import PictureType from "./quizType/PictureType";
import PictureType2 from "./quizType/PictureType2";

let quizIndex

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
                if (this.state.ANSWER === "") {
                    this.props.closeRes();
                } else {
                    this.props.checkAnswer(this);
                    this.state.ANSWER = "";
                }
            }
        })
    }

    componentWillUnmount = () => {
        window.removeEventListener("keydown", event => {
            if (event.keyCode === 13 || event.keyCode === 108) {
                if (this.state.ANSWER === "") {
                    this.props.closeRes();
                } else {
                    this.props.checkAnswer(this);
                    this.state.ANSWER = "";
                }
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
    wrongSound = new Audio("../../source/wrong.mp3");
    rightSound = new Audio("../../source/right.mp3");
    errorSound = new Audio("../../source/error.mp3");
    rightResponse = ["group_right_1.gif", "group_right_2.gif", "group_right_3.gif", "jhope_right_1.gif", "jimin_right_1.gif", "jin_right_1.gif", "jin_right_2.gif", "jk_right_1.gif", "jk_right_2.gif", "rm_right_1.gif", "rm_right_2.gif", "suga_right_1.gif", "suga_right_1.gif", "v_right_1.gif", "v_right_2.gif"];
    wrongResponse = ["group_wrong_1.gif", "group_wrong_2.gif", "jhope_wrong_1.gif", "jhope_wrong_3.gif", "jhope_wrong_4.gif", "jimin_wrong_1.gif", "jimin_wrong_2.gif", "jin_wrong_1.gif", "jin_wrong_2.gif", "jin_wrong_3.gif", "jk_wrong_1.gif", "suga_wrong_1.gif", "suga_wrong_2.gif", "rm_wrong_1.gif"];
    state = {
        wrongQuizs: [],
        rightQuizs: [],
        rightCounter: 0,
        wrongCounter: 0,
        quizs: this.props.quizs,
        resBoardClass: "hideResBoard",
        containerClass: "hideContainer",
        animeClass: "anime",
        blurLayer: "hide",
        res: "",
        scalper: "hide",
    }
    componentDidMount = () => {
        window.setTimeout(() => {
            this.setState({
                animeClass: "hide",
                containerClass: "quizContainer"
            })
        }, 2000)
        fire.firestore().collection("MemberShip").doc(this.props.userUid).get().then((doc) => {
            if (doc.exists) {
                let userInfo = doc.data();
                this.userRightCounter = userInfo.rightCounter;
                this.userWrongCounter = userInfo.wrongCounter;
            }
        })
    }
    componentWillUnmount = () => {
        fire.firestore().collection("MemberShip").doc(this.props.userUid).update({
            rightCounter: this.userRightCounter + this.state.rightQuizs.length,
            wrongCounter: this.userWrongCounter + this.state.wrongQuizs.length
        })
    }
    checkAnswer = (e) => {
        const { quizs, rightQuizs, wrongQuizs } = this.state;
        let quizRightCounter = quizs[quizIndex].rightCounter;
        let quizWrongCounter = quizs[quizIndex].wrongCounter;
        this.rightResIndex = Math.floor(Math.random() * this.rightResponse.length);
        this.wrongResIndex = Math.floor(Math.random() * this.wrongResponse.length);
        if (e.state.ANSWER === quizs[quizIndex].ANSWER) {
            fire.firestore().collection("QUIZS").doc(quizs[quizIndex].id).update({
                rightCounter: quizRightCounter + 1,
            }).then(() => {
                if (quizRightCounter + quizWrongCounter === 0) {
                    this.reply = "恭喜你是第一個答對的人！！"
                } else {
                    this.reply = "只有 " + Math.floor(quizRightCounter / (quizRightCounter + quizWrongCounter) * 100) + "% 的人答對呢！"
                }
                this.setState((prevState) => ({
                    rightCounter: prevState.rightCounter + 1,
                    rightQuizs: [...rightQuizs, quizs[quizIndex]],
                    quizs: quizs.filter(p => p.QUIZ !== quizs[quizIndex].QUIZ),
                    res: "答對了！" + this.reply,
                    resBoardClass: "resBoard",
                    resPic: "../../img/right/" + this.rightResponse[this.rightResIndex],
                    containerClass: "hideContainer",
                    blurLayer: "blurLayer"
                }))
                this.rightSound.play();
            })
        } else {
            fire.firestore().collection("QUIZS").doc(quizs[quizIndex].id).update({
                wrongCounter: quizWrongCounter + 1,
            }).then(() => {
                if (quizRightCounter + quizWrongCounter === 0) {
                    this.reply = "你是第一個答錯的人 T T"
                } else {
                    this.reply = "沒關係有 " +
                        Math.floor(quizWrongCounter / (quizRightCounter + quizWrongCounter) * 100) + "% 的人沒答對。"
                }
                this.setState((prevState) => ({
                    wrongCounter: prevState.wrongCounter + 1,
                    wrongQuizs: [...wrongQuizs, quizs[quizIndex]],
                    quizs: quizs.filter(p => p.QUIZ !== quizs[quizIndex].QUIZ),
                    res: "答案是 " + quizs[quizIndex].ANSWER + "。" + this.reply,
                    resBoardClass: "resBoard",
                    resPic: "../../img/wrong/" + this.wrongResponse[this.wrongResIndex],
                    containerClass: "hideContainer",
                    blurLayer: "blurLayer",
                })
                )
                this.wrongSound.play();
            })
        }
        e.state.ANSWER = "";
    }
    closeRes = () => {
        this.setState({
            resBoardClass: "hideResBoard",
            containerClass: "quizContainer",
            blurLayer: "hide",
            resPic: ""
        })
        if (this.state.quizs.length === 0) {
            this.props.history.push("/profile");
        }
        if (this.state.wrongQuizs.length > 5) {
            this.setState({
                scalper: "scalper",
                containerClass: "hideContainer"
            })
            this.errorSound.play();
            setTimeout(() => { this.props.history.push("/") }, 6000)
        }
    }
    render() {
        const { quizs, resBoardClass, res, resPic, blurLayer, scalper, animeClass, containerClass, rightQuizs, wrongQuizs } = this.state;
        quizIndex = Math.floor(Math.random() * quizs.length)
        if (quizs[quizIndex].TAG === "text") {
            this.currentQuiz = <TextType quizs={quizs} index={quizIndex} />
        } else if (quizs[quizIndex].TAG === "picture") {
            this.currentQuiz = <PictureType quizs={quizs} index={quizIndex} />
        } else {
            this.currentQuiz = <PictureType2 quizs={quizs} index={quizIndex} />
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
                            {this.currentQuiz}
                        </div>
                        <AnswerBlock checkAnswer={this.checkAnswer} closeRes={this.closeRes} />
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