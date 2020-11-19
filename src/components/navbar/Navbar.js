import React from 'react';
import './navbar.scss';

export const Navbar = () => {
    return (
        <ul>
            <li><a href="/">Main</a></li>
            <li><a href="/calc">Calculator</a></li>
            <li><a href="/sampl">Samples</a></li>
            <li><a href="/info">Information</a></li>
        </ul>
    );
}