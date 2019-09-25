import '../../css/addquiz.css';
import React from 'react';
import fire from '../fire'
import ReviewQuiz from './reviewQuiz';
let opt1='';
let opt2='';
let opt3='';
let opt4='';


const Description = (props) => {
    return (<div className="description">
        <div className="pic">
            <img className="group-pic" src="img/group2.png" />
        </div>
        <div className="info">
            <p>親愛的 ARMY，<br />在您貢獻題目前請先閱讀本站須知。</p>
            <button id="guide" className="hvr-grow" onClick={props.showGuide}>本站須知</button>
        </div>
    </div>)
}

class NewQuiz extends React.Component {
    render() {
        let quizTitle;
        if (this.props.TAG === "picture2") {
            quizTitle =
                <div className="choice">
                    <div className="text">題目</div>
                    <input type="text" name="QUIZ" id="quizTitle" value={this.props.QUIZ} onChange={this.props.updateInput} />
                    <div className="text">圖片網址</div>
                    <input type="text" name="QUIZPIC" id="quizTitle" value={this.props.QUIZPIC} onChange={this.props.updateInput} />
                </div>
        } else {
            quizTitle =
                <div className="choice">
                    <div className="text">題目</div>
                    <input type="text" name="QUIZ" id="quizTitle" value={this.props.QUIZ} onChange={this.props.updateInput} />
                </div>
        }

        return (
            <form>
                <div className="quizSelect">
                    <div className="text">題型</div>
                    <select id="quizType" name="TAG" value={this.props.TAG} onChange={this.props.handleChange}>
                        <option value="text">文字型</option>
                        <option value="picture">圖片型-1</option>
                        <option value="picture2">圖片型-2</option>
                    </select>
                </div>
                {quizTitle}
                <div className="choice">
                    <div className="text">選擇 1</div>
                    <input type="text" name="opt1" id="opt1" value={this.props.OPTIONS.opt1} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={this.props.updateInput} />
                    <div className="text">選擇 2</div>
                    <input type="text" name="opt2" id="opt2" value={this.props.OPTIONS.opt2} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={this.props.updateInput} />
                    <div className="text">選擇 3</div>
                    <input type="text" name="opt3" id="opt3" value={this.props.OPTIONS.opt3} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={this.props.updateInput} />
                    <div className="text">選擇 4</div>
                    <input type="text" name="opt4" id="opt4" value={this.props.OPTIONS.opt4} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={this.props.updateInput} />
                </div>
                <div className="choice answer_zone">
                    <div className="text">答案</div>
                    <input type="text" name="ANSWER" id="answer" value={this.props.ANSWER} placeholder="請輸入半形數字，勿輸入中文、英文或其他特殊字" onChange={this.props.updateInput} />
                    <div className="buttonBlock">
                        <button type="button" className="quizButton hvr-grow" onClick={this.props.sendQuiz}>提交</button>
                        <button type="button" className="quizButton hvr-grow" onClick={this.props.statusChange}>預覽</button>
                    </div>
                </div>
            </form>
        )
    }
}

class Addquiz extends React.Component {
    state = {
        className1: "textZone",
        className2: "maskHide",
        ANSWER: "",
        QUIZ: "",
        OPTIONS: [opt1,opt2,opt3,opt4],
        opt1:'',
        opt2:'',
        opt3:'',
        opt4:'',
        QUIZPIC: "",
        TAG: 'text',
        rightCounter: 0,
        wrongCounter: 0,
        review: false
    }
    showGuide = () => {
        this.setState({
            className1: "textZoneVisible",
            className2: "mask"
        })
    }
    hideGuide = () => {
        this.setState({
            className1: "textZone",
            className2: "maskHide"
        })
    }
    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChange = (e) => {
        this.setState({ TAG: e.target.value });
    }
    statusChange = () => {
        this.setState({
            review: !this.state.review
        })
    }
    sendQuiz = () => {
        if (this.state.TAG === "picture2") {
            fire.firestore().collection('QUIZS').doc().set({
                ANSWER: this.state.ANSWER,
                QUIZ: this.state.QUIZ,
                QUIZPIC: this.state.QUIZPIC,
                OPTIONS: [this.state.opt1, this.state.opt2, this.state.opt3, this.state.opt4],
                TAG: this.state.TAG,
                rightCounter: 0,
                wrongCounter: 0,
            })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        } else {
            fire.firestore().collection('QUIZS').doc().set({
                ANSWER: this.state.ANSWER,
                QUIZ: this.state.QUIZ,
                OPTIONS: [this.state.opt1, this.state.opt2, this.state.opt3, this.state.opt4],
                TAG: this.state.TAG,
                rightCounter: 0,
                wrongCounter: 0,
            })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }
    }
    render() {
        let board;
        if (this.state.review === false) {
            board =
                <React.Fragment>
                    <div>
                        <div className={this.state.className2} onClick={this.hideGuide}></div>
                        <div className={this.state.className1}>
                            <ul>本站須知：
                                 <li>請選擇您想提供的題型，若您選擇的是圖片題，請確認是否侵害該圖片擁有者的智慧財產權，小編跟您都禁不起被吉的風險。</li>
                                <li>基於這是個共享的平台，禁止過度幻想文。EX:以下哪一張圖是我老公Jimin的腹肌。是會激起公憤的請注意。</li>
                                <li>我們都知道愛到深處自然黑，但嚴禁使用過黑及有可能危及成員形象的黑圖。</li>
                                <li>以上，希望大家都能喜歡這個網站，願搶票順利人品爆發。</li>
                            </ul>
                        </div>
                    </div>
                    <Description showGuide={this.showGuide} />
                    <div className="right">
                        <NewQuiz handleChange={this.handleChange} updateInput={this.updateInput} sendQuiz={this.sendQuiz} statusChange={this.statusChange} ANSWER={this.state.ANSWER} QUIZ={this.state.QUIZ}
                            OPTIONS={this.state.OPTIONS} QUIZPIC={this.state.QUIZPIC} TAG={this.state.TAG} />
                    </div>
                </React.Fragment>
        } else {
            board = <ReviewQuiz QUIZ={this.state.QUIZ} OPTIONS={this.state.OPTIONS} QUIZPIC={this.state.QUIZPIC} TAG={this.state.TAG} statusChange={this.statusChange}/>
        }
        return (
            <div className="container">
                {board}
            </div>
        )
    }
}
export default Addquiz;
