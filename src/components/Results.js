import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
class Results extends Component {

    render() {
        let { result } = this.props;
        return (
            
            <Container style={{ padding: '20px' }}>
                <Divider orientation="vertical" flexItem />
                <TextField id="filled-search" variant="filled" value={result} />
            </Container>
        );
    }
}


export default Results;