import React, { Fragment, useState, useContext } from 'react';
import { RateContext } from '../../context/RateContext';
import { Login } from '../login/Login';
import { Register } from '../register/Register';
import './modal.scss';

export const Modal = () => {

    const [value, setValue] = useState('login');
    const links = [{name: 'Sig in', id: 'login'}, {name: 'Registration', id: 'register'}];

    const windowHandler = (id) => {
        setValue(id);
    }

    const {state, modalHideHandler} = useContext(RateContext);

    const cls = ['modal']

    if(state.showModal){
        cls.push('modalShow');
    }

    return(
        <div className = {cls.join(' ')}>

            <Fragment>
                <div className = 'modalHead'>
                    <ul>
                        {
                            links.map((item, i) => {
                                return(
                                <li 
                                    key = {item.name}
                                    onClick = {() => windowHandler(item.id)}
                                    style = {{cursor: "pointer", fontWeight: item.id === value ? "bold" : "normal"}}
                                >
                                    {item.name}
                                </li>
                                );
                            })
                        }
                    </ul>

                    <i className = 'fa fa-times' aria-hidden = 'true' onClick = {modalHideHandler}></i>
                </div>
                <hr />
            </Fragment>

            <h2 style = {{color: '#f01f30',  marginLeft: '.6vw'}}>{state.error}</h2>

            {
                value === 'register' ? <Register /> :  <Login />
            }
            
        </div>
    );
}
