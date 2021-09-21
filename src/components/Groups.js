import React, { useContext } from 'react'
import { GroupContext } from '../contexts/GroupContext'
const Groups = () => {
    const { groupName, setGroupName } = useContext(GroupContext)

    return (
        <div className='quizSelect'>
            <form>
            <div className='selectText'>想換別家</div>
                <select id='quizType' name='groups' value={groupName} onChange={(e) => setGroupName(e.target.value)}>
                    <option value='BTS'>BTS</option>
                    <option value='IZONE'>IZ*ONE</option>
                    <option value='TWICE'>TWICE</option>
                </select>
            </form>
        </div>
    )
}

export default Groups