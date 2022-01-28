import '../../css/addquiz.css'
import React, { useState, useContext, useEffect } from 'react'
import { GroupContext } from '../contexts/GroupContext'
import { FireContext } from '../contexts/FireContext'
import { AlertContext } from '../contexts/AlertContext'
import fire from '../Fire'
import PreviewQuiz from './PreviewQuiz'
import Groups from './Groups'
import { UserAuthContext } from '../contexts/UserAuthContext'


const Description = (props) => {
    const { groupName } = useContext(GroupContext)
    return (
        <div className='description'>
            <div className='addpic'>
                <img className='group-pic' src={'img/group2/' + groupName + '.png'} />
            </div>
            <div className='info'>
                <p>親愛的，<br />在您貢獻題目前請先閱讀本站須知。</p>
                <button id='guide' className='addquiz-button' onClick={()=>props.setShowGuide(!props.showGuide)}>本站須知</button>
            </div>
        </div>
    )
}

const NewQuiz = (props) => {
    const { quizs, setQuizs, groupName } = useContext(GroupContext)
    const { updateAlertMsg } = useContext(AlertContext)
    const { addQuiz, getGroupMemberPopulation } = useContext(FireContext)
    const { opt1, setOpt1, opt2, setOpt2, opt3, setOpt3, opt4, setOpt4, quizPic, setQuizPic, quiz, setQuiz, answer, setAnswer, tag, setTag, statusChange, resetState } = props
    const [groupMemberPopulation, setGroupMemberPopulation] = useState([])
    const [currentGuoupMembers, setCurrentGuoupMembers] = useState([])
    useEffect(()=> {
        let data = getGroupMemberPopulation()
        setGroupMemberPopulation(data)
        const arr = groupMemberPopulation.filter(elem => elem.GROUP === groupName)
        setCurrentGuoupMembers(arr)
    }, [])
    useEffect(()=> {
        const arr = groupMemberPopulation.filter(elem => elem.GROUP === groupName)
        setCurrentGuoupMembers(arr)
    }, [groupName])
    const checkDuplicateOpt = () => {
        let arr = [opt1, opt2, opt3, opt4]
        return new Set(arr).size !== arr.length
    }
    const checkDuplicateQuiz = () => {
        let ifDuplicate = false
        quizs.forEach(q => {
            if (q.quiz === quiz) {
                ifDuplicate = true
            }
        })
        return ifDuplicate
    }
    const detectXSS = (text) => {
        const xssTag = ['script', 'javascript']
        let result = xssTag.some(elem => text.includes(elem))
        if (result) {
            updateAlertMsg('您上傳的題目含有危險訊息，請重新輸入。')
            return
        }        
    }
    const addPopularity = (quiz, correct) => {
        // 成員英文姓名有可能出現在題目或答案中故都大寫處理好比對
        quiz = quiz.toUpperCase()
        correct = correct.toUpperCase()
     
        for (let i = 0; i < currentGuoupMembers.length; i++) {
            for (let j = 0; j < currentGuoupMembers[i].NICKNAME.length; j++) {
                if (quiz.indexOf(currentGuoupMembers[i].NICKNAME[j]) > -1) {
                    currentGuoupMembers[i].POPULARITY += 1
                    fire.firestore().collection('GROUPMEMBER').doc(currentGuoupMembers[i].id).update({
                        POPULARITY: currentGuoupMembers[i].POPULARITY
                    })
                }
                if (correct.indexOf(currentGuoupMembers[i].NICKNAME[j]) > -1) {
                    currentGuoupMembers[i].POPULARITY += 1
                    fire.firestore().collection('GROUPMEMBER').doc(currentGuoupMembers[i].id).update({
                        POPULARITY: currentGuoupMembers[i].POPULARITY
                    })
                }
            }
        }
    }
    const sendQuiz = () => {        
        let options = [opt1, opt2, opt3, opt4]
        if (checkDuplicateQuiz()) {
            updateAlertMsg('題目重複囉！')
            return
        }
        if (checkDuplicateOpt()) {
            updateAlertMsg('答案重複囉！')
            return
        }
        let correct = options[parseInt(answer) - 1]
        if (answer === '' || quiz === '' || opt1 === '' || opt2 === '' || opt3 === '' || opt4 === '') {
            updateAlertMsg('請填入完整題目訊息')
            return
        }
        if (tag === 'picture2') {
            addQuiz({
                ANSWER: answer,
                QUIZ: quiz,
                QUIZPIC: quizPic,
                OPTIONS: options,
                TAG: tag
            })
        } else {
            addQuiz({
                ANSWER: answer,
                QUIZ: quiz,
                OPTIONS: options,
                TAG: tag
            })
        }
        resetState()
        addPopularity(quiz, correct)
        setQuizs(prev=>{
            return {...prev, ...quiz}
        })
        updateAlertMsg('感謝您的提供，祝您搶票順利，人品大爆發！')
    }
    
    return (
        <>
            <Groups />
            <div className='quizSelect'>
                <div className='opt-name'>題型</div>
                <select id='quizType' name='tag' value={tag} onChange={(e)=>setTag(e.target.value)}>
                    <option value='text'>文字型</option>
                    <option value='picture'>圖片型-1</option>
                    <option value='picture2'>圖片型-2</option>
                </select>
            </div>
            {tag === 'picture2' ? 
            <div className='choice'>
                <div className='add_text'>題目</div>
                <input type='text' name='quiz' id='quizTitle' value={quiz} onChange={(e)=>setQuiz(e.target.value)} />
                <div className='add_text'>圖片網址</div>
                <input type='text' name='quizPic' id='quizTitle' value={quizPic} onChange={(e)=>setQuizPic(e.target.value)} />
            </div>:
            <div className='choice'>
                <div className='opt'>
                    <div className='opt-name'>題目</div>
                    <input type='text' name='quiz' id='quizTitle' value={quiz} onChange={(e)=>setQuiz(e.target.value)} />
                </div>
            </div>}
            <div className='choice'>
                <div className='opt'>
                    <div className='desc'>選項</div><i className='far fa-question-circle' data-descr='請填入選項，如為圖片型-1請填入網址 ( 建議尺寸 200 x 200 以上 ) '></i>
                </div>
                <div className='opt'>
                    <div className='opt-name'>1.</div>
                    <input type='text' value={opt1} onChange={(e)=>setOpt1(e.target.value)} />
                </div>
                <div className='opt'>
                    <div className='opt-name'>2.</div>
                    <input type='text' value={opt2} onChange={(e)=>setOpt2(e.target.value)} />
                </div>
                <div className='opt'>
                    <div className='opt-name'>3.</div>
                    <input type='text' value={opt3} onChange={(e)=>setOpt3(e.target.value)} />
                </div>
                <div className='opt'>
                    <div className='opt-name'>4.</div>
                    <input type='text' value={opt4} onChange={(e)=>setOpt4(e.target.value)} />
                </div>
            </div>
            <div className='choice answer_zone'>
                <div className='opt'>
                    <div className='opt-name'>答案</div>
                    <input type='text' id='answer' value={answer} placeholder='請輸入半形數字，勿輸入中文、英文或其他特殊字' onChange={(e)=>setAnswer(e.target.value)} />
                </div>
            </div>
            <div className='buttonBlock'>
                <button type='button' className='addquiz-button' onClick={sendQuiz}>提交</button>
                <button type='button' className='preview-button' onClick={statusChange}>預覽</button>
            </div>
        </>
    )
}

