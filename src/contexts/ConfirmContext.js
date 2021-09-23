import React, { createContext, useState } from 'react'

export const ConfirmContext = createContext()

const ConfirmContextProvider = (props) => {
    const [ msg, setMsg ] = useState('')
    const [ showConfirm, setShowConfirm ] = useState(false)
    const updateConfirmMsg = (msg) => {
        setMsg(msg)
        toggleConfirm()
    }
    const toggleConfirm = () => {
        setShowConfirm(!showConfirm)
    }
    
    return (
        <ConfirmContext.Provider value={{msg, showConfirm, updateConfirmMsg, toggleConfirm}}>
            {props.children}
        </ConfirmContext.Provider>
    )
}

export default ConfirmContextProvider