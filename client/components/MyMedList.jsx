import React from 'react';
import Med from './Med.jsx';

const MyMedList = props => {
    const { rxData } = props;
    const medList = [];
    if (rxData.length != 0) {
        for (let i = 0; i < rxData.length; i += 1) {
            medList.push(<Med medData={rxData[i].name} key={i}/>);
        };
    }
    return (
        <div id='medListBox'>
            <div id="outerMedBox">{medList}</div>
            <input id="medInput" type='text' onChange={props.handleChange} label='rxInput' placeholder="Enter medication"/>
            <button id='addMedButton' onClick={() => {props.handleAddRx(props.userId, props.rxInput)}}>Add Med</button>
        </div>
    );
}

export default MyMedList;