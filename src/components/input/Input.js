import React from 'react';
import './input.scss';

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
            <span>
                {props.errorMessage}
            </span>
        </div>
    );
}