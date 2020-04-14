import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Results from './Results';
import Calculator from './Calculator';
import CalculatorConfig from './CalculatorConfig'
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'

import { updateResultState, updateOperationState } from '../actions/main';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});
class CalculationPad extends Component {

    render() {
        return (
            <Container>
                <CalculatorConfig/>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        operation: state.main.getOperation.operation
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateResultState: result => dispatch(updateResultState(result))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CalculationPad))