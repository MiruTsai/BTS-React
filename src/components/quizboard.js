import React, { Component } from "react"
import "../../css/quiz.css"
import fire from "../Fire"
import QuizAnime from "./Quizanime"
import Scalper from "./Scalper"
import { Link } from "react-router-dom"
import TextType from "./quizType/TextType"
import PictureType from "./quizType/PictureType"
import PictureType2 from "./quizType/PictureType2"
let qid

class AnswerBlock extends Component {
    state = {
        ANSWER: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    setKeyCode = () => {
        if (event.keyCode === 13 || event.keyCode === 108) {
            if (this.state.ANSWER === "") {
                this.props.closeRes()
            } else {
                this.props.checkAnswer(this)
                this.setState({
                    ANSWER: ""
                })
            }
        }
    }
    componentDidMount = () => {
        window.addEventListener("keydown", this.setKeyCode)
    }
    componentWillUnmount = () => {
        window.removeEventListener("keydown", this.setKeyCode)
    }
    render () {
        return (
            <>
                <div className="answerBlock">
                    <div className="note">請在答案框輸入答案<br /> <span className="quiz-subtext">* 僅限半形數字，請勿填寫中文</span></div>
                    <input type="text" name="ANSWER" className="quiz-answer" value={this.state.ANSWER} onChange={this.handleChange} />
                    <button type="button" className="quiz-button" onClick={() => this.props.checkAnswer(this)}>確定</button>
                </div>
            </>
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
        blurLayer: "hide",
        res: "",
        scalper: "hide"
    }
    componentDidMount = () => {
        const { Group } = this.props
        let groupName = ""
        Group === "IZ*ONE" ? groupName = "IZONE" : groupName = Group
        if (Group === "BTS") {
            this.rightResponse = ["group_right_1.gif", "group_right_2.gif", "group_right_3.gif", "jhope_right_1.gif", "jimin_right_1.gif", "jin_right_1.gif", "jin_right_2.gif", "jk_right_1.gif", "jk_right_2.gif", "rm_right_1.gif", "rm_right_2.gif", "suga_right_1.gif", "suga_right_1.gif", "v_right_1.gif", "v_right_2.gif"]
            this.wrongResponse = ["group_wrong_1.gif", "group_wrong_2.gif", "jhope_wrong_1.gif", "jhope_wrong_3.gif", "jhope_wrong_4.gif", "jimin_wrong_1.gif", "jimin_wrong_2.gif", "jin_wrong_1.gif", "jin_wrong_2.gif", "jin_wrong_3.gif", "jk_wrong_1.gif", "suga_wrong_1.gif", "suga_wrong_2.gif", "rm_wrong_1.gif"]
        } else if (Group === "IZ*ONE") {
            this.rightResponse = ["chaewon_right_1.gif", "chaewon_right_2.gif", "group_right_1.gif", "group_right_2.gif", "hitomi_right_1.gif", "hyewon_right_1.gif", "nako_right_1.gif", "sakura_right_1.gif", "wonyoung_right_1.gif"]
            this.wrongResponse = ["chaeyeon_wrong_1.gif", "hitomi_wrong_1.gif", "hyewon_wrong_1.gif", "minjoo_wrong_1.gif", "minjoo_wrong_2.gif", "wonyoung_wrong_1.gif", "yena_wrong_1.gif", "yena_wrong_2.gif", "yuri_wrong_1.gif"]
        } else {
            this.rightResponse = ["group_right_1.gif", "group_right_2.gif", "group_right_3.gif", "group_right_4.gif", "jeong_right_1.gif", "nayeon_right_1.gif", "nayeon_right_2.gif"]
            this.wrongResponse = ["chae_wrong_1.gif", "dahyun_wrong_1.gif", "group_wrong_1.gif", "mina_wrong_1.gif", "nayeon_wrong_1.gif", "sana_wrong_1.gif", "sana_wrong_2.gif", "tzuyu_wrong_1.gif"]
        }
        this.wrongSound = new Audio("../../source/wrong.mp3")
        this.rightSound = new Audio("../../source/right.mp3")
        this.errorSound = new Audio("../../source/error.mp3")

        window.setTimeout(() => {
            this.setState({
                animeClass: "hide",
                containerClass: "quizContainer"
            })
        }, 4000)
        fire.firestore().collection("MemberShip").doc(this.props.userUid).get().then((doc) => {
            if (doc.exists) {
                let userInfo = doc.data()
                if (!userInfo[groupName + "rightCounter"]) {
                    this.userRightCounter = 0
                } else {
                    this.userRightCounter = userInfo[groupName + "rightCounter"]
                }
                if (!userInfo[groupName + "wrongCounter"]) {
                    this.userWrongCounter = 0
                } else {
                    this.userWrongCounter = userInfo[groupName + "wrongCounter"]
                }
            }
        })
    }
    componentWillUnmount = () => {
        const { Group } = this.props
        let groupName = ""
        Group === "IZ*ONE" ? groupName = "IZONE" : groupName = Group
        fire.firestore().collection("MemberShip").doc(this.props.userUid).update({
            [groupName + "rightCounter"]: this.userRightCounter + this.state.rightQuizs.length,
            [groupName + "wrongCounter"]: this.userWrongCounter + this.state.wrongQuizs.length
        })
    }
    checkAnswer = (e) => {
        const { quizs, rightQuizs, wrongQuizs } = this.state
        const { Group } = this.props
        let groupName = ""
        Group === "IZ*ONE" ? groupName = "IZONE" : groupName = Group
        let quizRightCounter = quizs[qid].rightCounter
        let quizWrongCounter = quizs[qid].wrongCounter
        this.rightResIndex = Math.floor(Math.random() * this.rightResponse.length)
        this.wrongResIndex = Math.floor(Math.random() * this.wrongResponse.length)
        if (!e.state.ANSWER) {
            alert("請輸入答案")
            return
        } else if (e.state.ANSWER === quizs[qid].ANSWER) {
            fire.firestore().collection(groupName + "QUIZS").doc(quizs[qid].id).update({
                "rightCounter": quizRightCounter + 1
            }).then(() => {
                if (quizRightCounter + quizWrongCounter === 0) {
                    this.reply = "恭喜你是第一個答對的人！！"
                } else {
                    this.reply = "只有 " + Math.floor(quizRightCounter / (quizRightCounter + quizWrongCounter) * 100) + "% 的人答對呢！"
                }
                this.setState((prevState) => ({
                    rightCounter: prevState.rightCounter + 1,
                    rightQuizs: [...rightQuizs, quizs[qid]],
                    quizs: quizs.filter(p => p.QUIZ !== quizs[qid].QUIZ),
                    res: "答對了！" + this.reply,
                    resBoardClass: "resBoard",
                    resPic: "../../img/right/" + groupName + "/" + this.rightResponse[this.rightResIndex],
                    containerClass: "hideContainer",
                    blurLayer: "blurLayer"
                }))
                this.rightSound.play()
            })
        } else {
            fire.firestore().collection(groupName + "QUIZS").doc(quizs[qid].id).update({
                "wrongCounter": quizWrongCounter + 1
            }).then(() => {
                if (quizRightCounter + quizWrongCounter === 0) {
                    this.reply = "你是第一個答錯的人 T T"
                } else {
                    this.reply = "沒關係有 " +
                        Math.floor(quizWrongCounter / (quizRightCounter + quizWrongCounter) * 100) + "% 的人沒答對。"
                }
                if (wrongQuizs.length > 4) {
                    this.setState({
                        scalper: "scalper",
                        containerClass: "hideContainer"
                    })
                    this.errorSound.play()
                    setTimeout(() => { this.props.history.push("/") }, 6000)
                } else {
                    this.setState((prevState) => ({
                        wrongCounter: prevState.wrongCounter + 1,
                        wrongQuizs: [...wrongQuizs, quizs[qid]],
                        quizs: quizs.filter(p => p.QUIZ !== quizs[qid].QUIZ),
                        res: "答案是 " + quizs[qid].ANSWER + "。" + this.reply,
                        resBoardClass: "resBoard",
                        resPic: "../../img/wrong/" + groupName + "/" + this.wrongResponse[this.wrongResIndex],
                        containerClass: "hideContainer",
                        blurLayer: "blurLayer"
                    }))
                    this.wrongSound.play()
                }
            })
        }
        e.state.ANSWER = ""
    }
    closeRes = () => {
        const { quizs } = this.state
        if (quizs.length === 0) {
            this.props.history.push("/profile")
        }
        this.setState({
            resBoardClass: "hideResBoard",
            containerClass: "quizContainer",
            blurLayer: "hide",
            resPic: ""
        })
    }
    render () {
        const { quizs, resBoardClass, res, resPic, blurLayer, scalper, animeClass, containerClass, rightQuizs, wrongQuizs } = this.state
        const { Group } = this.props
        let groupName = ""
        Group === "IZ*ONE" ? groupName = "IZONE" : groupName = Group
        qid = Math.floor(Math.random() * quizs.length)
        const renderQuiz = (quizs.length === 0) ? (null) : (<>{quizs[qid].TAG === "text" ? (<TextType quizs={quizs} index={qid} />) :
            (quizs[qid].TAG === "picture" ? (<PictureType quizs={quizs} index={qid} />) : (<PictureType2 quizs={quizs} index={qid} />))}</>)
        return (
            <>
                <div className={resBoardClass}>
                    <div className="board-Title">{Group}-TMI</div>
                    <div className="layer">
                        <img className="resPic" src={resPic} />
                        <div className="res">{res}</div>
                        <button type="button" className="qres-button" onClick={this.closeRes}>學起來</button>
                    </div>
                </div>
                <div className={blurLayer}>
                </div>
                <Scalper fake={scalper} />
                <Link to="/">
                    <img src={"/../img/logo/" + groupName + ".PNG"} className="quizLogo" />
                </Link>
                <QuizAnime animeClass={animeClass} Group={Group} />
                <div className={containerClass} >
                    <div className="top">
                        <div className="quizBlock">
                            {renderQuiz}
                        </div>
                        <AnswerBlock checkAnswer={this.checkAnswer} closeRes={this.closeRes} resBoardStatus={this.state.resBoardClass} />
                    </div>
                    <div className="counter">
                        <div className="all">還剩：{quizs.length}</div>
                        <div className="right">答對：{rightQuizs.length}</div>
                        <div className="wrong">答錯：{wrongQuizs.length}</div>
                    </div>
                </div>
            </>
        )
    }
}
export default QuizBoard