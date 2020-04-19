import React, { Component } from 'react';
import { Container, Box, Button,withStyles } from '@material-ui/core';

import headerImage from './../styles/img/header1.jpg';

const styles = theme => ({
    link: {
        margin: theme.spacing(1, 1.5),
    }, 
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
});


class CustomerHeader extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container align="center">
                    <Box my={4}>
                        <header id='animate-area'>
                            <img src={headerImage} className="App-logo" alt="logo" />
                            {/* <Link variant="button" color="textPrimary" href="/" className={classes.link}> */}
                            <h1>{this.props.label}</h1>
                            {/* </Link> */}
                        </header>
                    </Box>
                </Container>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(CustomerHeader);

