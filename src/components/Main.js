import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateHeaderState } from '../actions/main';

import logo from './../styles/img/header1.jpg';
import './../styles/Main.css';


import CalculationPad from './CalculationPad';
import MenuAppBar from './MenuAppBar'
import Copyright from './Copyright'


import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

class App extends Component {
  render() {
    const { header } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <MenuAppBar />
        <Container align="center">
          <Box my={4}>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">{header}</h1>
              {/* <Typography variant="h4" component="h1" gutterBottom align="center">
              {this.props.header}
            </Typography> */}
            </header>
            <CalculationPad />
            <Copyright label={header} />
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.main.getHeader.header
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateHeaderState: header => dispatch(updateHeaderState(header))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

