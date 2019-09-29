import React, { Component } from 'react';
import '../../css/quiz.css';
import fire from '../fire';
import QuizAnime from './quizanime';
import Scalper from './scalper';
import { Link } from 'react-router-dom';
let currentQuiz;
let index;
let answer;
let num = 1;
let wrongSound;
let rightSound;
let errorSound;

class QuizBoard extends React.Component {
    state = {
        wrongQuizs: [],
        rightQuizs: [],
        rightCounter: 0,
        wrongCounter: 0,
        quizs: this.props.quizs,
        userRightCounter: this.props.userRightCounter,
        userWrongCounter: this.props.userWrongCounter,
        resBoardClass: 'hideResBoard',
        containerClass: 'hideContainer',
        animeClass: 'anime',
        blurLayer: 'hideBlurLayer',
        res: '',
        scalper: 'hideScalper',
        rightResponse: ["group_right_1.gif", "group_right_2.gif", "group_right_3.gif", "jhope_right_1.gif","jimin_right_1.gif", "jin_right_1.gif", "jin_right_2.gif", "jk_right_1.gif", "jk_right_2.gif", "rm_right_1.gif", "rm_right_2.gif","suga_right_1.gif","suga_right_1.gif","v_right_1.gif","v_right_2.gif"],
        wrongResponse: ["group_wrong_1.gif", "group_wrong_2.gif","jhope_wrong_1.gif", "jhope_wrong_3.gif", "jhope_wrong_4.gif", "jimin_wrong_1.gif", "jimin_wrong_2.gif","jin_wrong_1.gif", "jin_wrong_2.gif", "jin_wrong_3.gif", "jk_wrong_1.gif", "suga_wrong_1.gif","suga_wrong_2.gif", "rm_wrong_1.gif"],
    }
    componentDidMount = () => {
        wrongSound = new Audio();
        wrongSound.src = '../../source/wrong.mp3';
        rightSound = new Audio();
        rightSound.src = '../../source/right.mp3';
        errorSound = new Audio();
        errorSound.src = '../../source/error.mp3';
        this.setState
        window.setTimeout(() => {
            this.setState({
                animeClass: 'hideQuizAnime',
                containerClass:'quizContainer'
            })
        }
            , 2000)
            fire.storage
    }
    handleChange = (e) => {
        e.preventDefault()
        answer = e.target.value;
    }
    checkAnswer = () => {
        let quizRightCounter = this.state.quizs[index].rightCounter;
        let quizWrongCounter = this.state.quizs[index].wrongCounter;
        let rightResIndex = Math.floor(Math.random() * this.state.rightResponse.length);
        let wrongResIndex = Math.floor(Math.random() * this.state.wrongResponse.length);
        if (answer === this.state.quizs[index].ANSWER) {
            this.setState({
                rightCounter: this.state.rightCounter + 1,
                userRightCounter: this.state.userRightCounter + 1,
                rightQuizs: [...this.state.rightQuizs, this.state.quizs[index]],
                quizs: this.state.quizs.filter(p => p.QUIZ !== this.state.quizs[index].QUIZ),
                res: '答對了！',
                resBoardClass: 'resBoard',
                resPic: '../../img/right/' + this.state.rightResponse[rightResIndex],
                containerClass: 'hideContainer',
                blurLayer: 'blurLayer'
            })
            fire.firestore().collection('MemberShip').doc(this.props.userUid).update({
                rightCounter: this.state.userRightCounter,
            })
            fire.firestore().collection('QUIZS').doc(this.props.quizs[index].id).update({
                rightCounter: quizRightCounter + 1,
            })
            rightSound.play();
        } else {
            this.setState({
                wrongCounter: this.state.wrongCounter + 1,
            })
            if (this.state.wrongCounter >= 5) { }
            this.setState({
                wrongCounter: this.state.wrongCounter + 1,
                userWrongCounter: this.state.userWrongCounter + 1,
                wrongQuizs: [...this.state.wrongQuizs, this.state.quizs[index]],
                quizs: this.state.quizs.filter(p => p.QUIZ !== this.state.quizs[index].QUIZ),
                res: '錯了！答案是' + this.state.quizs[index].ANSWER,
                resBoardClass: 'resBoard',
                resPic: '../../img/wrong/' + this.state.wrongResponse[wrongResIndex],
                containerClass: 'hideContainer',
                blurLayer: 'blurLayer'
            })
            fire.firestore().collection('MemberShip').doc(this.props.userUid).update({
                wrongCounter: this.state.userWrongCounter,
            })
            fire.firestore().collection('QUIZS').doc(this.props.quizs[index].id).update({
                wrongCounter: quizWrongCounter + 1,
            })
            wrongSound.play();
        }
    }
    closeRes = () => {
        this.setState({
            resBoardClass: 'hideResBoard',
            containerClass: 'quizContainer',
            blurLayer: 'hideBlurLayer',
            resPic:''
        })
        if (this.state.wrongQuizs.length === 5) {
            this.setState({
                scalper: 'scalper',
                containerClass: 'hideContainer'
            })
            errorSound.play();
            setTimeout(() => { this.props.history.push('/') }, 6000)
        }
    }
    render() {
        const { quizs } = this.state
        if (!quizs.length) {
            this.props.history.push('/profile')
        } else {
            index = Math.floor(Math.random() * quizs.length)
            const options = quizs[index].OPTIONS.map((option, num) => {
                return (
                    <div className="option" key={Math.random()}> ( {num + 1} ) {option} </div>
                )
            })
            const picOption = quizs[index].OPTIONS.map((option, num) => {
                return (
                    <div className="picOption" key={Math.random()}> ( {num + 1} )
                <img className="picSource" src={option} />
                    </div>
                )
            })
            if (quizs[index].TAG === "text") {
                currentQuiz =
                    <React.Fragment>
                        <div className="quiz">{quizs[index].QUIZ}</div>
                        <div className="options">
                            {options}
                        </div>
                    </React.Fragment>
            } else if (quizs[index].TAG === "picture") {
                currentQuiz =
                    <React.Fragment>
                        <div className="quiz">{quizs[index].QUIZ}</div>
                        <div className="options">
                            {picOption}
                        </div>
                    </React.Fragment>
            } else {
                currentQuiz =
                    <React.Fragment>
                        <div className="pic_quiz_title">{quizs[index].QUIZ}</div>
                        <img src={quizs[index].QUIZPIC} className='pic_quiz_img hvr-grow' />
                        <div className="options">
                            {options}
                        </div>
                    </React.Fragment>
            }
        }
        return (
            <React.Fragment>
                <div className={this.state.resBoardClass}>
                    <img src={this.state.resPic} />
                    <div className="res">{this.state.res}</div>
                    <button type="button" className="res-button" onClick={this.closeRes}>知道了</button>
                </div>
                <div className={this.state.blurLayer}>
                </div>
                <Scalper fake={this.state.scalper} />
                <Link to="/">
                    <img src="/../img/LOGO.png" className="quizLogo" />
                </Link>
                <QuizAnime animeClass={this.state.animeClass} />
                <div className={this.state.containerClass} >
                    <div className="top">
                        <div className="quizBlock">
                            {currentQuiz}
                        </div>
                        <div className="answerBlock">
                            <div className="note">請在下方答案框輸入答案<br /> * 僅限半形數字，請勿填寫中文</div>
                            <input type="text" className="quiz-answer" value={this.state.answer} onChange={this.handleChange} />
                        </div>
                        <button type="button" className="quiz-button" onClick={this.checkAnswer}>確定</button>
                    </div>
                    <div className="counter">
                        <div className="all">還有：{this.state.quizs.length}</div>
                        <div className="right">答對：{this.state.rightQuizs.length}</div>
                        <div className="wrong">答錯：{this.state.wrongQuizs.length}</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default QuizBoard;