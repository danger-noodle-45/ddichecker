import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router';
import LoginButton from '../components/LoginButton.jsx';
import SignupButton from '../components/SignupButton.jsx';
import SignupForm from '../components/SignupForm.jsx';
import MyMedsDisplay from '../components/MyMedsDisplay.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
    userId: state.meds.userId,
    rxData: state.meds.rxData
});

const mapDispatchToProps = dispatch => ({
    updateUserId: (userId, rxData) => {
        dispatch(actions.handleLoginUser(userId, rxData));
    }
});

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: false,
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }
    
    handleLoginSubmit = (username, password) => {
        const body = {username, password};
        fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then((res) => {
              if (res.match === true) {
                this.props.updateUserId(res.id, res.rxs);
                this.setState({ view: true });
              }
          })
          .catch(err => console.log('LoginButton.handleLoginSubmit: get status: ERROR: ', err));
    };

    render() {
        return (
            <>
                {this.state.view ? <Redirect to='/home'/> : null}
                <Switch>
                    <Route exact path='/'>
                        <div id='HomePage'>
                            <h2>Welcome</h2>
                            <LoginButton handleLoginSubmit={this.handleLoginSubmit}/>
                            <SignupButton />
                        </div>
                    </Route>
                    <Route exact path='/signup'>
                        <SignupForm />
                    </Route>
                    <Route exact path='/home'>
                        <MyMedsDisplay userId={this.props.userId} rxData={this.props.rxData}/>
                    </Route>
                </Switch>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);