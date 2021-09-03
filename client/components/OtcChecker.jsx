 import React, { Component } from 'react';

class OtcChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
        input: '',
        alert: null
    }
  }

  handleOtcSubmit(rx, otc) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rx, otc })
    };
    fetch('/rx', options)
        .then(res => res.json())
        .then(res => {
            this.setState({ input: '', alert: res });
            document.getElementById('otcInput').value = '';
        })
        .catch(err => console.log('OtcChecker.handleOtcSubmit: get status: ERROR: ', err));
  }

  render() {
    if (this.state.alert === false) {
        window.alert('No interactions found');
        this.setState({ alert: null });
    }
    else if (this.state.alert === true) {
        window.alert('Interactions found - Product not recommended');
        this.setState({ alert: null });
    }
    return (
      <div id="OtcCheckerBox">
        <input id="otcInput" type="text" onChange={(e) => this.setState({ input: e.target.value })} label="input" placeholder="Enter interaction"/>
        <button type="submit" onClick={() => this.handleOtcSubmit(this.props.rxData, this.state.input)}>Check For Interactions</button> 
      </div>
    );
  }
}

export default OtcChecker;