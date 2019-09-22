import React from 'react';

class Auth extends React.Component{
    state={
        auth:false,
    }
    login=(cb)=>{
        this.setState({
            auth:true
        });
        cb();
    }

    logout=(cb)=>{
        this.setState({
            auth:false
        });
        cb();
    }
    isAuth(){
        return this.state.auth;
    }
}

export default Auth;