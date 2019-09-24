import React, { useState } from 'react';

const Response=()=> {
    const [ newClass , setClass] =useState('resBG');
    changeClass(()=>{
        setClass('resOFF'
        )
    })
    return (
        <React.Fragment>
        <div className = {newClass}>
            <div className={newClass}>
            </div>
            <div className='resBoard'>
                <p></p>
            </div>
            <button></button>
            </div>
        </React.Fragment>
    )
}
export default Response;