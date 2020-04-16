import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import MathFacts from './MathFacts';
import './../styles/Main.css';


class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <Container align="center">          
          <MathFacts />
        </Container>
      </React.Fragment>
    );
  }
}

export default Main;

