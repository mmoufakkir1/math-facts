import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateHeaderState } from '../actions/main';

import logo from './../styles/img/header1.jpg';
import './../styles/Main.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.props.header}</h1>
        </header>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.main.getheader.header
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateHeaderState: header => dispatch(updateHeaderState(header))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

