import React, { useContext } from 'react'
import { ConfirmContext } from '../contexts/ConfirmContext'
import { GroupContext } from '../contexts/GroupContext'

const ConfirmBoard = (props) => {
    const { groupName } = useContext(GroupContext)
    const { showConfirm, toggleConfirm, msg } = useContext(ConfirmContext)
    const { entrySwitch, route } = props
    return (
        <>
            <div className={showConfirm ? 'alertBlock' : 'hide'}>
                <div className='boardTitle'>{groupName === 'IZONE' ? 'IZ*ONE' : groupName}-TMI</div>
                <div className='alertBoard'>
                    <div className='alertText'>{msg}</div>
                    <div className="btnBox">
                        <button type='button' className='res-button' onClick={() => {toggleConfirm(); entrySwitch(route)}}>確定</button>
                        <button type='button' className='res-button' onClick={toggleConfirm}>取消</button>
                    </div>

                </div>
            </div>
            <div className={showConfirm ? 'blurLayer' : 'hide'}></div>
        </>
    )
}

export default ConfirmBoard