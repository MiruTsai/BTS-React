import '../../css/addquiz.css';
import React from 'react';

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

class NewQuiz extends React.Component{
    state = {
        ANSWER: "",
        QUIZ: "",
        OPTIONS: "",
        TAG: "",
        author: "",
        rightCounter: 0,
        wrongCounter: 0,
    }
    sendQuiz = () => {
        this.setState({
            ANSWER: this.ANSWER,
            QUIZ: this.QUIZ,
            OPTIONS: [this.opt1, this.opt2, this.opt3, this.opt4],
            TAG: this.TAG,
            author: "",
            rightCounter: 0,
            wrongCounter: 0,
        })
    }
    render(){
    return (
        <form>
            <div className="quizSelect">
                <div className="text">題型</div>
                <select id="quizType" value={this.TAG}>
                    <option value="text">文字型</option>
                    <option value="picture">圖片型-1</option>
                    <option value="picture2">圖片型-2</option>
                </select>
            </div>
            <div className="choice">
                <div className="text">題目</div>
                <input type="text" name="quiz" id="quizTitle" value={this.QUIZ} />
            </div>
            <div className="choice">
                <div className="text">選擇 1</div>
                <input type="text" name="quiz" id="opt1" value={this.opt1} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " />
                <div className="text">選擇 2</div>
                <input type="text" name="quiz" id="opt2" value={this.opt2} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " />
                <div className="text">選擇 3</div>
                <input type="text" name="quiz" id="opt3" value={this.opt3} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " />
                <div className="text">選擇 4</div>
                <input type="text" name="quiz" id="opt4" value={this.opt4} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " />
            </div>
            <div className="choice answer_zone">
                <div className="text">答案</div>
                <input type="text" name="quiz" id="answer" value={this.ANSWER} placeholder="請輸入半形數字，勿輸入中文、英文或其他特殊字" />
                <div className="buttonBlock">
                    <button type="button" className="quizButton hvr-grow">提交</button>
                    <button type="button" className="quizButton hvr-grow">預覽</button>
                </div>
            </div>
        </form>
    )}
}

class Addquiz extends React.Component {
    state = {
        className1: "textZone",
        className2: "maskHide"
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
    sendQuiz = () => {
        this.setState({
            ANSWER: this.ANSWER,
            QUIZ: this.QUIZ,
            OPTIONS: [this.opt1, this.opt2, this.opt3, this.opt4],
            TAG: this.TAG,
            author: "",
            rightCounter: 0,
            wrongCounter: 0,
        })
    }
    render() {
        return (
            <div className="container">
                <div >
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
                <NewQuiz />
                    {/* <form>
                        <div className="quizSelect">
                            <div className="text">題型</div>
                            <select id="quizType" value={this.TAG}>
                                <option value="text">文字型</option>
                                <option value="picture">圖片型-1</option>
                                <option value="picture2">圖片型-2</option>
                            </select>
                        </div>
                        <div className="choice">
                            <div className="text">題目</div>
                            <input type="text" name="quiz" id="quizTitle" value={this.QUIZ}/>
                        </div>
                        <div className="choice">
                            <div className="text">選擇 1</div>
                            <input type="text" name="quiz" id="opt1" value={this.opt1} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " />
                            <div className="text">選擇 2</div>
                            <input type="text" name="quiz" id="opt2" value={this.opt2} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " />
                            <div className="text">選擇 3</div>
                            <input type="text" name="quiz" id="opt3" value={this.opt3} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " />
                            <div className="text">選擇 4</div>
                            <input type="text" name="quiz" id="opt4" value={this.opt4} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " />
                        </div>
                        <div className="choice answer_zone">
                            <div className="text">答案</div>
                            <input type="text" name="quiz" id="answer" value={this.ANSWER} placeholder="請輸入半形數字，勿輸入中文、英文或其他特殊字" />
                            <div className="buttonBlock">
                                <button type="button" className="quizButton hvr-grow">提交</button>
                                <button type="button" className="quizButton hvr-grow">預覽</button>
                            </div>
                        </div>
                    </form> */}
                </div>
            </div>
        )
    }
}
export default Addquiz;
