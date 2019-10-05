import React from "react";

const Scalper = (props) => {
    return (
        <div className={props.fake}>
            <div className="errBoard">
                <img className="scalperPic" src="../../img/hate/hate.gif" />
                <div className="alert">你是黃牛吧！<br />這裡不歡迎你！！</div>
            </div>
        </div>
    )
}

export default Scalper;