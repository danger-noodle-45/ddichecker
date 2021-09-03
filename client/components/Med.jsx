import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
    userId: state.meds.userId
});

const mapDispatchToProps = dispatch => ({
    deleteRx: (medData) => dispatch(actions.deleteRx(medData)),
});

const Med = props => {
    const { medData } = props;
    function handleDeleteRx() {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ medData: medData, userId: props.userId })
        };
        fetch('/user/deleteRx', options)
            .then(res => {
                if (res.status === 200) {
                    props.deleteRx(medData);
                }
            })
            .catch(err => console.log('MyMedsDisplay.handleDeleteRx: get status: ERROR: ', err));
    }
    
    return (
        <div id='medBox'>
            <div>{medData}</div>
            <button onClick={handleDeleteRx}>Delete</button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Med);