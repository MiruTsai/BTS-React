import React, { useContext } from 'react'
import { ConfirmContext } from '../contexts/ConfirmContext'
const SideBar = (props) => {
    const { updateConfirmMsg } = useContext(ConfirmContext)
    const { setRoute } = props
    const needConfirm = (route) => {
        setRoute(route)
        updateConfirmMsg('您即將離開測驗，請問是否確定離開？')        
    }
    return (
        <>           
            <i className="far fa-arrow-alt-circle-left sideBarBtn" />            
            <ul className="sideBar">
                <li onClick={()=>{needConfirm('profile')}}>目前成績</li>
                <li onClick={()=>{needConfirm('addQuiz')}}>我想出題</li>
                <li onClick={()=>{needConfirm('preTest')}}>直接搶票</li>
            </ul>
        </>
    )
}

export default SideBar