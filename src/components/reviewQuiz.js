import React, { Component } from 'react';
let num=1;

const ReviewQuiz = (props) => {
    const { OPTIONS, QUIZ, QUIZPIC, TAG } = props
    let preview;
    const options = OPTIONS.map((option, num) => {
        return (
            <div className="option" key={Math.random()}> ( {num + 1} ) {option} </div>
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
                <div className="options">
                    {options}
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
                <div className="options">
                    {options}
                </div>
            </React.Fragment>
    }
    return (
        <React.Fragment>
        {preview}
        <button type="button" onClick={props.statusChange} />
        </React.Fragment>
)}
export default ReviewQuiz