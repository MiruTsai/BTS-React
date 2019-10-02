import "../../css/addquiz.css";
import React from "react";
import fire from "../fire"
import PreviewQuiz from "./previewQuiz";
import Logo from "./logo";
import Response from "./response"

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
                    <input type="text" name="OPT1" id="OPT1" value={this.props.OPT1} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={this.props.updateInput} />
                    <div className="text">選擇 2</div>
                    <input type="text" name="OPT2" id="OPT2" value={this.props.OPT2} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={this.props.updateInput} />
                    <div className="text">選擇 3</div>
                    <input type="text" name="OPT3" id="OPT3" value={this.props.OPT3} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={this.props.updateInput} />
                    <div className="text">選擇 4</div>
                    <input type="text" name="OPT4" id="OPT4" value={this.props.OPT4} placeholder="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) " onChange={this.props.updateInput} />
                </div>
                <div className="choice answer_zone">
                    <div className="text">答案</div>
                    <input type="text" name="ANSWER" id="answer" value={this.props.ANSWER} placeholder="請輸入半形數字，勿輸入中文、英文或其他特殊字" onChange={this.props.updateInput} />
                </div>
                <div className="buttonBlock">
                    <button type="button" className="addquiz-button" onClick={this.props.sendQuiz}>提交</button>
                    <button type="button" className="preview-button" onClick={this.props.statusChange}>預覽</button>
                </div>
            </form>
        )
    }
}

class Addquiz extends React.Component {
    state = {
        className1: "textZone",
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
        alertBlock: "hideAlertBlock",
        blurLayer: "hideblurLayer"
    }
    showGuide = () => {
        this.setState({
            className1: "textZoneVisible"
        })
    }
    hideGuide = () => {
        this.setState({
            className1: "textZone",
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
            OPTIONS: [this.state.OPT1, this.state.OPT2, this.state.OPT3, this.state.OPT4],
            review: !this.state.review,
            containerClass: "preAddContainer"
        })
    }
    backStatus = () => {
        this.setState({
            review: !this.state.review,
            containerClass: "addContainer"
        })
    }
    sendQuiz = () => {
        if (this.state.ANSWER === "" || this.state.QUIZ === "" || this.state.OPT1 === "" || this.state.OPT2 === "" || this.state.OPT3 === "" || this.state.OPT4 === "") {
            this.setState({
                alertMessage: "請填入完整題目訊息",
                alertBlock: "alertBlock",
                blurLayer: "alertBlurlayer"
            });
            return;
        }
        if (this.state.TAG === "picture2") {
            fire.firestore().collection("QUIZS").doc().set({
                ANSWER: this.state.ANSWER,
                QUIZ: this.state.QUIZ,
                QUIZPIC: this.state.QUIZPIC,
                OPTIONS: [this.state.OPT1, this.state.OPT2, this.state.OPT3, this.state.OPT4],
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
                OPT4: "",
            });
        } else {
            fire.firestore().collection("QUIZS").doc().set({
                ANSWER: this.state.ANSWER,
                QUIZ: this.state.QUIZ,
                OPTIONS: [this.state.OPT1, this.state.OPT2, this.state.OPT3, this.state.OPT4],
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
                OPT4: "",
            });
        }
    }
    closeBoard = () => {
        this.setState({
            alertMessage: "",
            alertBlock: "hideAlertBlock",
            blurLayer: "hideBlurLayer"
        })
    }
    render() {
        let board;
        if (this.state.review === false) {
            board =
                <React.Fragment>
                    <div className={this.state.className1} onClick={this.hideGuide}>
                        <ul>本站須知：
                                 <li>請選擇您想提供的題型，若您選擇的是圖片題，請確認是否侵害該圖片擁有者的智慧財產權，小編跟您都禁不起被吉的風險。</li>
                            <li>基於這是個共享的平台，禁止過度幻想文。EX:以下哪一張圖是<span className="notice">我老公Jimin的腹肌</span>。是會激起公憤的請注意。</li>
                            <li>我們都知道愛到深處自然黑，但嚴禁使用過黑及有可能危及成員形象的黑圖。</li>
                            <li>以上，希望大家都能喜歡這個網站，願搶票順利人品爆發。</li>
                        </ul>
                    </div>
                    <Description showGuide={this.showGuide} />
                    <div className="add-rightSide">
                        <NewQuiz handleChange={this.handleChange} updateInput={this.updateInput} sendQuiz={this.sendQuiz} statusChange={this.statusChange} ANSWER={this.state.ANSWER} QUIZ={this.state.QUIZ}
                            OPTIONS={this.state.OPTIONS} QUIZPIC={this.state.QUIZPIC} TAG={this.state.TAG} OPT1={this.state.OPT1} OPT2={this.state.OPT2} OPT3={this.state.OPT3} OPT4={this.state.OPT4} />
                    </div>
                </React.Fragment>
        } else {
            board = <PreviewQuiz QUIZ={this.state.QUIZ} OPTIONS={this.state.OPTIONS} OPT1={this.state.OPT1} OPT2={this.state.OPT2} OPT3={this.state.OPT3} OPT4={this.state.OPT4} QUIZPIC={this.state.QUIZPIC} TAG={this.state.TAG} backStatus={this.backStatus} />
        }
        return (
            <React.Fragment>
                <Response alertMessage={this.state.alertMessage} alertBlock={this.state.alertBlock} blurLayer={this.state.blurLayer} closeAlert={this.closeBoard} />
                <Logo />
                <div className={this.state.containerClass}>
                    {board}
                </div>
            </React.Fragment>
        )
    }
}
export default Addquiz;
