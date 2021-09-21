import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GroupContext } from '../contexts/GroupContext'

const Logo = () => {
    const { groupName } = useContext(GroupContext)
    return (
        <Link to='/'>
            <img src={'/../img/logo/' + groupName + '.PNG'} className='logo' />
        </Link>
    )
}

export default Logo