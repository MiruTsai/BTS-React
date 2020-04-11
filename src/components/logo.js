import React from "react"
import { Link } from "react-router-dom"

const Logo = (props) =>{    
    let groupName=""
    if (props.Group === "IZ*ONE"){
        groupName = "IZONE"
    }else{
        groupName = props.Group
    }
    return(
        <Link to="/">
    <img src={ "/../img/logo/" + groupName + ".PNG" } className="logo" />
    </Link>)
}

export default Logo