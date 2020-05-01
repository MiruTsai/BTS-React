import React, { Component } from "react"

class Response extends Component {
    render () {
        const { Group, alertMessage } = this.props
        let className = "", blurLayerClassName = ""
        this.props.alertBlock ? (className = "alertBlock", blurLayerClassName = "blurLayer") : (className = "hide", blurLayerClassName = "hide")
        return <>
            <div className={className}>
                <div className="boardTitle">{Group}-TMI</div>
                <div className="alertBoard">
                    <div className="alertText">{alertMessage}</div>
                    <button type="button" className="res-button" onClick={() => this.props.switch()}>OK</button>
                </div>
            </div>
            <div className={blurLayerClassName}></div>
        </>
    }
}
export default Response