import React, { Component } from 'react';
import MyMedList from './MyMedList.jsx';
import OtcChecker from './OtcChecker.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = dispatch => ({
    addRx: (rxInput) => dispatch(actions.addRx(rxInput)),
});

class MyMedsDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rxInput: '',
        }
        this.handleAddRx = this.handleAddRx.bind(this);
    }
    
    handleAddRx(userId, ...rx) {
        // loop over each of the drugs currently in rxData
            // if the array does not include the drug typed in, then run the post request
        const found = this.props.rxData.find(obj => obj.name === rx[0]);
        if (found) {
            window.alert('Rx already exists.');
            return;
        } 
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rx, userId })
        };
        fetch('/user/addRx', options)
            .then(res => res.json())
            .then(res => {
                this.props.addRx({name: rx[0], id: res.id});
                document.getElementById('medInput').value = '';
            })
            .catch(err => console.log('MyMedsDisplay.handleAddRx: get status: ERROR: ', err));
    }

    render() {
        return (
            <div id='MyMedsDisplay'>
                <MyMedList rxInput={this.state.rxInput} handleChange={(e) => this.setState({ rxInput: e.target.value })} userId={this.props.userId} rxData={this.props.rxData} handleAddRx={this.handleAddRx}/>
                <OtcChecker rxData={this.props.rxData}/>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(MyMedsDisplay);