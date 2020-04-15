import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { updateOperationState, updateEquationCountState, updateEquationsState, updateModalEquationsState, updateResultState,updateStepperState } from '../actions/main';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import _ from 'lodash'


import Results from './Results';
import Calculator from './Calculator';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {convertOperation , convertOperationToDisplay} from './../global';


const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '550px'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    table: {
        minWidth: 650,
    },
});
class CalculationConfig extends Component {
    state = {
        start: false
    }

    nextStep = () => {
        const { step } = this.props;
        this.props.updateStepperState(step + 1);
    }

    prevStep = () => {
        const { step } = this.props;
        this.props.updateStepperState(step - 1);
    }

    handleModalOpen = () => {
        this.props.updateModalEquationsState(true);
    };

    handleModalClose = () => {
        this.props.updateEquationCountState(10);
        this.props.updateEquationsState([]);
        this.props.updateModalEquationsState(false);
        this.props.updateResultState('');
        this.props.updateStepperState(0);
    };
    

    handleCountChange = (event) => {
        this.props.updateEquationCountState(event.target.value)
    };

    handleRadioChange = (event) => {
        this.props.updateOperationState(event.target.value);
    };

    handleSelectChange = () => {
        const { operation, count } = this.props;
        let eq = [];
        const op = convertOperation(operation);
        const opDisplay = convertOperationToDisplay(operation);

        if (!_.isEmpty(operation) && count > 0) {
            while (eq.length < count) {
                let max = 12
                let min = Math.floor(Math.random() * max);
                let b = Math.floor(Math.random() * (max - min + 1)) + min;
                let eValue = (eval(b + op + min) || 0) + 0;
                let elem = { equation: b + opDisplay + min, correctAnswer: eValue, studentAnswer: 0, operation: op };
                if (!_.includes(eq, elem)) {
                    if (operation === 'division') {
                        if (this.number_test(eValue)) {
                            eq.push(elem);
                        }
                    } else {
                        eq.push(elem);
                    }
                }

            }
        }
        this.props.updateEquationsState(eq);
        this.props.updateModalEquationsState(true);
    };

    number_test = (n) => {
        var result = (n - Math.floor(n)) !== 0;

        if (result)
            return false;
        else
            return true;
    };

    render() {
        const { classes, operation, count, equations, open,step } = this.props;
        console.log('step ' + step)
        return (
            <Container>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose Math Operation</FormLabel>
                    <RadioGroup row aria-label="operation" name="mathOperation" value={operation} defaultValue="substract" onChange={this.handleRadioChange}>
                        <FormControlLabel value="substract" control={<Radio />} label="substract" />
                        <FormControlLabel value="addiction" control={<Radio />} label="addiction" />
                        <FormControlLabel value="multiplication" control={<Radio />} label="multiplication" />
                        <FormControlLabel value="division" control={<Radio />} label="division" />
                    </RadioGroup>
                    <FormLabel>How many questions ?</FormLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={count}
                        onChange={this.handleCountChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <Button variant="contained" disabled={this.state.start} onClick={this.handleSelectChange}>START</Button>
                </FormControl>

                {open ?
                    <Modal disableBackdropClick
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={this.handleModalClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            {step > 0 && step === equations.length
                                ? <div className={classes.paper}>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Equation</TableCell>
                                                    <TableCell align="right">Answer</TableCell>
                                                    <TableCell align="right">Student Answer</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {equations.map((row,index) => (
                                                    <TableRow key={index} style={row.correctAnswer === row.studentAnswer ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}>
                                                        <TableCell component="th" scope="row">
                                                            <div dangerouslySetInnerHTML={{ __html: `${row.equation}` }} />
                                                        </TableCell>
                                                        <TableCell align="right">{row.correctAnswer}</TableCell>
                                                        <TableCell align="right">{row.studentAnswer}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Button onClick={this.handleModalClose}>CLOSE</Button>
                                </div>
                                : <div className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Paper className={classes.paper}><div>{step + 1}/{equations.length}</div></Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Paper className={classes.paper}><h2 dangerouslySetInnerHTML={{ __html: `${equations[step].equation}` }}></h2></Paper>
                                        </Grid>
                                    </Grid>

                                    <Results/>
                                    <Calculator onClick={this.onClick} />
                                </div>}

                        </Fade>
                    </Modal> : null}
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CalculationConfig))
