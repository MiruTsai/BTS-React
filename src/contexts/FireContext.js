import React, { createContext, useContext } from 'react'
import fire from '../Fire'
import { GroupContext } from './GroupContext'
import { UserAuthContext } from './UserAuthContext'

export const FireContext = createContext()

const FireContextProvider = (props) => {
    
    const { groupName } = useContext(GroupContext)
    const { userData } = useContext(UserAuthContext)
    const applyMember = (uid, email, name) => {
        fire.firestore().collection('MemberShip').doc(uid).set({
            ID: email,
            NAME: name,
            BTSrightCounter: 0,
            BTSwrongCounter: 0,
            TWICErightCounter: 0,
            TWICEwrongCounter: 0,
            IZONErightCounter: 0,
            IZONEwrongCounter: 0,
            createdDate: new Date()
        })
    }

    const getQuizs = (callBack) => {
        let newquizs = []        
        fire.firestore().collection(groupName + 'QUIZS').get().then((res) => {
            res.forEach((doc) => {
                let x = doc.id
                let y = doc.data()
                y.id = x
                newquizs.push(y)                
            })
            callBack(newquizs)
        })        
    }
    const getUserInfo = (uid, callBack) => {
        fire.firestore().collection('MemberShip').doc(uid).get().then((doc) => {
            if (doc.exists) {
                let obj = doc.data()
                obj.uid = uid
                callBack(obj)
            }
        })        
    }
    const getGroupInfo = (callBack) => {
        let groupInfo = {}
        fire.firestore().collection('GroupInfo').get().then((item) => {
            item.forEach((doc) => {
                groupInfo[doc.data().name] = doc.data()
            })
            callBack(groupInfo)
        })        
    }
    const updateQuizCounter = (id, counter, num) => {
        fire.firestore().collection(groupName + 'QUIZS').doc(id).update({
            [counter]: num
        })
    }
    const updateUserCounter = (right, wrong) => {
        fire.firestore().collection('MemberShip').doc(userData.uid).update({
                    [groupName + 'rightCounter']: userData[groupName + 'rightCounter'] + right,
                    [groupName + 'wrongCounter']: userData[groupName + 'wrongCounter'] + wrong
                })
    }
    const getGroupMemberPopulation = () => {
        let data = []
        fire.firestore().collection('GROUPMEMBER').get()
            .then((list) => {
                list.forEach((doc) => {
                    let obj = doc.data()
                    obj.id = doc.id
                    data.push(obj)
                })
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error)
            })
            return data
    }
    const addQuiz = (obj) => {
        obj.author = userData.NAME
        obj.createdDate = new Date()
        obj.rightCounter = 0
        obj.wrongCounter = 0
        fire.firestore().collection(groupName + 'QUIZS').doc().set(obj).catch(function (error) {
            console.error('Error writing document: ', error)
        })
    }
    return (
        <FireContext.Provider value={{ applyMember, getQuizs, getUserInfo, getGroupInfo, updateQuizCounter, updateUserCounter, getGroupMemberPopulation, addQuiz }}>
            {props.children}
        </FireContext.Provider>
    )
}

export default FireContextProvider