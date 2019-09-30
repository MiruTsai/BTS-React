import React from 'react';
let num=1;
let preview;
const PreviewQuiz = (props) => {
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
            <React.Fragment>
                <div className="quiz">{QUIZ}</div>
                <div className="pre-options">
                    {previewOptions}
                </div>
            </React.Fragment>
    } else if (TAG === "picture") {
        preview =
            <React.Fragment>
                <div className="quiz">{QUIZ}</div>
                <div className="options">
                    {picOption}
                </div>
            </React.Fragment>
    } else {
        preview =
            <React.Fragment>
                <div className="pic_quiz_title">{QUIZ}</div>
                <img src={QUIZPIC} className='pic_quiz_img hvr-grow' />
                <div className="pre-options">
                    {previewOptions}
                </div>
            </React.Fragment>
    }
    return (
        <React.Fragment>
        <button type="button" className="backQuiz-button" onClick={props.backStatus} >返回</button>
        {preview}
        </React.Fragment>
)}
export default PreviewQuiz