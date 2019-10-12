import React from "react";

const PictureType = (props) => {
    const picOption = props.quizs[props.index].OPTIONS.map((option, num) => {
        return (
            <div className="picOption" key={Math.random()}> ( {num + 1} )
             <img className="picSource" src={option} />
            </div>
        )
    })
    return (
        <React.Fragment>
            <div className="quiz">{props.quizs[props.index].QUIZ}</div>
            <div className="options">
                {picOption}
            </div>
        </React.Fragment>
    )
}

export default PictureType;