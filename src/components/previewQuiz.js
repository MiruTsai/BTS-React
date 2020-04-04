import React from "react"

const PreviewQuiz = (props) => {
   
    let preview
    const { OPTIONS, QUIZ, QUIZPIC, TAG } = props
    const previewOptions = OPTIONS.map((option, num) => {
        return (
            <div className="option" key={Math.random()}> ( {num + 1} ) <span className="answerValue"> {option} </span></div>
        )
    })
    const picOption = OPTIONS.map((option, num) => {
        return (
            <div className="picOption" key={Math.random()}> ( {num + 1} )
                <img className="picSource" src={option} />
            </div>
        )
    })
    if (TAG === "text") {
        preview =
            <>
                <div className="quiz">{QUIZ}</div>
                <div className="pre-options">
                    {previewOptions}
                </div>
            </>
    } else if (TAG === "picture") {
        preview =
            <>
                <div className="quiz">{QUIZ}</div>
                <div className="options">
                    {picOption}
                </div>
            </>
    } else {
        preview =
            <>
                <div className="pic_quiz_title">{QUIZ}</div>
                <img src={QUIZPIC} className="pic_quiz_img hvr-grow" />
                <div className="pre-options">
                    {previewOptions}
                </div>
            </>
    }
    return (
        <>
            <button type="button" className="backQuiz-button" onClick={props.backStatus} >返回</button>
            {preview}
        </>
    )
}
export default PreviewQuiz