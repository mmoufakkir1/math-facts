import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { updateOperationState, updateEquationCountState, updateEquationsState, updateModalEquationsState, updateResultState } from '../actions/main';
import { connect } from 'react-redux';

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


function mapStateToProps(state) {
    return {
        operation: state.main.getOperation.operation,
        count: state.main.getEquationCount.count,
        equations: state.main.getEquations.equations,
        open: state.main.getModalEquations.open,
        result: state.main.getResult.result
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateOperationState: header => dispatch(updateOperationState(header)),
        updateEquationCountState: count => dispatch(updateEquationCountState(count)),
        updateEquationsState: equations => dispatch(updateEquationsState(equations)),
        updateModalEquationsState: open => dispatch(updateModalEquationsState(open)),
        updateResultState: result => dispatch(updateResultState(result))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Results);