import React, { Component } from 'react';
import '../../css/main.css';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import fire from '../fire';
import Login from './login';
import Profile from './profile';
import QuizBoard from './quizboard';
import { UserContext } from './userContext';




const IndexPic = () => {
    return (
        <div className="btspic">
            <img src="BTS-React/img/group.jpg" className="indexPic" />
        </div>
    )
}


// const IndexLeftside = (props) => {
//     return (
       
//         <div className="leftSide">
//             <div className="index_textZone">
//                 <h3>Love yourself. Love myself. Peace!</h3>
//                 <div className="title">BTS Too Much Information</div>
//                 <h5>I have come to love myself for who I am, <br />
//                     for who I was, and for who I hope to become.</h5>
//             </div>
//             <div className="iconZone">
//             {/* <Link to='/quizboard'> */}
//                     <div className="indexIcon hvr-float-shadow" id="test" onClick={()=>props.quizEntry(this);}>
//                         <img src="/../img/edit.svg" className="icon" />
//                         <div className="text">測驗模式</div>
//                     </div>
            
//                     {/* </Link> */}
//                     <div className="indexIcon hvr-float-shadow" id="preTest">
//                         <img src="/../img/clock.svg" className="icon" />
//                         <div className="text">模擬搶票</div>
//                     </div>
                
//             </div>
//         </div>
//     )
// }


class Index extends Component {

    
    render() {
        console.log('index',this)
        return (
           
            <div className="indexContainer">
            <div className="leftSide">
            <div className="index_textZone">
                <h3>Love yourself. Love myself. Peace!</h3>
                <div className="title">BTS Too Much Information</div>
                <h5>I have come to love myself for who I am, <br />
                    for who I was, and for who I hope to become.</h5>
            </div>
            <div className="iconZone">
            <Link to='/quizboard'>
                    <div className="indexIcon hvr-float-shadow" id="test" 
                    // onClick={()=>this.props.quizEntry(this)}
                    >
                        <img src="BTS-React/img/edit.svg" className="icon" />
                        <div className="text">測驗模式</div>
                    </div>
                    </Link>
                
                    <div className="indexIcon hvr-float-shadow" id="preTest">
                        <img src="BTS-React/img/clock.svg" className="icon" />
                        <div className="text">模擬搶票</div>
                    </div>
                
            </div> 
         </div>
               
                <IndexPic />
             

                <div className="user member hvr-float-shadow" onClick={()=>this.props.auth(this)}>
            <img src="BTS-React/img/user.svg" className="userIcon" />
        </div>
            </div>
        )
    }
}
export default Index;