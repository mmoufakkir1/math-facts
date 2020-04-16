import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import logo from './../styles/img/header1.jpg';


class CustomerHeader extends Component {
    render() {
        return (
            <React.Fragment>
                <Container align="center">
                    <Box my={4}>
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">{this.props.label}</h1>
                        </header>
                    </Box>
                </Container>
            </React.Fragment>
        )
    }
}
export default CustomerHeader;

