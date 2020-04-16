import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import logo from './../styles/img/header1.jpg';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    link: {
        margin: theme.spacing(1, 1.5),
    }
});


class CustomerHeader extends Component {
    render() {

        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container align="center">
                    <Box my={4}>
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            {/* <Link variant="button" color="textPrimary" href="/" className={classes.link}> */}
                                <h1 className="App-title">{this.props.label}</h1>
                            {/* </Link> */}
                        </header>
                    </Box>
                </Container>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(CustomerHeader);

