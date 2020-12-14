import React, { Fragment } from 'react';
import { Login } from '../login/Login';
import { Register } from '../register/Register';
import './modal.scss';

export const Modal = () => {
    return(
        <div className = 'modal'>

            <Fragment>
                <div className = 'modalHead'>
                    <ul>
                        <li>Sign in</li>
                        <li>Registration</li>
                    </ul>

                    <i className = 'fa fa-times' aria-hidden = 'true'></i>
                </div>
                <hr />
            </Fragment>

           {/* <Login /> */}
            <Register />
        </div>
    );
}
