import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { updateOperationState, updateEquationCountState, updateEquationsState, updateModalEquationsState, updateResultState } from '../actions/main';
import { connect } from 'react-redux';

class Results extends Component {

    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    handleKeyPress(event) {
        let keyCode = event.which || event.keyCode || event.charCode;
        if (keyCode >= 96 && keyCode <= 105) {
            // Numpad keys
            keyCode -= 48;
            const keyValue = String.fromCharCode(keyCode);
            if (/\+|-/.test(keyValue))
                event.preventDefault();

            this.props.updateResultState(keyValue)
        }

        if (keyCode == 8) this.backspace();
        if (keyCode == 13) alert('enter');

    }

    backspace = () => {
        let { result } = this.props;
        this.props.updateResultState(result.slice(0, -1))
    };

    render() {
        let { result } = this.props;
        return (
            <Container style={{ padding: '20px' }}>
                <Divider orientation="vertical" flexItem />
                <input type="text" value={result} onKeyPress={this.handleKeyPress} />
            </Container>
        );
    }

    // render() {
    //     let { result } = this.props;
    //     return (

    //         <Container style={{ padding: '20px' }}>
    //             <Divider orientation="vertical" flexItem />
    //             <TextField id="filled-search" variant="filled" value={result} />
    //         </Container>
    //     );
    // }
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