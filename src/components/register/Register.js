import React, { Fragment } from 'react';
import { Button } from '../button/Button';
import './register.scss';

export const Register = () => {
    return(
        <Fragment>
            <div className = 'modalForm'>
                <div className = 'modalInput'>
                    <span>Register</span>
                    <input type = 'text' />
                </div>

                <div className = 'modalInput'>
                    <span>Register</span>
                    <input type = 'text' />
                </div>                
            </div>
            <div className = 'modalBtn'>
                <Button text = 'Register' />
            </div>
        </Fragment>
    );
}