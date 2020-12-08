import React, { useContext } from 'react';
import { RateContext } from '../../context/RateContext';
import { Button } from '../../components/button/Button';
import './sample.scss';

export const Sample = () => {

    const { state } = useContext(RateContext);

    return(
        <div className = 'sample'>
            <div className = "sampleContainer">
                <div>
                    <h3>
                        Get the cours: &nbsp;

                        <select>
                            {
                                Object.keys(state.currency)
                                    .map((item, i) => {
                                        return(
                                            <option key = {item}>
                                                {item}
                                            </option>
                                        );
                                    })
                            }
                        </select>

                        &nbsp;&nbsp; to &nbsp;&nbsp;

                        <select>
                            {
                                Object.keys(state.currency)
                                    .map((item, i) => {
                                        return(
                                            <option key = {item}>
                                                {item}
                                            </option>
                                        );
                                    })
                            }                            
                        </select>

                    </h3>
                </div>
                <div className = 'sampleHead'>
                    <span>Date: <input type = 'date' /></span>

                    <Button text = 'Get cours'/>
                </div>
                <div className = 'smapleResult'>
                    <ul>

                    </ul>
                </div>
            </div>            
        </div>
    );
}