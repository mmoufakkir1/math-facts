import React, { Component } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { generateEquations } from '../global';


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
    },
    table: {
        minWidth: 650,
    },
});


class MathFacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start: false,
            operation: 'substract',
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
            start: false,
            operation: 'substract',
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

        if (button === "=" && inputNumber.length > 0) {
            this.calculate()
        }
        else {
            if (button * 1000 >= 0) {
                this.setState({ inputNumber: inputNumber + button })
            }
        }
    };

    calculate = () => {
        let { inputNumber, equations, step } = this.state;
        let value = (eval(inputNumber) || '') + '';
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
        if (keyCode >= 49 && keyCode <= 57) {
            // Numpad keys
            keyCode -= 48;
            const keyValue = String.fromCharCode(keyCode);
            if (/\+|-/.test(keyValue))
                event.preventDefault();
            this.setState({
                inputNumber: inputNumber + keyCode
            })
        }
        if (keyCode == 8) this.backspace();
        if (keyCode == 13) this.calculate();

    }

    render() {
        const { classes } = this.props;
        const { start, operation, count, openModal, step, equations, inputNumber } = this.state;

        return (
            <Container>
                {/* configuration  */}
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
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                    <Button variant="contained" disabled={start} onClick={this.handleSelectChange}>START</Button>
                </FormControl>
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
                                                {equations.map((row, index) => (
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
                                    <div className={classes.root}>
                                        <Container style={{ padding: '20px' }}>
                                            <Divider orientation="vertical" flexItem />
                                            <input type="text" value={inputNumber} onChange={()=>{}} onKeyPress={this.handleKeyPad} />
                                        </Container>
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
                                </div>}
                        </Fade>
                    </Modal>
                    : null}
            </Container>
        );
    }
}


export default withStyles(styles)(MathFacts);
