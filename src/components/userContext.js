import React, { Component, createContext } from 'react';
import fire from '../fire';
export const UserContext = createContext();

class UserContextProvider extends Component {
    state = {
        auth: false,
    }
    toogleLogin = (props) => {
        console.log(props);
        console.log(this.props);
        if (props.email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (props.password.length < 6) {
            alert('Please enter a password.');
            return;
        }
        fire.auth().signInWithEmailAndPassword(props.email, props.password).then(() => {
            localStorage.setItem('uid', fire.auth().currentUser.uid);
            console.log(fire.auth().currentUser)
            this.setState({
                userName: fire.auth().currentUser.email
            })
        }).catch((error) => {
            console.log(error);
        })
        this.setState({
            auth: true
        })
    }
    render() {
        return (
            <UserContext.Provider value={{ ...this.state, toogleLogin: this.toogleLogin }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserContextProvider;
