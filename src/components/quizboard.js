import React, { Component } from 'react';
import '../../css/quiz.css';
import fire from '../fire';
import CurrentQuiz from './quiz';
let currentQuiz;
let index;
let answer;
let num = 1;
class QuizBoard extends React.Component {
    state = {
        wrongQuizs: [],
        rightQuizs: [],
        rightCounter: 0,
        wrongCounter: 0
    }


    handleChange = (e) => {
        e.preventDefault()
    }

    checkAnswer = () => {
        console.log(this)
        if (answer === this.props.quizs[index].ANSWER) {
            this.setState({
                rightCounter: this.state.rightCounter + 1,
            })
        } else {
            this.setState({ wrongCounter: this.state.wrongCounter + 1 })
        }
    }
    render() {
        const { quizs } = this.props
        index = Math.floor(Math.random() * quizs.length)
        console.log(quizs[index])
        const options = quizs[index].OPTIONS.map((option, num) => {
            return (
                <div className="option" key={Math.random()}> ( {num + 1} ) {option} </div>
            )
        }
        )

        const picOption = quizs[index].OPTIONS.map((option, num) => {

            return (
                <div className="picOption" key={Math.random()}> ( {num + 1} )
                <img className="picSource" src={option} />
                </div>
            )
        }
        )

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

        return (
            <div className="container" >
                <div className="top">
                    <div className="quizBlock">
                        {currentQuiz}
                    </div>
                    <div className="answerBlock">
                        <div className="note">請在下方答案框輸入答案<br /> * 僅限半形數字，請勿填寫中文</div>
                        <input type="text" className="answer" value={this.state.answer} onChange={this.handleChange} />
                    </div>
                    <button type="submit" onClick={this.checkAnswer}>送出</button>
                </div>
                <div className="counter">
                    <div className="all">還有：{quizs.length}</div>
                    <div className="right">答對：{this.state.rightCounter}</div>
                    <div className="wrong">答錯：{this.state.wrongCounter}</div>
                </div>
            </div>
        )
    }
}

export default QuizBoard;