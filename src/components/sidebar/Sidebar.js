import React, { useContext } from 'react';
import { RateContext } from '../../context/RateContext';
import './sidebar.scss';

export const Sidebar = () => {
    const {state} = useContext(RateContext);
    console.log(state);

    return(
        <section className = 'sidebar'>
            <header className = 'sidebarHead'>
                <h3>All Currencies</h3>
            </header>
            <div className = 'sidebarContent'>
                <ul>
                    {
                        Object.keys(state.currency)
                            .map((item, i) => {
                                return(
                                    <li key={item}>
                                        <p>
                                            <span>
                                                <img src = {state.currency[item].flag} alt = {item} />&nbsp;{item}
                                            </span>
                                            &nbsp;{state.currency[item].name}
                                        </p>
                                    </li>
                                );
                            })
                    }
                </ul>
            </div>
        </section>
    );
}