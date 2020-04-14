import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { updateOperationState, updateEquationCountState, updateEquationsState, updateModalEquationsState, updateResultState } from '../actions/main';
import InputLabel from '@material-ui/core/InputLabel';
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
    },table: {
        minWidth: 650,
      },
});
class CalculationConfig extends Component {
    state = {
        step: 0,
        inputNumber: 0
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step: step - 1
        })
    }

    handleClickOpen = () => {
        this.props.updateModalEquationsState(true);
    };

    handleClose = () => {
        this.props.updateModalEquationsState(false);
    };


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

            if (parseInt(button, 10)) {
                this.props.updateResultState(result + button)
            }
        }
    };

    calculate = () => {
        const {step } = this.state;
        let { result, equations } = this.props;
        let value =(eval(result) || "") + "";
        try {

            equations[step] = {...equations[step], studentAnswer:value}

            this.props.updateResultState(value)
            this.props.updateEquationsState(equations);
            if (equations.length === step) {
                this.handleClose()  
            } else { this.nextStep() }

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
    convertOperation = (value) => {
        let name;
        switch (value) {
            case 'substract':
                name = '-';
                break;
            case 'addiction':
                name = '+';
                break;
            case 'multiplication':
                name = '*';
                break;
            case 'division':
                name = '/';
                break;
        }
        return name;
    }

    handleCountChange = (event) => {
        this.props.updateEquationCountState(event.target.value)
    };

    handleChange = (event) => {
        this.props.updateOperationState(event.target.value);
    };

    handleSelectChange = () => {
        const { operation, count } = this.props;
        let eq = [];
        const op = this.convertOperation(operation);
        if (!_.isEmpty(operation) && count > 0) {
            for (let i = 0; i < count + 1; i++) {
                let max = 12
                let min = Math.floor(Math.random() * max);
                let b = Math.floor(Math.random() * (max - min + 1)) + min;
                eq.push({ equation: b + op + min, correctAnswer: (eval(b + op + min) || "") + "", studentAnswer: 0 });
            }
        }
        this.props.updateEquationsState(eq);
        this.props.updateModalEquationsState(true);
    };

    render() {
        const { step } = this.state;
        const { classes, operation, count, equations, open, result } = this.props;
        console.log('equations ' + JSON.stringify(equations))
        console.log('result ' + result)
        return (
            <Container>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose Math Operation</FormLabel>
                    <RadioGroup row aria-label="operation" name="mathOperation" value={operation} defaultValue="substract" onChange={this.handleChange}>
                        <FormControlLabel value="substract" control={<Radio />} label="substract" />
                        <FormControlLabel value="addiction" control={<Radio />} label="addiction" />
                        <FormControlLabel value="multiplication" control={<Radio />} label="multiplication" />
                        <FormControlLabel value="division" control={<Radio />} label="division" />
                    </RadioGroup>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">How many questions ?</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={count}
                        onChange={this.handleCountChange}
                    >
                        <MenuItem value={0}>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <Button variant="contained" onClick={this.handleSelectChange}>START</Button>
                </div>

                { step < equations.length ? 
                    <Modal disableBackdropClick
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >

                        <Fade in={open}>
                            <div className={classes.paper}>
                                <h2 id="simple-modal-title">{equations[step].equation}</h2>
                                 <Results result={result} />
                                <Calculator onClick={this.onClick} /> 
                            </div>
                        </Fade>
                    </Modal>:null} 
                    {step > 0 && step === equations.length 
                     ? <TableContainer component={Paper}>
                     <Table className={classes.table} size="small" aria-label="a dense table">
                       <TableHead>
                         <TableRow>
                           <TableCell>Equation</TableCell>
                           <TableCell align="right">Answer</TableCell>
                           <TableCell align="right">Student Answer</TableCell>
                         </TableRow>
                       </TableHead>
                       <TableBody>
                         {equations.map((row) => (
                           <TableRow key={row.equation} style={row.correctAnswer === row.studentAnswer ? {backgroundColor : 'green'} : {backgroundColor:'red'  }}>
                             <TableCell component="th" scope="row">
                               {row.equation}
                             </TableCell>
                             <TableCell align="right">{row.correctAnswer}</TableCell>
                             <TableCell align="right">{row.studentAnswer}</TableCell>
                           </TableRow>
                         ))}
                       </TableBody>
                     </Table>
                   </TableContainer> :null}

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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CalculationConfig))
