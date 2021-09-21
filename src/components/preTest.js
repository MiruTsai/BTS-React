import React, { useState, useEffect, useContext } from 'react'
import '../../css/preTest.css'
import GetTicketGuide from './GetTicketGuide'
import TextType from './QuizType/TextType'
import PictureType from './QuizType/PictureType'
import PictureType2 from './QuizType/PictureType2'
import QuizAnime from './QuizAnime'
import { GroupContext } from '../contexts/GroupContext'

const PreTest = (props) => {
    const { quizs, groupName } = useContext(GroupContext)
    const [seconds, setSeconds] = useState(0)    
    const [status, setStatus] = useState('guide')
    const [showLoading, setShowLoading] = useState(false)
    const [quizIndex, setQuizIndex] = useState(0)
    const [success, setSuccess] = useState('')
    const [response, setResponse] = useState('')
    const [resPic, setResPic] = useState({
        success: '../../img/concert2S.jpg',
        fail: '../../img/fail.gif'
    })
    const [sounds, setSounds] = useState({
        get: new Audio('../../source/get.mp3'),
        fail: new Audio('../../source/fail.mp3')
    })
    const [answer, setAnswer] = useState('')

    const setKeyCode = (event) =>{
        if (event.keyCode === 13 || event.keyCode === 108) {
            checkAnswer()
            setAnswer('')
        }
    }
    useEffect(() => {
        let randomIndex = Math.floor(Math.random() * quizs.length)
        setQuizIndex(randomIndex)
        window.addEventListener('keydown', setKeyCode)
        let countDown = setInterval(() => {            
                setSeconds(prev => prev + 1)
            }, 1000)
        return () => {
            window.removeEventListener('keydown', setKeyCode)
            clearInterval(countDown)            
        }
    }, [])
        
    const closeGuide = () => {
        setStatus('timer')
        setTimeout(() => {
            setStatus('test')
        }, 5000)
    }
    const backToIndex = () => {
        props.history.push('/')
    }
    const oneMoreTime = () => {
        setStatus('timer')
        setTimeout(() => {
            setStatus('test')
        }, 5000)
    }
    const checkAnswer = () => {
        let randomTime = Math.floor(Math.random() * 10000)
        setShowLoading(true)
        setStatus('')
        if (answer === quizs[quizIndex].ANSWER) {
            if (seconds < 10) {                
                setTimeout(() => {
                    setShowLoading(false)
                    setStatus('response')
                    setSuccess(true)
                    setResponse('')
                    sounds.get.play()
                    setTimeout(() => {
                        props.history.push('/')
                    }, 7000)
                }, randomTime)
            } else {
                setTimeout(() => {
                    setShowLoading(false)
                    setStatus('response')
                    setSuccess(false)
                    setResponse('手腳太慢被搶光了...')
                    sounds.fail.play()
                    setTimeout(() => {
                        setStatus('alert')
                    }, 7000)
                }, randomTime)
            }
        } else {
            setTimeout(() => {
                setShowLoading(false)
                setStatus('response')
                setSuccess(false)                
                setResponse('答案錯囉...')                
                sounds.fail.play()
                setTimeout(() => {
                    setStatus('alert')
                }, 7000)
            }, randomTime)
            setSeconds(0)
        }        
        setAnswer('')
    }
    return (
        <>                
            <GetTicketGuide showGuide={status === 'guide'} setShowGuide={closeGuide} />
            <div className={status === 'alert' ? 'alertBlock' : 'hide'}>
                <div className='boardTitle'>{groupName}-TMI</div>
                <div className='pre-alertBoard'>
                    <button type='button' className='preRes-button' onClick={oneMoreTime}>再玩一次</button>
                    <button type='button' className='preRes-button' onClick={backToIndex}>回首頁</button>
                </div>
            </div>
            <QuizAnime animeClass={showLoading ? 'anime' : 'hide'} />
            <div className={status === 'response' ? 'preTestMask' : 'hide'}>
                <img src={success ? resPic.success : resPic.fail} className={success ? 'preResPic' : 'wrongRespic'} />
                <div className='response'>{response}</div>
            </div>
            <div className={status === 'timer' ? 'timer' : 'hide'}>11:59</div>
            <div className={status === 'test' ? 'preContainer container' : 'hide'}>
                <div className='top'>
                    <div className='quizBlock'>
                        {quizs[quizIndex].TAG === 'text' ? (<TextType quizs={quizs} index={quizIndex} />) :
                            (quizs[quizIndex].TAG === 'picture' ? (<PictureType quizs={quizs} index={quizIndex} />) :
                                <PictureType2 quizs={quizs} index={quizIndex} />)}
                    </div>
                    <div className='answerBlock'>
                        <div className='note'>請在答案框輸入答案<br /> <span className='quiz-subtext'>* 僅限半形數字，請勿填寫中文</span></div>
                        <input type='text' name='ANSWER' className='quiz-answer' value={answer} onChange={(e) =>setAnswer(e.target.value)} />
                        <button type='button' className='quiz-button' onClick={checkAnswer}>確定</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PreTest