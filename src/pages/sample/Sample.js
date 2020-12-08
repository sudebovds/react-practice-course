import React, { useContext } from 'react';
import { RateContext } from '../../context/RateContext';
import { Button } from '../../components/button/Button';
import './sample.scss';

export const Sample = () => {

    const { state, base1Handler, base2Handler, sampleDateHandler, dataWrite } = useContext(RateContext);

    return(
        <div className = 'sample'>
            <div className = "sampleContainer">
                <div>
                    <h3>
                        Get the cours: &nbsp;

                        <select onChange = {base1Handler} value = {state.sample.base1}>
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

                        <select onChange = {base2Handler} value = {state.sample.base2}>
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
                    <span>Date: <input type = 'date' onChange = {sampleDateHandler} /></span>

                    <Button text = 'Get cours' click = {dataWrite} arg = {state.sample} />
                </div>
                <div className = 'smapleResult'>
                    <ul>

                    </ul>
                </div>
            </div>            
        </div>
    );
}