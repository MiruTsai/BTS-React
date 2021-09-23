import React, { Component, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Index from './components/Index'
import AddQuiz from './components/Addquiz'
import QuizBoard from './components/QuizBoard'
import Profile from './components/Profile'
import PreTest from './components/PreTest'
import Album from './components/Album'
import AlertBoard from './components/AlertBoard'
import Logo from './components/Logo'
import BackGround from './components/Bg'
import fire from './Fire'
import '../css/common.css'
import '../css/index.css'
import FireContextProvider from './contexts/FireContext'
import GroupContextProvider from './contexts/GroupContext'
import UserAuthContextProvider from './contexts/UserAuthContext'
import AlertContextProvider from './contexts/AlertContext'
import ConfirmContextProvider from './contexts/ConfirmContext'

const root = document.querySelector('.root')

const App = () => {   
    return (        
        <>
            <AlertContextProvider>
                <ConfirmContextProvider>
                    <UserAuthContextProvider>
                        <GroupContextProvider>
                            <AlertBoard />
                            <FireContextProvider>
                                <BrowserRouter>                                
                                        <Logo />                                    
                                        <BackGround />
                                        <Route exact path='/' render={(props) => <Index {...props} />} />
                                        <Route path='/LoginPage' render={(props) => <LoginPage {...props} />} />
                                        <Route path='/profile' render={(props) => <Profile {...props} />} />
                                        <Route path='/quizBoard' render={(props) => <QuizBoard {...props} />} />
                                        <Route path='/addQuiz' render={(props) => <AddQuiz {...props} />} />
                                        <Route path='/preTest' render={(props) => <PreTest {...props} />} />
                                        <Route path='/album' render={(props) => <Album {...props} />} />                                
                                </BrowserRouter>
                            </FireContextProvider>
                        </GroupContextProvider>
                    </UserAuthContextProvider>
                </ConfirmContextProvider>
            </AlertContextProvider>
        </>        
    )
}

ReactDOM.render(
    <App />
    , root)

export default withRouter(App)