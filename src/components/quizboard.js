import React, { Component } from 'react';
import '../../css/quiz.css';
import fire from '../fire';
// import soundfile from '../../dist/source/right.mp3'
// import Sound from 'react-sound';

let currentQuiz;
let index;
let answer;
let num = 1;
let userRightCounter;
let userWrongCounter;
let wrongSound;
let rightSound

// class Audio extends React.Component {
//     render() {
//       return (
//         <Sound
//    url={soundfile}
//    />
//       );
//     }
//   }

class QuizBoard extends React.Component {
    state = {
        wrongQuizs: [],
        rightQuizs: [],
        rightCounter: 0,
        wrongCounter: 0,
        quizs: this.props.quizs,
    }
    
    componentDidMount = () => {
        
        wrongSound=new Audio();
        wrongSound.src='../../source/wrong.mp3';
        rightSound = new Audio();
        rightSound.src='../../source/right.mp3';
        console.log('rightsound',rightSound)
        fire.firestore().collection('MemberShip').doc(fire.auth().currentUser.uid).get().then((doc) => {
            if (doc.exists) {
                let userInfo = doc.data()
                console.log('userind', userInfo);
                userRightCounter = userInfo.rightCounter;
                userWrongCounter = userInfo.wrongCounter;
            }
            this.setState({
                userRightCounter: userRightCounter,
                userWrongCounter: userWrongCounter,
            })
        })
    }
    handleChange = (e) => {
        e.preventDefault()
        answer = e.target.value;
    }
    checkAnswer = () => {
        let quizRightCounter = this.state.quizs[index].rightCounter;
        let quizWrongCounter = this.state.quizs[index].wrongCounter;
        if (answer === this.state.quizs[index].ANSWER) {
            this.setState({
                rightCounter: this.state.rightCounter + 1,
                userRightCounter: this.state.userRightCounter + 1,
                rightQuizs: [...this.state.rightQuizs, this.state.quizs[index]],
                quizs: this.state.quizs.filter(p => p.QUIZ !== this.state.quizs[index].QUIZ)
            })
            fire.firestore().collection('MemberShip').doc(this.props.userUid).update({
                rightCounter: this.state.userRightCounter,
            })
            fire.firestore().collection('QUIZS').doc(this.props.quizs[index].id).update({
                rightCounter: quizRightCounter + 1,
            })
            // return<Sound />
            rightSound.play()
        } else {
            this.setState({
                wrongCounter: this.state.wrongCounter + 1,
                userWrongCounter: this.state.userWrongCounter + 1,
                wrongQuizs: [...this.state.wrongQuizs, this.state.quizs[index]],
                quizs: this.state.quizs.filter(p => p.QUIZ !== this.state.quizs[index].QUIZ)
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
    render() {
        console.log(this)
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
            <div className="container" >
           
                <div className="top">
                    <div className="quizBlock">
                        {currentQuiz}
                    </div>
                    <div className="answerBlock">
                        <div className="note">請在下方答案框輸入答案<br /> * 僅限半形數字，請勿填寫中文</div>
                        <input type="text" className="answer" value={this.state.answer} onChange={this.handleChange} />
                    </div>
                    <button type="button" onClick={this.checkAnswer}>送出</button>
                </div>
                <div className="counter">
                    <div className="all">還有：{this.state.quizs.length}</div>
                    <div className="right">答對：{this.state.rightQuizs.length}</div>
                    <div className="wrong">答錯：{this.state.wrongQuizs.length}</div>
                </div>
            </div>
        )
    }
}

export default QuizBoard;