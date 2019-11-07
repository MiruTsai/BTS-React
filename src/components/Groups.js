import React from "react";

const Groups = (props) => {
    return (
        <div className="quizSelect">
            <form>
            <div className="selectText">想換別家</div>
                <select id="quizType" name="groups" value={props.Group} onChange={props.chooseGroup}>
                    <option value="BTS">BTS</option>
                    <option value="IZONE">IZ*ONE</option>
                    <option value="TWICE">TWICE</option>
                </select>
            </form>
        </div>
    )
}

export default Groups;