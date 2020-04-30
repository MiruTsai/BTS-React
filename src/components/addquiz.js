import "../../css/addquiz.css"
import React from "react"
import fire from "../Fire"
import PreviewQuiz from "./PreviewQuiz"
import Logo from "./Logo"
import Response from "./Response"
import Groups from "./Groups"

const Description = (props) => {
    let groupName = ""
    props.Group === "IZ*ONE" ? groupName = "IZONE" : groupName = props.Group
    return (<div className="description">
        <div className="addpic">
            <img className="group-pic" src={"img/group2/" + groupName + ".png"} />
        </div>
        <div className="info">
            <p>親愛的，<br />在您貢獻題目前請先閱讀本站須知。</p>
            <button id="guide" className="addquiz-button" onClick={props.showGuide}>本站須知</button>
        </div>
    </div>)
}

class NewQuiz extends React.Component {
    render () {
        let quizTitle
        const { TAG, QUIZ, OPT1, OPT2, OPT3, OPT4, ANSWER, QUIZPIC, updateInput, handleChange, sendQuiz, statusChange, chooseGroup, Group } = this.props
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
                    <div className="opt">
                        <div className="opt-name">題目</div>
                        <input type="text" name="QUIZ" id="quizTitle" value={QUIZ} onChange={updateInput} />
                    </div>
                </div>
        }
        return (
            <>
                <Groups chooseGroup={chooseGroup} Group={Group} />
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
                    <div className="opt">
                        <div className="desc">選項</div><i className="far fa-question-circle" data-descr="請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) "></i>
                    </div>
                    <div className="opt">
                        <div className="opt-name">1.</div>
                        <input type="text" name="OPT1" id="OPT1" value={OPT1} onChange={updateInput} />
                    </div>
                    <div className="opt">
                        <div className="opt-name">2.</div>
                        <input type="text" name="OPT2" id="OPT2" value={OPT2} onChange={updateInput} />
                    </div>
                    <div className="opt">
                        <div className="opt-name">3.</div>
                        <input type="text" name="OPT3" id="OPT3" value={OPT3} onChange={updateInput} />
                    </div>
                    <div className="opt">
                        <div className="opt-name">4.</div>
                        <input type="text" name="OPT4" id="OPT4" value={OPT4} onChange={updateInput} />
                    </div>
                </div>
                <div className="choice answer_zone">
                    <div className="opt">
                        <div className="opt-name">答案</div>
                        <input type="text" name="ANSWER" id="answer" value={ANSWER} placeholder="請輸入半形數字，勿輸入中文、英文或其他特殊字" onChange={updateInput} />
                    </div>
                </div>
                <div className="buttonBlock">
                    <button type="button" className="addquiz-button" onClick={sendQuiz}>提交</button>
                    <button type="button" className="preview-button" onClick={statusChange}>預覽</button>
                </div>
            </>
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
        alertBlock: false
    }
    groupMember = []
    currentQuizs = []

