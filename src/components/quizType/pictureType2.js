import React from 'react';

const PictureType2 = (props) => {
    return (
        <>
            <div className='quiz'>{props.quizs[props.index].QUIZ}</div>
            <img src={props.quizs[props.index].QUIZPIC} className='pic_quiz_img hvr-grow' />
            <div className='options'>
                {props.quizs[props.index].OPTIONS.map((option, num) => {
                    return (
                        <div className='option' key={Math.random()}>
                            <span className='optNum'> ( {num + 1} )</span>
                            <span className='answerValue'>{option} </span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PictureType2;