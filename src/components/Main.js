import React, { Component } from 'react';
import logo from './../styles/img/header1.jpg';
import './../styles/Main.css';
import MenuAppBar from './MenuAppBar'
import Copyright from './Copyright'
import CalculatorConfig from './CalculatorConfig';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

class App extends Component {
  render() {
    const header = 'Math Facts';
    return (
      <React.Fragment>
        <CssBaseline />
        <MenuAppBar />
        <Container align="center">
          <Box my={4}>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">{header}</h1>
            </header>
            <Copyright label={header} />
          </Box>          
        <CalculatorConfig />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;

