import React, { useContext } from 'react';
import { RateContext } from '../../context/RateContext';
import { Button } from '../../components/button/Button';
import './sample.scss';

export const Sample = () => {

    const { state, base1Handler, base2Handler, sampleDateHandler, dataWrite, sampleRemove } = useContext(RateContext);

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
                        {
                            Object.keys(state.sampleList)
                                .map((item, i) => {
                                    return(
                                        <li key = {item}>
                                            <span>
                                                <img 
                                                    src = {state.currency[state.sampleList[item].base1].flag}
                                                    alt = {item}
                                                />
                                                &nbsp;
                                                {
                                                    state.sampleList[item].base1
                                                }
                                            </span>
                                            <span>
                                                {
                                                    state.sampleList[item].date
                                                }
                                            </span>
                                            <span>
                                                {
                                                    `${state.sampleList[item].cours} ${state.sampleList[item].base2}`
                                                }
                                            </span>

                                            <button onClick = {() => sampleRemove(item)}>
                                                <i className = 'fa fa-times'></i>
                                            </button>
                                        </li>
                                    );
                                })
                        }
                    </ul>
                </div>
            </div>            
        </div>
    );
}