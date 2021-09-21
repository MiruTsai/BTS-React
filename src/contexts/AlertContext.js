import React, { createContext, useState } from 'react'

export const AlertContext = createContext()

const AlertContextProvider = (props) => {
    const [ msg, setMsg ] = useState('')
    const [ showAlert, setShowAlert ] = useState(false)
    const updateAlertMsg = (msg) => {
        setMsg(msg)
        toggleAlert()
    }
    const toggleAlert = () => {
        setShowAlert(!showAlert)
    }
    return (
        <AlertContext.Provider value={{msg, showAlert, updateAlertMsg, toggleAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertContextProvider