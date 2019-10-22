import "../../css/addquiz.css";
import React from "react";
import fire from "../Fire"
import PreviewQuiz from "./PreviewQuiz";
import Logo from "./Logo";
import Response from "./Response"

const Description = (props) => {
    return (<div className="description">
        <div className="addpic">
            <img className="group-pic" src="img/group2.png" />
        </div>
        <div className="info">
            <p>親愛的 ARMY，<br />在您貢獻題目前請先閱讀本站須知。</p>
            <button id="guide" className="addquiz-button" onClick={props.showGuide}>本站須知</button>
        </div>
    </div>)
}

class NewQuiz extends React.Component {
    render () {
        let quizTitle;
        const { TAG, QUIZ, OPT1, OPT2, OPT3, OPT4, ANSWER, QUIZPIC, updateInput, handleChange, sendQuiz, statusChange } = this.props;
        if (TAG === "picture2") {
            quizTitle =
                <div className="choice">
                    <div className="add_text">題目</div>
                    <input type="text" name="QUIZ" id="quizTitle" value={QUIZ} onChange={updateInput} />
                    <div className="add_text">圖片網址</div>
                    <input type="text" name="QUIZPIC" id="quizTitle" value={QUIZPIC} onChange={updateInput} />
                </div>
        } else {
            quizTitle =
                <div className="choice">
                    <div className="opt-name">題目</div>
                    <input type="text" name="QUIZ" id="quizTitle" value={QUIZ} onChange={updateInput} />
                </div>
        }
        return (
            <form>
                <div className="quizSelect">
                    <div className="opt-name">題型</div>
                    <select id="quizType" name="TAG" value={TAG} onChange={handleChange}>
                        <option value="text">文字型</option>
                        <option value="picture">圖片型-1</option>
                        <option value="picture2">圖片型-2</option>
                    </select>
                </div>
                {quizTitle}
                <div className="choice">
                    <div className="opt-name">選擇 1</div>
                    <input type="text" name="OPT1" id="OPT1" value={OPT1} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={updateInput} />
                    <div className="opt-name">選擇 2</div>
                    <input type="text" name="OPT2" id="OPT2" value={OPT2} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={updateInput} />
                    <div className="opt-name">選擇 3</div>
                    <input type="text" name="OPT3" id="OPT3" value={OPT3} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={updateInput} />
                    <div className="opt-name">選擇 4</div>
                    <input type="text" name="OPT4" id="OPT4" value={OPT4} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={updateInput} />
                </div>
                <div className="choice answer_zone">
                    <div className="opt-name">答案</div>
                    <input type="text" name="ANSWER" id="answer" value={ANSWER} placeholder="請輸入半形數字，勿輸入中文、英文或其他特殊字" onChange={updateInput} />
                </div>
                <div className="buttonBlock">
                    <button type="button" className="addquiz-button" onClick={sendQuiz}>提交</button>
                    <button type="button" className="preview-button" onClick={statusChange}>預覽</button>
                </div>
            </form>
        )
    }
}
class Addquiz extends React.Component {
    state = {
        textClass: "hide",
        containerClass: "addContainer",
        ANSWER: "",
        QUIZ: "",
        OPTIONS: [],
        OPT1: "",
        OPT2: "",
        OPT3: "",
        OPT4: "",
        QUIZPIC: "",
        TAG: "text",
        rightCounter: 0,
        wrongCounter: 0,
        review: false,
        alertMessage: "",
        alertBlock: "hide",
        blurLayer: "hide"
    }

