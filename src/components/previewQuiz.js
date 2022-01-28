import React from 'react'

const PreviewQuiz = (props) => {
   
    let preview
    const { options, quiz, quizPic, tag, setReview } = props
    const previewOptions = options.map((option, num) => {
        return (
            <div className='option' key={Math.random()}> ( {num + 1} ) <span className='answerValue'> {option} </span></div>
        )
    })
    const picOption = options.map((option, num) => {
        return (
            <div className='picOption' key={Math.random()}> ( {num + 1} )
                <img className='picSource' src={option} />
            </div>
        )
    })
    if (tag === 'text') {
        preview =
            <>
                <div className='quiz'>{quiz}</div>
                <div className='pre-options'>
                    {previewOptions}
                </div>
            </>
    } else if (tag === 'picture') {
        preview =
            <>
                <div className='quiz'>{quiz}</div>
                <div className='options'>
                    {picOption}
                </div>
            </>
    } else {
        preview =
            <>
                <div className='pic_quiz_title'>{quiz}</div>
                <img src={quizPic} className='pic_quiz_img hvr-grow' />
                <div className='pre-options'>
                    {previewOptions}
                </div>
            </>
    }
    return (
        <>
            <button type='button' className='backQuiz-button' onClick={()=>setReview(false)} >返回</button>
            {preview}
        </>
    )
}
export default PreviewQuiz