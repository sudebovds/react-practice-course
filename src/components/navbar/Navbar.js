import React from 'react';
import './navbar.scss';
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <ul>
            <li><NavLink exact to="/">Main</NavLink></li>
            <li><NavLink to="/calc">Calculator</NavLink></li>
            <li><NavLink to="/sampl">Samples</NavLink></li>
            <li><NavLink to="/info">Information</NavLink></li>
        </ul>
    );
}