    componentDidMount = () => {
        fire.firestore().collection("GROUPMEMBER").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.groupMember.push(doc.data())
                })
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error)
            })
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
        })
    }
    handleChange = (e) => {
        this.setState({ TAG: e.target.value })
    }
    statusChange = () => {
        const { OPT1, OPT2, OPT3, OPT4, review } = this.state
        this.setState({
            OPTIONS: [OPT1, OPT2, OPT3, OPT4],
            review: !review,
            containerClass: "preAddContainer"
        })
    }
    backStatus = () => {
        const { review } = this.state
        this.setState({
            review: !review,
            containerClass: "addContainer"
        })
    }
    addPopularity = (QUIZ, correct) => {
        const { Group } = this.props
        let groupName = ""
        Group === "IZ*ONE" ? groupName = "IZONE" : groupName = Group
        QUIZ = QUIZ.toUpperCase()
        correct = correct.toUpperCase()
        this.currentGuoupMembers = []
        this.groupMember.forEach(member => {
            if (member.GROUP === groupName) {
                this.currentGuoupMembers.push(member)
            }
        })
        for (let i = 0; i < this.currentGuoupMembers.length; i++) {
            for (let j = 0; j < this.currentGuoupMembers[i].NICKNAME.length; j++) {
                if (QUIZ.indexOf(this.currentGuoupMembers[i].NICKNAME[j]) > -1) {
                    this.currentGuoupMembers[i].POPULARITY += 1
                    fire.firestore().collection("GROUPMEMBER").doc(this.currentGuoupMembers[i].NICKNAME[1]).update({
                        POPULARITY: this.currentGuoupMembers[i].POPULARITY
                    })
                }
                if (correct.indexOf(this.currentGuoupMembers[i].NICKNAME[j]) > -1) {
                    this.currentGuoupMembers[i].POPULARITY += 1
                    fire.firestore().collection("GROUPMEMBER").doc(this.currentGuoupMembers[i].NICKNAME[1]).update({
                        POPULARITY: this.currentGuoupMembers[i].POPULARITY
                    })
                }
            }
        }
    }
    sendQuiz = () => {
        const { OPT1, OPT2, OPT3, OPT4, ANSWER, QUIZ, QUIZPIC, TAG } = this.state
        const { Group, userName } = this.props
        let groupName = ""
        Group === "IZ*ONE" ? groupName = "IZONE" : groupName = Group
        let OPT = [OPT1, OPT2, OPT3, OPT4]
        if (this.checkDuplicateQuiz()) {
            this.setState({
                alertMessage: "題目重複囉！",
                alertBlock: true
            })
            return
        }
        if (this.checkDuplicateAns()) {
            this.setState({
                alertMessage: "答案重複囉！",
                alertBlock: true
            })
            return
        }
        let correct = OPT[parseInt(ANSWER) - 1]
        if (ANSWER === "" || QUIZ === "" || OPT1 === "" || OPT2 === "" || OPT3 === "" || OPT4 === "") {
            this.setState({
                alertMessage: "請填入完整題目訊息",
                alertBlock: true
            })
            return
        }
        if (TAG === "picture2") {
            fire.firestore().collection(groupName + "QUIZS").doc().set({
                ANSWER: ANSWER,
                QUIZ: QUIZ,
                QUIZPIC: QUIZPIC,
                OPTIONS: [OPT1, OPT2, OPT3, OPT4],
                TAG: TAG,
                rightCounter: 0,
                wrongCounter: 0,
                author: userName
            }).catch(function (error) {
                console.error("Error writing document: ", error)
            })
            this.setState({
                alertMessage: "感謝您的提供，祝您搶票順利，人品大爆發！",
                alertBlock: true,
                ANSWER: "",
                QUIZ: "",
                QUIZPIC: "",
                OPTIONS: [],
                OPT1: "",
                OPT2: "",
                OPT3: "",
                OPT4: ""
            })
        } else {
            fire.firestore().collection(groupName + "QUIZS").doc().set({
                ANSWER: ANSWER,
                QUIZ: QUIZ,
                OPTIONS: [OPT1, OPT2, OPT3, OPT4],
                TAG: TAG,
                rightCounter: 0,
                wrongCounter: 0,
                author: userName
            }).catch(function (error) {
                console.error("Error writing document: ", error)
            })
            this.addPopularity(QUIZ, correct)
            this.currentQuizs.push(QUIZ)
            this.setState({
                alertMessage: "感謝您的提供，祝您搶票順利，人品大爆發！",
                alertBlock: true,
                ANSWER: "",
                QUIZ: "",
                OPTIONS: [],
                OPT1: "",
                OPT2: "",
                OPT3: "",
                OPT4: ""
            })
        }
    }

    checkDuplicateAns = (arr) => {
        const { OPT1, OPT2, OPT3, OPT4 } = this.state
        arr = [OPT1, OPT2, OPT3, OPT4]
        return new Set(arr).size !== arr.length
    }
    checkDuplicateQuiz = () => {
        const { quizs } = this.props
        let ifDuplicate = false
        quizs.forEach(q => {
            if (q.QUIZ === this.state.QUIZ) {
                ifDuplicate = true
            }
        })
        this.currentQuizs.forEach(q => {
            if (q === this.state.QUIZ) {
                ifDuplicate = true
            }
        })
        return ifDuplicate
    }
    switch = () => {
        if (this.props.userUid === "") {
            this.props.history.push("/login")
            this.setState({
                alertMessage: "",
                alertBlock: !this.state.alertBlock
            })
        } else {
            this.setState({
                alertMessage: "",
                alertBlock: !this.state.alertBlock
            })
        }
    }
    render () {
        const { chooseGroup, Group } = this.props
        const { review, ANSWER, QUIZ, QUIZPIC, textClass, OPTIONS, OPT1, OPT2, OPT3, OPT4, TAG, alertMessage, alertBlock, containerClass } = this.state
        return (
            <>
                <Response alertMessage={alertMessage} alertBlock={alertBlock} switch={this.switch} Group={Group} />
                <Logo Group={Group} />
                <div className={containerClass}>
                    {review ? (<PreviewQuiz QUIZ={QUIZ} OPTIONS={OPTIONS} OPT1={OPT1} OPT2={OPT2} OPT3={OPT3} OPT4={OPT4} QUIZPIC={QUIZPIC}
                        TAG={TAG} backStatus={this.backStatus} />) :
                        (<>
                            <div className={textClass} onClick={this.hideGuide}>
                                <ul>本站須知：
                            <li>請選擇您想提供的題型，若您選擇的是圖片題，請確認是否侵害該圖片擁有者的智慧財產權，小編跟您都禁不起被吉的風險。</li>
                                    <li>基於這是個共享的平台，禁止過度幻想文。EX:以下哪一張圖是<span className="notice">我老公Jimin的腹肌</span>。是會激起公憤的請注意。</li>
                                    <li>我們都知道愛到深處自然黑，但嚴禁使用過黑及有可能危及成員形象的黑圖。</li>
                                    <li>以上，希望大家都能喜歡這個網站，願搶票順利人品爆發。</li>
                                </ul>
                            </div>
                            <Description showGuide={this.showGuide} Group={Group} />
                            <div className="add-rightSide">
                                <NewQuiz handleChange={this.handleChange} updateInput={this.updateInput} sendQuiz={this.sendQuiz} statusChange={this.statusChange} ANSWER={ANSWER} QUIZ={QUIZ}
                                    OPTIONS={OPTIONS} QUIZPIC={QUIZPIC} TAG={TAG} OPT1={OPT1} OPT2={OPT2} OPT3={OPT3} OPT4={OPT4} chooseGroup={chooseGroup} Group={Group} />
                            </div>
                        </>)}
                </div>
            </ >
        )
    }
}

export default Addquiz
