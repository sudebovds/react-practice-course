import React from 'react';
import './header.scss';
import { AddClass } from '../../hoc/AddClass';
import { Navbar } from '../navbar/Navbar';

const Header = () => {

    return (
        <header>
            <div className = 'headerWrap'>
                <div className = 'logo'>
                    <h2>
                        <a href="/">RateApp</a>
                    </h2>
                </div>
                <nav className = 'navbar'>
                    <Navbar />
                </nav>
                <div className = 'person'>
                    <i className = "fa fa-user" aria-hidden = "true" />
                </div>
            </div>

            <hr />
        </header>
    );
}

export default AddClass(Header, 'header');