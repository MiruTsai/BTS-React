import React, { createContext, useState, useEffect, useContext } from 'react'
import { FireContext } from './FireContext'

export const GroupContext = createContext()

const GroupContextProvider = (props) => {    
    const [groupName, setGroupName] = useState('BTS')
    const [quizs, setQuizs] = useState([])
    const [groupInfo, setGroupInfo] = useState({
        BTS: {
            name: 'BTS',
            mainDesc: 'Love yourself. Love myself. Peace!',
            subDesc: 'I have come to love myself for who I am, for who I was, and for who I hope to become.'
        }
    })
   

    const getRightResponse = (callBack) => {
        if (groupName === 'IZONE') {
            callBack(['chaewon_right_1.gif', 'chaewon_right_2.gif', 'group_right_1.gif', 'group_right_2.gif', 'hitomi_right_1.gif', 'hyewon_right_1.gif', 'nako_right_1.gif', 'sakura_right_1.gif', 'wonyoung_right_1.gif'])
        } else if (groupName === 'BTS') {
            callBack(['group_right_1.gif', 'group_right_2.gif', 'group_right_3.gif', 'jhope_right_1.gif', 'jimin_right_1.gif', 'jin_right_1.gif', 'jin_right_2.gif', 'jk_right_1.gif', 'jk_right_2.gif', 'rm_right_1.gif', 'rm_right_2.gif', 'suga_right_1.gif', 'suga_right_1.gif', 'v_right_1.gif', 'v_right_2.gif'])
        } else if (groupName === 'TWICE') {
            callBack(['group_right_1.gif', 'group_right_2.gif', 'group_right_3.gif', 'group_right_4.gif', 'jeong_right_1.gif', 'nayeon_right_1.gif', 'nayeon_right_2.gif'])
        }
    }
    const getWrongResponse = (callBack) => {
        if (groupName === 'IZONE') {
            callBack(['chaeyeon_wrong_1.gif', 'hitomi_wrong_1.gif', 'hyewon_wrong_1.gif', 'minjoo_wrong_1.gif', 'minjoo_wrong_2.gif', 'wonyoung_wrong_1.gif', 'yena_wrong_1.gif', 'yena_wrong_2.gif', 'yuri_wrong_1.gif'])
        } else if (groupName === 'BTS') {
            callBack(['group_wrong_1.gif', 'group_wrong_2.gif', 'jhope_wrong_1.gif', 'jhope_wrong_3.gif', 'jhope_wrong_4.gif', 'jimin_wrong_1.gif', 'jimin_wrong_2.gif', 'jin_wrong_1.gif', 'jin_wrong_2.gif', 'jin_wrong_3.gif', 'jk_wrong_1.gif', 'suga_wrong_1.gif', 'suga_wrong_2.gif', 'rm_wrong_1.gif'])
        } else if (groupName === 'TWICE') {
            callBack(['chae_wrong_1.gif', 'dahyun_wrong_1.gif', 'group_wrong_1.gif', 'mina_wrong_1.gif', 'nayeon_wrong_1.gif', 'sana_wrong_1.gif', 'sana_wrong_2.gif', 'tzuyu_wrong_1.gif'])
        }
    }
    const filterQuizs = (index) => {
        quizs.splice(index, 1)
        setQuizs(quizs)
    }
    return (
        <GroupContext.Provider value={{quizs, setQuizs, groupName, setGroupName, getRightResponse, getWrongResponse, filterQuizs, groupInfo, setGroupInfo }}>
            {props.children}
        </GroupContext.Provider>
    )    
}

export default GroupContextProvider