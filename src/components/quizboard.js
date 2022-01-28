import React, { useContext, useEffect, useState } from 'react'
import '../../css/quiz.css'
import QuizAnime from './QuizAnime'
import SideBar  from './SideBar'
import Scalper from './Scalper'
import TextType from './QuizType/TextType'
import PictureType from './QuizType/PictureType'
import PictureType2 from './QuizType/PictureType2'
import ResBoard from './ResBoard'
import ConfirmBoard from './ConfirmBoard'
import { GroupContext } from '../contexts/GroupContext'
import { FireContext } from '../contexts/FireContext'
import { UserAuthContext } from '../contexts/UserAuthContext'

const QuizBoard = (props) => {
    const { quizs, groupName, filterQuizs } = useContext(GroupContext)
    const { userData, updateUserData } = useContext(UserAuthContext)
    const { getUserInfo, updateQuizCounter, updateUserCounter } = useContext(FireContext)
    const [rightCounter, setRightCounter] = useState(0)
    const [wrongCounter, setWrongCounter] = useState(0)
    const [loading, setLoading] = useState(true)
    const [sound, setSound] = useState({
        wrong: new Audio('../../source/wrong.mp3'),
        right: new Audio('../../source/right.mp3'),
        error: new Audio('../../source/error.mp3')
    })
    const [status, setStatus] = useState('right')
    const [response, setResponse] = useState('')
    const [showRes, setShowRes] = useState(false)
    const [scalper, setScalper] = useState(false)
    const [quizIndex, setQuizIndex] = useState(0)
    const [answer, setAnswer] = useState('')
    const [route, setRoute] = useState('')
    const closeRes = () => {
        if (quizs.length === 0) {
            props.history.push('/profile')
        } else {
            setShowRes(false)
        }
    }
    useEffect(() => {
        getUserInfo(userData.uid, updateUserData)        
        window.setTimeout(() => { setLoading(false) }, 4000)
    }, [])
    useEffect(() => {
        let qid = Math.floor(Math.random() * quizs.length)
        setQuizIndex(qid)
    }, [quizs.length])
    useEffect(()=> {
        return (()=>{
            updateUserCounter(rightCounter, wrongCounter)
        })        
    }, [rightCounter, wrongCounter])
    const checkAnswer = () => {
        let quizRightCounter = quizs[quizIndex].rightCounter
        let quizWrongCounter = quizs[quizIndex].wrongCounter
        if (!answer) {
            alert('請輸入答案')
            return
        } else if (answer === quizs[quizIndex].ANSWER) {
            updateQuizCounter(quizs[quizIndex].id, 'rightCounter', (quizRightCounter + 1))            
            let reply = ''
            if (quizRightCounter + quizWrongCounter === 0) {
                reply = '恭喜你是第一個答對的人！！'
            } else {
                reply = '只有 ' + Math.floor(quizRightCounter / (quizRightCounter + quizWrongCounter) * 100) + '% 的人答對呢！'
            }
            let str = '答對了！' + reply
            setResponse(str)
            setShowRes(true)
            setStatus('right')
            setRightCounter(prevRightCounter => prevRightCounter + 1)
            filterQuizs(quizIndex)
            sound.right.play()            
        } else {
            updateQuizCounter(quizs[quizIndex].id, 'wrongCounter', (quizWrongCounter + 1))            
            let reply = ''
            if (quizRightCounter + quizWrongCounter === 0) {
                reply = '你是第一個答錯的人 T T'
            } else {
                reply = '沒關係有 ' +
                    Math.floor(quizWrongCounter / (quizRightCounter + quizWrongCounter) * 100) + '% 的人沒答對。'
            }
            if (wrongCounter > 4) {
                setScalper(true)
                sound.error.play()
                setTimeout(() => { props.history.push('/') }, 6000)
            } else {
                let str = '答案是 ' + quizs[quizIndex].ANSWER + '。' + reply
                setResponse(str)
                setShowRes(true)
                setStatus('wrong')
                setWrongCounter(prevWrongCounter => prevWrongCounter + 1)
                filterQuizs(quizIndex)
                sound.wrong.play()
            }            
        }
        setAnswer('')
    }
    const entrySwitch = (entryPoint) => {
        switch (entryPoint) {
            case 'profile':
                props.history.push('/profile')
                break
            case 'album':
                props.history.push('/album')
                break
            case 'addQuiz':
                props.history.push('/addQuiz')
                break
            case 'preTest':
                props.history.push('/preTest')
                break
        }
    }
    return (
        <>
            <ResBoard show={showRes} res={response} status={status} closeRes={closeRes} />
            <div className={showRes ? 'blurLayer' : 'hide'}>
            </div>
            <Scalper fake={scalper} />
            <QuizAnime animeClass={loading ? 'anime' : 'hide'} />
            <SideBar {...props} setRoute={setRoute} loading={loading} />
            <ConfirmBoard entrySwitch={entrySwitch} route={route} />
            <div className={loading || scalper || showRes ? 'hide' : 'quizContainer container'}>
                <div className='top'>
                    <div className='quizBlock'>
                        {(quizs.length === 0) ? (null) : (<>{quizs[quizIndex].TAG === 'text' ? (<TextType quizs={quizs} index={quizIndex} />) :
                            (quizs[quizIndex].TAG === 'picture' ? (<PictureType quizs={quizs} index={quizIndex} />) : (<PictureType2 quizs={quizs} index={quizIndex} />))}</>)}
                    </div>
                    <div className='answerBlock'>
                        <div className='note'>請在答案框輸入答案<br /> <span className='quiz-subtext'>* 僅限半形數字，請勿填寫中文</span></div>
                        <input type='text' className='quiz-answer' value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        <button type='button' className='quiz-button' onClick={checkAnswer}>確定</button>
                    </div>
                </div>
                <div className='counter'>
                    <div className='all'>還剩：{quizs.length}</div>
                    <div className='right'>答對：{rightCounter}</div>
                    <div className='wrong'>答錯：{wrongCounter}</div>
                </div>
            </div>
        </>
    )
}

export default QuizBoard