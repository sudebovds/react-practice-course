import React, { Fragment } from 'react';
import { Button } from '../button/Button';
import './login.scss';

export const Login = () => {
    return(
        <Fragment>
            <div className = 'modalForm'>
                <div className = 'modalInput'>
                    <span>Sign in</span>
                    <input type = 'text' />
                </div>

                <div className = 'modalInput'>
                    <span>Sign in</span>
                    <input type = 'text' />
                </div>                
            </div>
            <div className = 'modalBtn'>
                <Button text = 'Sign in' />
            </div>
        </Fragment>
    );
}