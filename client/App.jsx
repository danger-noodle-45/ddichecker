import React, { Component } from 'react';
import HomeContainer from './containers/HomeContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <HomeContainer />
        </div>
        )
    }
};


export default App;