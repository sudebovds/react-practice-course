import React, { useContext } from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom'
import { AddClass } from '../../hoc/AddClass';
import { Navbar } from '../navbar/Navbar';
import { RateContext } from '../../context/RateContext';

const Header = () => {

    const {modalShowHandler} = useContext(RateContext);

    return (
        <header>
            <div className = 'headerWrap'>
                <div className = 'logo'>
                    <h2>
                        <NavLink exact to="/">RateApp</NavLink>
                    </h2>
                </div>
                <nav className = 'navbar'>
                    <Navbar />
                </nav>
                <div className = 'person'>
                    <i className = "fa fa-user" aria-hidden = "true" onClick = {modalShowHandler} />
                </div>
            </div>

            <hr />
        </header>
    );
}

export default AddClass(Header, 'header');