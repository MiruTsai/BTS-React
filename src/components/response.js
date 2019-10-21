import React from "react";

const Response = (props) => {
    return (
        <>
            <div className={props.alertBlock}>
                <div className="boardTitle">BTS-TMI</div>
                <div className="alertBoard">
                    <div className="alertText">{props.alertMessage}</div>
                    <button type="button" className="res-button" onClick={() => props.closeAlert(this)}>OK</button>
                </div>
            </div>
            <div className={props.blurLayer}></div>
        </>
    )
}
export default Response;