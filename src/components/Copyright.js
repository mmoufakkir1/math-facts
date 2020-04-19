import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


export default class Copyright extends Component {
  render() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.cityofmath.com">
          {this.props.label}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        <br />
        {'Powered By '}
        <Link color="inherit" href="https://www.spartanappsolutions.com/">
          Spartan App Solutions
      </Link>
      </Typography>
    );
  }
}