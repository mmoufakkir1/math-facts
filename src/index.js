import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import configureStore from './store';

import './styles/index.css';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MenuAppBar from './components/MenuAppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './components/Main';
import Features from './components/Features';
import About from './components/About';

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <MenuAppBar />
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/features" component={Features} />
        <Route path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
