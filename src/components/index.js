import React, { Component } from 'react';
import '../../css/main.css';
import Logo from './logo';

import Response from './response';

const IndexPic = () => {
    return (
        <div className="btspic">
            <img src="/img/group.jpg" className="indexPic" />
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
        return (
            <React.Fragment>
                <Logo />
                <Response alertMessage={this.props.alertMessage} alertBlock={this.props.alertBlock} blurLayer={this.props.blurLayer} closeAlert={()=>this.props.closeAlert(this)}  />
                <div className="indexContainer">
                    <div className="leftSide">
                        <div className="mobile_user member" onClick={() => this.props.auth(this)}>
                            <img src="img/user.svg" className="userIcon" />
                        </div>
                        <div className="index_textZone">
                            <h3>Love yourself. Love myself. Peace!</h3>
                            <div className="title">BTS Too Much Information</div>
                            <h5>I have come to love myself for who I am, <br />
                                for who I was, and for who I hope to become.</h5>
                        </div>
                        <div className="iconZone">
                            <div className="indexIcon hvr-push" id="test" onClick={() => this.props.quizEntry(this)}>
                                <img src="/img/edit.svg" className="icon" />
                                <div className="text">測驗模式</div>
                            </div>
                            <div className="indexIcon hvr-push" id="preTest" onClick={() => this.props.preTestEntry(this)}>
                                <img src="/img/clock.svg" className="icon" />
                                <div className="text">模擬搶票</div>
                            </div>
                        </div>
                       
                    </div>
                    <IndexPic />
                    <div className="user member hvr-float-shadow" onClick={() => this.props.auth(this)}>
                        <img src="/img/user.svg" className="userIcon" />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Index;