import React, { useContext } from 'react'
import { GroupContext } from '../contexts/GroupContext'
const BackGround = () => {
    const { groupName } = useContext(GroupContext)
    return (
        <div className={groupName+'layer'}>

        </div>
    )
}

export default BackGround