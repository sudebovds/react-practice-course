import React, { Fragment } from 'react';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import './login.scss';

export const Login = () => {
    return(
        <Fragment>
            <div className = 'modalForm'>
                <Input
                    type = 'email'
                    label = 'Email'
                />

                <Input 
                    type = 'password'
                    label = 'Password'
                />                
            </div>
            <div className = 'modalBtn'>
                <Button text = 'Sign in' />
            </div>
        </Fragment>
    );
}