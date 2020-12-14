import React from 'react';
import './input.scss';

function isInvalid({valid, toushed, shouldValidate}){
    return !valid && toushed && shouldValidate
}

export const Input = (props) => {
    const cls = ['modalInput'];
    const inputType = props.tupr || 'text';
    const htmlFor = `${props.type} - ${Math.random()}`;

    return(
        <div className = {cls.join(' ')}>
            <label htmlFor = {htmlFor}>
                {props.label}
            </label>
            <input 
                type = {inputType} 
                id = {htmlFor} 
                value = {props.value}
                onChange = {props.onChange}
            />
            
            {isInvalid(props) ? <span style = {{color: '#f01f30'}}>{props.errorMessage || 'Type right value'}</span> : null}

        </div>
    );
}