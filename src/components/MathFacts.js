import React, { Component } from 'react';
import _ from 'lodash';
import {
    withStyles, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, MenuItem, Select, Container
    , Button, Divider, Modal, Backdrop, Fade, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid,
    ButtonGroup, Box, IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { generateEquations } from '../global';
import GridContainer from "./Grid/GridContainer.js";
import './../styles/MathFacts.css'


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
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperDisplay: {
        background: 'linear-gradient(45deg, #b3e6ff 30%, #e6f7ff 90%)',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    closeButton: {
        position: 'relative',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        float: 'right',
    },
    table: {
        minWidth: 650,
    },
    root1: {
        background: 'linear-gradient(45deg, #ff66cc 30%, #ffb3e6 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label1: {
        textTransform: 'capitalize',
    },
    rootClear: {
        background: 'linear-gradient(45deg, #ff66cc 30%, #ffb3e6 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    labelClear: {
        textTransform: 'capitalize',
    },
});


class MathFacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            operation: 'subtract',
            count: 10,
            openModal: false,
            step: 0,
            operations: [],
            inputNumber: ''
        }
    }
    // Calculation Config functions
    handleRadioChange = (event) => {
        this.setState({
            operation: event.target.value
        })
    };

    handleSelectChange = () => {
        const { operation, count } = this.state;
        this.setState({
            equations: generateEquations(operation, count),
            openModal: true

        })
    };

    handleCountChange = (event) => {
        this.setState({
            count: event.target.value
        })
    };
    // modal functions

    handleModalOpen = () => {
        this.setState({
            openModal: true
        })
    };

    handleModalClose = () => {
        this.setState({
            operation: 'subtract',
            count: 10,
            openModal: false,
            step: 0,
            operations: [],
            inputNumber: ''
        })
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    // calcualtor functions
    backspace = () => {
        let { inputNumber } = this.state;
        this.setState({ inputNumber: inputNumber.slice(0, -1) })
    };

    onClick = button => {
        let { inputNumber } = this.state;
console.log('button ' + button)
        if (button === "=" && inputNumber.length > 0) {
            this.calculate()
        } else if (button === "C") {
            this.backspace()
        }
        else {
            if (button * 1000 >= 0) {
                this.setState({ inputNumber: inputNumber + button })
            }
        }
    };

    calculate = () => {
        let { inputNumber, equations, step } = this.state;
        let value = (parseInt(inputNumber) || 0) + 0;
        try {

            equations[step] = { ...equations[step], studentAnswer: value }

            this.setState({
                operations: equations,
                inputNumber: value
            })

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
        this.setState({
            inputNumber: ''
        })
    };

    handleKeyPad = (event) => {
        const { inputNumber } = this.state;

        let keyCode = event.which || event.keyCode || event.charCode;
   
        if (_.isEqual(keyCode , 8)) this.backspace();
        if (_.isEqual(keyCode , 13)) this.calculate();

        if (keyCode >= 48 && keyCode <= 57) {
            // Numpad keys
            keyCode -= 48;
            const keyValue = String.fromCharCode(keyCode);
            if (/\+|-/.test(keyValue))
                event.preventDefault();

                this.setState({
                    inputNumber: inputNumber + keyCode
                })
        }   
    }
    handleBackspace= (event) => {

        let keyCode = event.which || event.keyCode || event.charCode;
   
        if (_.isEqual(keyCode , 8)) this.backspace();

       
    }

    render() {
        const { classes } = this.props;
        const {  operation, count, openModal, step, equations, inputNumber } = this.state;

        return (
            <Container>
                {/* configuration  */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose Math Operation</FormLabel>
                    <RadioGroup row aria-label="operation" name="mathOperation" value={operation} defaultValue="subtract" onChange={this.handleRadioChange}>
                        <FormControlLabel value="subtract" control={<Radio />} label="subtract" />
                        <FormControlLabel value="addition" control={<Radio />} label="addition" />
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
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                    <br />
                    <br />
                    <Button variant="outlined"
                        classes={{
                            root: classes.root1,
                            label: classes.label1,
                        }}
                        onClick={this.handleSelectChange}>
                        START
                                </Button>
                    <br />
                    <br />
                </FormControl>
                <br />
                <br />
                {/* Modal setup */}
                {openModal ?
                    <Modal disableBackdropClick
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openModal}
                        onClose={this.handleModalClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openModal}>
                            {step > 0 && step === equations.length
                                ? <div className={classes.paper}>
                                    <TableContainer component={Paper} >
                                        <Table className={classes.table} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Equation</TableCell>
                                                    <TableCell align="right">Student Answer</TableCell>
                                                    <TableCell align="right">Answer</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {equations.map((row, index) => (
                                                    <TableRow key={index} style={row.correctAnswer === row.studentAnswer ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}>
                                                        <TableCell component="th" scope="row">
                                                            <div dangerouslySetInnerHTML={{ __html: `${row.equation}` }} />
                                                        </TableCell>
                                                        <TableCell align="right">{row.studentAnswer}</TableCell>
                                                        <TableCell align="right">{row.correctAnswer}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Button onClick={this.handleModalClose}>CLOSE</Button>
                                </div>
                                : <div className={classes.paperDisplay}>
                                    <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleModalClose}>
                                        <CloseIcon />
                                    </IconButton>
                                    <div className={classes.root}>

                                        <div>{step + 1}/{equations.length}</div>

                                        <div><h2 dangerouslySetInnerHTML={{ __html: `${equations[step].equation}` }}></h2></div>
                                        <div class="calculator">
                                            <input type="number" readonly style={{ padding: '20px' }} 
                                            value={inputNumber} onChange={() => { }} onKeyPress={this.handleKeyPad}
                                            onKeyDown={this.handleBackspace} />

                                            <div class="calculator-buttons">
                                                <Button name="1" Class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>1</Button>
                                                <Button name="2" Class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>2</Button>
                                                <Button name="3" Class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>3</Button>
                                                <Button name="C" Class="calc-button is-clear" onClick={e => this.onClick(e.currentTarget.name)}>C</Button>

                                                <Button name="4" Class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>4</Button>
                                                <Button name="5" Class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>5</Button>
                                                <Button name="6" Class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>6</Button>

                                                <Button name="7" Class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>7</Button>
                                                <Button name="8" Class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>8</Button>
                                                <Button name="9" Class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>9</Button>

                                                <Button name="=" Class="calc-button is-equals" onClick={e => this.onClick(e.currentTarget.name)}>=</Button>
                                                <Button name="0" Class="calc-button is-zero" onClick={e => this.onClick(e.currentTarget.name)}> 0</Button>
                                            </div>

                                        </div>
                                    </div>
                                </div>}
                        </Fade>
                    </Modal>
                    : null}
                <div>
                    <GridContainer justify="center">
                        <h3>Thank you for supporting us!</h3>
                    </GridContainer>
                </div>

            </Container>

        );
    }
}


export default withStyles(styles)(MathFacts);

