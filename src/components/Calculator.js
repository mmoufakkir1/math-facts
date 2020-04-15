import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import { updateOperationState, updateEquationCountState, updateEquationsState, updateModalEquationsState, updateResultState,updateStepperState } from '../actions/main';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

class Calculator extends Component {

    nextStep = () => {
        const { step } = this.props;
        this.props.updateStepperState(step + 1);
    }

    prevStep = () => {
        const { step } = this.props;
        this.props.updateStepperState(step - 1);
    }

    onClick = button => {
        let { result } = this.props;

        if (button === "=" && result.length > 0) {
            this.calculate()
        }

        else if (button === "C") {
            this.reset()
        }
        else if (button === "CE") {
            this.backspace()
        }
        else {
            if (button * 1000 >= 0) {
                this.props.updateResultState(result + button)
            }
        }
    };

    calculate = () => {
        let { result, equations,step } = this.props;
        let value = (eval(result) || 0) + 0;
        try {

            equations[step] = { ...equations[step], studentAnswer: value }

            this.props.updateResultState(value)
            this.props.updateEquationsState(equations);

            if (equations.length !== step) {
               this.nextStep() 
            }            
            this.reset();
        } catch (e) {
            this.props.updateResultState("error")
            this.reset()
        }
    };

    reset = () => {
        this.props.updateResultState("")
    };

    backspace = () => {
        let { result } = this.props;
        this.props.updateResultState(result.slice(0, -1))
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button name="1" onClick={e => this.onClick(e.currentTarget.name)}>1</Button>
                    <Button name="2" onClick={e => this.onClick(e.currentTarget.name)}>2</Button>
                    <Button name="3" onClick={e => this.onClick(e.currentTarget.name)}>3</Button>
                </ButtonGroup>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button name="4" onClick={e => this.onClick(e.currentTarget.name)}>4</Button>
                    <Button name="5" onClick={e => this.onClick(e.currentTarget.name)}>5</Button>
                    <Button name="6" onClick={e => this.onClick(e.currentTarget.name)}>6</Button>
                </ButtonGroup>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button name="7" onClick={e => this.onClick(e.currentTarget.name)}>7</Button>
                    <Button name="8" onClick={e => this.onClick(e.currentTarget.name)}>8</Button>
                    <Button name="9" onClick={e => this.onClick(e.currentTarget.name)}>9</Button>

                </ButtonGroup>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button name="C" onClick={e => this.onClick(e.currentTarget.name)}>C</Button>
                    <Button name="0" onClick={e => this.onClick(e.currentTarget.name)}>0</Button>
                    <Button name="=" onClick={e => this.onClick(e.currentTarget.name)}>=</Button>
                </ButtonGroup>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        operation: state.main.getOperation.operation,
        count: state.main.getEquationCount.count,
        equations: state.main.getEquations.equations,
        open: state.main.getModalEquations.open,
        result: state.main.getResult.result,
        step: state.main.getStepper.step,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateOperationState: header => dispatch(updateOperationState(header)),
        updateEquationCountState: count => dispatch(updateEquationCountState(count)),
        updateEquationsState: equations => dispatch(updateEquationsState(equations)),
        updateModalEquationsState: open => dispatch(updateModalEquationsState(open)),
        updateResultState: result => dispatch(updateResultState(result)),
        updateStepperState: step => dispatch(updateStepperState(step)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Calculator));