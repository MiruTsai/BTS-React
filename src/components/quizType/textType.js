import React from "react";

const TextType = (props) => {
    const options = props.quizs[props.index].OPTIONS.map((option, num) => {
        return (
            <div className="option" key={Math.random()}><span className="optNum"> ( {num + 1} )</span>
            <span className="answerValue">{option} </span></div>
        )
    })
    return (
        <React.Fragment>
            <div className="quiz">{props.quizs[props.index].QUIZ}</div>
            <div className="options">
                {options}
            </div>
        </React.Fragment>
    )
}

export default TextType;