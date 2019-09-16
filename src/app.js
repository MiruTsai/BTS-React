import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Logo from './components/logo';
import Login from './components/login';
import Index from './components/index';
import Addquiz from './components/addquiz';
import '../css/common.css'
import '../css/hover-min.css'
const root = document.querySelector('.root');


class App extends React.Component{
    render(){
        return(
            <Logo />
        )
    }
}


ReactDOM.render(
    <BrowserRouter>
        <App />
        <Route path="/" exact component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/addquiz" component={Addquiz} />
    </BrowserRouter>
    , root);