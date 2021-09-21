import React, { useContext } from 'react'
import { AlertContext } from '../contexts/AlertContext'
import { GroupContext } from '../contexts/GroupContext'

const AlertBoard = () => {
    const { groupName } = useContext(GroupContext)
    const { showAlert, msg, toggleAlert } = useContext(AlertContext)
    return (
        <>
            <div className={showAlert ? 'alertBlock' : 'hide'}>
                <div className='boardTitle'>{groupName === 'IZONE' ? 'IZ*ONE' : groupName}-TMI</div>
                <div className='alertBoard'>
                    <div className='alertText'>{msg}</div>
                    <button type='button' className='res-button' onClick={toggleAlert}>OK</button>
                </div>
            </div>
            <div className={showAlert ? 'blurLayer' : 'hide'}></div>
        </>
    )
}

export default AlertBoard