import React from "react"

const Response = (props) => {
    let groupName
    if (props.Group === "IZONE") {
        groupName = "IZ*ONE"
    } else {
        groupName = props.Group
    }
    return (
        <>
            <div className={props.alertBlock}>
                <div className="boardTitle">{groupName}-TMI</div>
                <div className="alertBoard">
                    <div className="alertText">{props.alertMessage}</div>
                    <button type="button" className="res-button" onClick={() => props.closeAlert(this)}>OK</button>
                </div>
            </div>
            <div className={props.blurLayer}></div>
        </>
    )
}
export default Response