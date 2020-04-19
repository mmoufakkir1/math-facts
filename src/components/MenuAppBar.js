import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography, Link, Button, Container } from '@material-ui/core';
import logo from './../styles/img/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  logo: {
    maxWidth: 80,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link variant="button" color="textPrimary" href="/" underline="none" className={classes.link}>
            <img src={logo} alt="logo" className={classes.logo} />
            </Link>
          </Typography>
          <nav>
            <Link variant="button" color="textSecondary" underline="hover" href="/" className={classes.link}>
              Home
            </Link>
            <Link variant="button" color="textSecondary" href="/mathFacts" className={classes.link}>
              Math Facts
            </Link>
            {/* <Link variant="button" color="textSecondary" href="/features" className={classes.link}>
              Features
            </Link> */}
            <Link variant="button" color="textSecondary" href="/about" className={classes.link}>
              About
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}
