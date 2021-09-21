import React, { useContext, useEffect, useState } from 'react'
import { GroupContext } from '../contexts/GroupContext'

const ResBoard = (props) => {
    const { groupName, getRightResponse, getWrongResponse } = useContext(GroupContext)
    const [ resPic, setResPic] = useState('')
    const [ rightResponse, setRightResponse ] = useState([])
    const [ wrongResponse, setWrongResponse ] = useState([])
    useEffect(()=>{
        getRightResponse(setRightResponse)        
        getWrongResponse(setWrongResponse)        
    }, [groupName])
    useEffect(() => {
        let index, path = '';
        if (props.status === 'right') {
            index = Math.floor(Math.random() * rightResponse.length)
            path = '../../img/right/' + groupName + '/' + rightResponse[index]
        } else if (props.status === 'wrong') {
            index = Math.floor(Math.random() * wrongResponse.length)
            path = '../../img/wrong/' + groupName + '/' + wrongResponse[index]
        }
        setResPic(path)
    }, [props.show])
    return (
        <div className={props.show ? 'resBoard' : 'hide'}>
            <div className='board-Title'>{groupName}-TMI</div>
            <div className='layer'>
                <img className='resPic' src={resPic} />
                <div className='res'>{props.res}</div>
                <button type='button' className='qres-button' onClick={props.closeRes}>學起來</button>
            </div>
        </div>
    )
}

export default ResBoard