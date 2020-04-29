import React from "react"

const PictureType = (props) => {
    return <>
        <div className="quiz">{props.quizs[props.index].QUIZ}</div>
        <div className="options">
            {props.quizs[props.index].OPTIONS.map((option, num) => {
                return (
                    <div className="picOption" key={Math.random()}> ( {num + 1} )
                        <img className="picSource" src={option} />
                    </div>
                )
            })}
        </div>
    </>
}

export default PictureType