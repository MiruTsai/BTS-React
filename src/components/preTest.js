import React, { Component } from 'react';
import '../../css/preTest.css'
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
        loadingClass: 'hideLoading',
        timerClass: 'timer',
        maskClass: 'hideMask',
        logoClass: 'hideLogo',
        containerClass: 'hideContainer',
        sendButtonClass: 'sendAnswer',
        againButtonClass: 'again',
        resBoardClass:'hideResBoard',
        resPic:'resPic',
        response:''
    }
    componentDidMount = () => {
        getSound = new Audio();
        getSound.src = '../../source/get.mp3';
        failSound = new Audio();
        failSound.src = '../../source/fail.mp3';
        setTimeout(() => {
            this.setState({
                containerClass: 'preContainer',
                logoClass: 'logo',
                timerClass: 'hideTimer'
            })
        }, 5000);
        seconds = 0
    }
    handleChange = (e) => {
        answer = e.target.value
    }
    checkAnswer = (props) => {
        this.setState({ loadingClass: 'preloading' });
        randomTime = Math.floor(Math.random() * 10000)
        console.log('random', randomTime)

        if (answer === this.state.quizs[index].ANSWER) {       
            if (seconds < 8) {
                setTimeout(() => {
                    this.setState({
                        loadingClass: 'hideLoading',
                        maskClass: 'preTestMask',
                        sendButtonClass: 'hideSendAnswer',
                        containerClass: 'hideContainer',
                        resPic:'../../img/concert2S.jpg',
                        res:''
                    })
                    getSound.play()
                }, randomTime)
                setTimeout(() => {
                props.history.push('/')
                },7000)
            } else {
                setTimeout(() => {
                    this.setState({
                        loadingClass: 'hideLoading',
                        maskClass: 'preTestMask',
                        sendButtonClass: 'hideSendAnswer',
                        containerClass: 'hideContainer',
                        resPicClass:'preTestMask',
                        resPic:'../../img/fail.gif',
                        res:'手腳太慢了被搶走了'
                    })
                    failSound.play();
                }, randomTime)
                setTimeout(() =>{
                    props.history.push('/quizboard')
                    },7000)
            }
        } else {
            setTimeout(() => {
                this.setState({
                    loadingClass: 'hideLoading',
                    maskClass: 'preTestMask',
                    againButtonClass: 'openAgain',
                    sendButtonClass: 'hideSendAnswer',
                    containerClass: 'hideContainer',
                    resPic:'../../img/fail.gif',
                    resPicClass:'preTestMask',
                    response:'票券已完售'
                })
                failSound.play();
            }, randomTime)
            setTimeout(() => {
                props.history.push('/quizboard')
                },7000)
        }
        seconds=0;
    }
    again = () => {
        this.setState({
            timerClass: 'timer',
            containerClass: 'hideContainer',
            logoClass: 'hideLogo',
            sendButtonClass: 'sendAnswer',
            againButtonClass: 'again'
        })
        setTimeout(() => {
            this.setState({
                containerClass: 'preContainer',
                logoClass: 'logo',
                timerClass: 'hideTimer',
                resPic:'hideResPic',
            })
        }, 5000);
    }

    render() {
        seconds = 0
        setInterval(() => {
            seconds++
            console.log(seconds)
        }, 1000);
        index = Math.floor(Math.random() * this.state.quizs.length)
        console.log('pre', index)
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
                    <img src={this.state.quizs[index].QUIZPIC} className='pic_quiz_img hvr-grow' />
                    <div className="options">
                        {options}
                    </div>
                </React.Fragment>
        }
        return (
            <React.Fragment>
                <div className={this.state.loadingClass}>
                    <img src="../../img/loading.gif" />
                </div>
                <div className={this.state.maskClass}>
                    <img src={this.state.resPic} className={this.resPicClass} />
                    <div className='response'>{this.state.response}</div>
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
                        <button type="button" onClick={this.again} className={this.state.againButtonClass}>再搶一次</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PreTest;