    showGuide = () => {
        this.setState({
            textClass: "textZoneVisible"
        })
    }
    hideGuide = () => {
        this.setState({
            textClass: "hide"
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
        const { OPT1, OPT2, OPT3, OPT4, review } = this.state;
        this.setState({
            OPTIONS: [OPT1, OPT2, OPT3, OPT4],
            review: !review,
            containerClass: "preAddContainer"
        })
    }
    backStatus = () => {
        const { review } = this.state;
        this.setState({
            review: !review,
            containerClass: "addContainer"
        })
    }
    sendQuiz = () => {
        const { OPT1, OPT2, OPT3, OPT4, ANSWER, QUIZ, QUIZPIC, TAG } = this.state;
        if (ANSWER === "" || QUIZ === "" || OPT1 === "" || OPT2 === "" || OPT3 === "" || OPT4 === "") {
            this.setState({
                alertMessage: "請填入完整題目訊息",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer"
            });
            return;
        }
        if (TAG === "picture2") {
            fire.firestore().collection("QUIZS").doc().set({
                ANSWER: ANSWER,
                QUIZ: QUIZ,
                QUIZPIC: QUIZPIC,
                OPTIONS: [OPT1, OPT2, OPT3, OPT4],
                TAG: TAG,
                rightCounter: 0,
                wrongCounter: 0
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
            this.setState({
                alertMessage: "感謝您的提供，祝您搶票順利，人品大爆發！",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer",
                ANSWER: "",
                QUIZ: "",
                OPTIONS: [],
                OPT1: "",
                OPT2: "",
                OPT3: "",
                OPT4: ""
            });
        } else {
            fire.firestore().collection("QUIZS").doc().set({
                ANSWER: ANSWER,
                QUIZ: QUIZ,
                OPTIONS: [OPT1, OPT2, OPT3, OPT4],
                TAG: TAG,
                rightCounter: 0,
                wrongCounter: 0
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
            this.setState({
                alertMessage: "感謝您的提供，祝您搶票順利，人品大爆發！",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer",
                ANSWER: "",
                QUIZ: "",
                OPTIONS: [],
                OPT1: "",
                OPT2: "",
                OPT3: "",
                OPT4: ""
            });
        }
    }
    closeBoard = () => {
        this.setState({
            alertMessage: "",
            alertBlock: "hide",
            blurLayer: "hide"
        })
    }
    render () {
        const { review, ANSWER, QUIZ, QUIZPIC, textClass, OPTIONS, OPT1, OPT2, OPT3, OPT4, TAG, alertMessage, alertBlock, blurLayer, containerClass } = this.state;
        return (
            <>
                <Response alertMessage={alertMessage} alertBlock={alertBlock} blurLayer={blurLayer} closeAlert={this.closeBoard} />
                <Logo />
                <div className={containerClass}>
                    {review ? (<PreviewQuiz QUIZ={QUIZ} OPTIONS={OPTIONS} OPT1={OPT1} OPT2={OPT2} OPT3={OPT3} OPT4={OPT4} QUIZPIC={QUIZPIC} 
            TAG={TAG} backStatus={this.backStatus} />):
                   (<>
                    <div className={textClass} onClick={this.hideGuide}>
                        <ul>本站須知：
                            <li>請選擇您想提供的題型，若您選擇的是圖片題，請確認是否侵害該圖片擁有者的智慧財產權，小編跟您都禁不起被吉的風險。</li>
                            <li>基於這是個共享的平台，禁止過度幻想文。EX:以下哪一張圖是<span className="notice">我老公Jimin的腹肌</span>。是會激起公憤的請注意。</li>
                            <li>我們都知道愛到深處自然黑，但嚴禁使用過黑及有可能危及成員形象的黑圖。</li>
                            <li>以上，希望大家都能喜歡這個網站，願搶票順利人品爆發。</li>
                        </ul>
                    </div>
                    <Description showGuide={this.showGuide} />
                    <div className="add-rightSide">
                        <NewQuiz handleChange={this.handleChange} updateInput={this.updateInput} sendQuiz={this.sendQuiz} statusChange={this.statusChange} ANSWER={ANSWER} QUIZ={QUIZ}
                            OPTIONS={OPTIONS} QUIZPIC={QUIZPIC} TAG={TAG} OPT1={OPT1} OPT2={OPT2} OPT3={OPT3} OPT4={OPT4} />
                    </div>
                </>)}
                </div>
            </ >
        )
    }
}
export default Addquiz;
