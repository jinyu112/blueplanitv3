import React, { Component } from 'react';
import InitialInput from './components/initialInput';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    slider: {
        selectionColor: '#3f51b5'
    },
});

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="App clearfix background-color">
                        <Route exact path='/' component={InitialInput} />
                    </div>
                </MuiThemeProvider>
            </Router>



        );
    }
}

export default App;
