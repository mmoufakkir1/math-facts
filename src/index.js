import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import configureStore from './store';

import './styles/index.css';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import MenuAppBar from './components/MenuAppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './components/Main';
import Features from './components/Features';
import About from './components/About';
import Home from './components/Home';
import Copyright from './components/Copyright'
import CustomHeader from './components/CustomHeader'
import './styles/background.css'

const header = 'City of Math';

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter> 
      <MenuAppBar />
      <CssBaseline />
      <CustomHeader label={header}/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/mathFacts" component={Main} />
        <Route path="/features" component={Features} />
        <Route path="/about" component={About} />
      </Switch>      
      <Copyright label={header} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
