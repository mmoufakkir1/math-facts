import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography, Link, Button, Container } from '@material-ui/core';

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
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link variant="button" color="textPrimary" href="/" underline="none" className={classes.link}>
              Welcome to Math Facts
            </Link>
          </Typography>
          <nav>
            <Button href="/" color="primary" className={classes.link}>
              Home
</Button>

            <Link variant="button" color="textPrimary" href="/mathFacts" className={classes.link}>
              Math Facts
            </Link>
            {/* <Link variant="button" color="textPrimary" href="/features" className={classes.link}>
              Features
            </Link> */}
            <Link variant="button" color="textPrimary" href="/about" className={classes.link}>
              About
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}