const AddQuiz = () => {
    const { groupName } = useContext(GroupContext)
    
    const [tag, setTag] = useState('text')
    const [answer, setAnswer] = useState('')    
    const [quizPic, setQuizPic] = useState('')
    const [quiz, setQuiz] = useState('')
    const [opt1, setOpt1] = useState('')
    const [opt2, setOpt2] = useState('')
    const [opt3, setOpt3] = useState('')
    const [opt4, setOpt4] = useState('')
    const [options, setOptions] = useState([])
    
    const [review, setReview] = useState(false)    
    const [showGuide, setShowGuide] = useState(false)    
    const resetState = () => {
        setOpt1('')
        setOpt2('')
        setOpt3('')
        setOpt4('')
        setQuiz('')
        setQuizPic('')
        setAnswer('')
    }
    
    
    const statusChange = () => {
        setOptions([opt1, opt2, opt3, opt4])
        setReview(!review)
    }
    
    return (
        <>                          
            <div className={review ? 'preAddContainer container' : 'addContainer container'}>
                {review ? (<PreviewQuiz quiz={quiz} options={options} quizPic={quizPic}
                    tag={tag} review={review} setReview={setReview} />) :
                    (<>
                        <div className={showGuide ? 'textZoneVisible' : 'hide'} onClick={()=>setShowGuide(!showGuide)}>
                            <ul>本站須知：
                                <li>請選擇您想提供的題型，若您選擇的是圖片題，請確認是否侵害該圖片擁有者的智慧財產權，小編跟您都禁不起被吉的風險。</li>
                                <li>基於這是個共享的平台，禁止過度幻想文。EX:以下哪一張圖是<span className='notice'>我老公Jimin的腹肌</span>。是會激起公憤的請注意。</li>
                                <li>我們都知道愛到深處自然黑，但嚴禁使用過黑及有可能危及成員形象的黑圖。</li>
                                <li>以上，希望大家都能喜歡這個網站，願搶票順利人品爆發。</li>
                            </ul>
                        </div>
                        <Description showGuide={showGuide} setShowGuide={setShowGuide} />
                        <div className='add-rightSide'>
                            <NewQuiz statusChange={statusChange} answer={answer} setAnswer={setAnswer} quiz={quiz} setQuiz={setQuiz} quizPic={quizPic} setQuizPic={setQuizPic} 
                            tag={tag} setTag={setTag} opt1={opt1} setOpt1={setOpt1} opt2={opt2} setOpt2={setOpt2} opt3={opt3} setOpt3={setOpt3} 
                            opt4={opt4} setOpt4={setOpt4} resetState={resetState} />
                        </div>
                    </>)}
            </div>
        </>
    )
}

export default AddQuiz
