import React, { Component } from 'react';
import _ from 'lodash';
import {
    withStyles, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, MenuItem, Select, Container
    , Button, Divider, Modal, Backdrop, Fade, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid,
    ButtonGroup, Box, IconButton, Slider
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { generateEquations } from '../global';
import GridContainer from "./Grid/GridContainer.js";
import './../styles/MathFacts.css'


const MAX_MINUTES = 2;
const MAX_SECONDS = 0;

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
    containerTable: {
        maxHeight: 440,
    },
    table: {
        background: '#D3D3D3'
    },
    overrides: {
        // Style sheet name ⚛️
        TableHead: {
            // Name of the rule
            background: '#D3D3D3',

        },
    },
});

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active, &$disabled': {
            boxShadow: 'inherit',
        },

    },
    disabled: {
        color: '#52af77',
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
        color: '#52af77',
    },
    rail: {
        height: 8,
        borderRadius: 4,
        color: '#FF0000',
    },
})(Slider);

class MathFacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            operation: 'subtract',
            count: 100,
            openModal: false,
            step: 0,
            operations: [],
            inputNumber: '',
            minutes: MAX_MINUTES,
            seconds: MAX_SECONDS
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(this.tick, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    tick = () => {
        const { seconds, minutes } = this.state

        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(this.myInterval)
            } else {
                this.setState(({ minutes }) => ({
                    minutes: minutes - 1,
                    seconds: 59
                }))
            }
        }
    }

    startCountDown = () => {
        this.myInterval = setInterval(this.tick, 1000);
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
            openModal: true,
            minutes: MAX_MINUTES,
            seconds: MAX_SECONDS
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
            count: 100,
            openModal: false,
            step: 0,
            operations: [],
            inputNumber: '',
            minutes: MAX_MINUTES,
            seconds: MAX_SECONDS
        })
        this.startCountDown();
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
            equations[step] = { ...equations[step], studentAnswer: value, status: equations[step].correctAnswer === value, answered: true }

            this.setState({
                operations: equations,
                inputNumber: value
            })

            if (equations.length !== step) {
                this.nextStep()
            }

            this.reset();
        } catch (e) {
            this.reset()
        }
    };


    showResults = () => {
        const { classes } = this.props;
        const { minutes, seconds, equations } = this.state;

        if (_.isEqual(minutes, 0) && _.isEqual(seconds, 0)) {

            var answeredEquations = _.filter(equations, function (item) { if (item.answered) return item });

            return <div className={classes.paper}>
                <Container align="center">
                    <p style={{ backgroundImage: 'linear-gradient(45deg, #b3e6ff 30%, #e6f7ff 90%)', padding: '16px' }}>
                        <span> &#128512; </span> Let's Review  <span> &#128512; </span> </p>
                    <PrettoSlider valueLabelDisplay="on" aria-label="pretto slider" defaultValue={answeredEquations.length} disabled />
                </Container>
                <TableContainer component={Paper} className={classes.containerTable} >
                    <Table size="small" stickyHeader aria-label="sticky table"  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Equation</TableCell>
                                <TableCell align="center">Student Answer</TableCell>
                                <TableCell align="center">Computer Answer</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {answeredEquations.map((row, index) => (
                                <TableRow key={index} className={row.correctAnswer === row.studentAnswer ? 'correct' : 'wrong'}>
                                    <TableCell component="th" scope="row" align="center" className='equations'>
                                        <div dangerouslySetInnerHTML={{ __html: `${row.equation}` }} />
                                    </TableCell>
                                    <TableCell align="center">{row.studentAnswer}</TableCell>
                                    <TableCell align="center">{row.correctAnswer}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <Container align="center">
                    <Button
                        classes={{
                            root: classes.rootClear, // class name, e.g. `classes-nesting-root-x`
                            label: classes.labelClear, // class name, e.g. `classes-nesting-label-x`
                        }} onClick={this.handleModalClose}>CLOSE</Button>
                </Container>
            </div>
        } else {
            return <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        }
    }


    showCalculator = () => {
        const { classes } = this.props;
        const { step, equations, inputNumber } = this.state;

        return <div className={classes.root}>
            <div>{step + 1} of {equations.length}</div>
            <div class='equation-display'><h2 dangerouslySetInnerHTML={{ __html: `${equations[step].equation}` }}></h2></div>
            <div class="calculator">
                <input type="number" readOnly style={{ padding: '20px' }}
                    value={inputNumber} onChange={() => { }} onKeyPress={this.handleKeyPad}
                    onKeyDown={this.handleBackspace} />

                <div class="calculator-buttons">
                    <Button name="1" class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>1</Button>
                    <Button name="2" class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>2</Button>
                    <Button name="3" class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>3</Button>
                    <Button name="C" class="calc-button is-clear" onClick={e => this.onClick(e.currentTarget.name)}>C</Button>

                    <Button name="4" class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>4</Button>
                    <Button name="5" class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>5</Button>
                    <Button name="6" class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>6</Button>

                    <Button name="7" class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>7</Button>
                    <Button name="8" class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>8</Button>
                    <Button name="9" class="calc-button" onClick={e => this.onClick(e.currentTarget.name)}>9</Button>

                    <Button name="=" class="calc-button is-equals" onClick={e => this.onClick(e.currentTarget.name)}>=</Button>
                    <Button name="0" class="calc-button is-zero" onClick={e => this.onClick(e.currentTarget.name)}> 0</Button>
                </div>
            </div></div>;

    }

    reset = () => {
        this.setState({
            inputNumber: ''
        })
    };

    handleKeyPad = (event) => {
        const { inputNumber } = this.state;

        let keyCode = event.which || event.keyCode || event.charCode;

        if (_.isEqual(keyCode, 8)) this.backspace();
        if (_.isEqual(keyCode, 13)) this.calculate();

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

    handleBackspace = (event) => {
        let keyCode = event.which || event.keyCode || event.charCode;
        if (_.isEqual(keyCode, 8)) this.backspace();
    }


    render() {
        const { classes } = this.props;
        const { minutes, seconds, operation, count, openModal, step, equations, inputNumber } = this.state;

        return (
            <Container>
                <Box p={2} />
                {/* configuration  */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose Math Operation</FormLabel>
                    <RadioGroup row aria-label="operation" name="mathOperation" value={operation} defaultValue="subtract" onChange={this.handleRadioChange}>
                        <FormControlLabel value="subtract" control={<Radio />} label="subtract" />
                        <FormControlLabel value="addition" control={<Radio />} label="addition" />
                        <FormControlLabel value="multiplication" control={<Radio />} label="multiplication" />
                        <FormControlLabel value="division" control={<Radio />} label="division" />
                    </RadioGroup>
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
                            <div className={classes.paperDisplay}>
                                <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleModalClose}>
                                    <CloseIcon />
                                </IconButton>
                                
                                    {this.showResults()}
                                    {(!_.isEqual(minutes, 0) || !_.isEqual(seconds, 0))
                                        ? this.showCalculator() : null}
                                </div> 
                        </Fade>
                    </Modal> : null}
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

