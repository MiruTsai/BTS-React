import React, { createContext, useState, useEffect } from 'react'

export const UserAuthContext = createContext()

const UserAuthContextProvider = (props) => {
    const [userData, setUserData] = useState({auth: false, uid: '', name: ''})
    const updateUserData = (obj) => {
        obj.auth = true
        setUserData(current => {
            return {...current, ...obj}
        })
    }
    
    return (
        <UserAuthContext.Provider value={{userData, updateUserData}}>
            {props.children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthContextProvider