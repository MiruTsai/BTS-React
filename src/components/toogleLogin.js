import React,{Component} from 'react';
import {UserContext} from './userContext';

class ToogleLogin extends React.Component{

    static contextType = UserContext
    constructor(props){
        super(props);
    }
    test(){
        console.log(this.props);
    }
    render(){
        const {toogleLogin} = this.context
        return(
            <button onClick={this.test.bind(this)}>登入</button>
        )
    }
}
export default ToogleLogin;