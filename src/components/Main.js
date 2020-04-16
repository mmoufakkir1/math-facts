import React, { Component } from 'react';
import logo from './../styles/img/header1.jpg';
import './../styles/Main.css';

import Copyright from './Copyright'
import MathFacts from './MathFacts'

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

class Main extends Component {
  render() {
    const header = 'Math Facts';
    return (
      <React.Fragment>
        <Container align="center">
          <Box my={4}>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">{header}</h1>
            </header>
            <Copyright label={header} />
          </Box>
          <MathFacts />
        </Container>
      </React.Fragment>
    );
  }
}

export default Main;

