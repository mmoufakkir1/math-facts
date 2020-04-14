import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

class Calculator extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {/* <button name="(" onClick={e => this.props.onClick(e.target.name)}>(</button>
                <button name="CE" onClick={e => this.props.onClick(e.target.name)}>CE</button>
                <button name=")" onClick={e => this.props.onClick(e.target.name)}>)</button>
                <button name="." onClick={e => this.props.onClick(e.target.name)}>.</button>*/}

                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button name="1" onClick={e => this.props.onClick(e.currentTarget.name)}>1</Button>
                    <Button name="2" onClick={e => this.props.onClick(e.currentTarget.name)}>2</Button>
                    <Button name="3" onClick={e => this.props.onClick(e.currentTarget.name)}>3</Button>
                    {/* <Button name="+" onClick={e => this.props.onClick(e.currentTarget.name)}>+</Button> */}
                </ButtonGroup>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button name="4" onClick={e => this.props.onClick(e.currentTarget.name)}>4</Button>
                    <Button name="5" onClick={e => this.props.onClick(e.currentTarget.name)}>5</Button>
                    <Button name="6" onClick={e => this.props.onClick(e.currentTarget.name)}>6</Button>
                    {/* <Button name="-" onClick={e => this.props.onClick(e.currentTarget.name)}>-</Button> */}
                </ButtonGroup>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button name="7" onClick={e => this.props.onClick(e.currentTarget.name)}>7</Button>
                    <Button name="8" onClick={e => this.props.onClick(e.currentTarget.name)}>8</Button>
                    <Button name="9" onClick={e => this.props.onClick(e.currentTarget.name)}>9</Button>
                    {/* <Button name="*" onClick={e => this.props.onClick(e.currentTarget.name)}>x</Button> */}

                </ButtonGroup>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button name="C" onClick={e => this.props.onClick(e.currentTarget.name)}>C</Button>
                    <Button name="0" onClick={e => this.props.onClick(e.currentTarget.name)}>0</Button>
                    <Button name="=" onClick={e => this.props.onClick(e.currentTarget.name)}>=</Button>
                    {/* <Button name="/" onClick={e => this.props.onClick(e.currentTarget.name)}>/</Button> */}
                </ButtonGroup>
            </div>
        );
    }
}


export default withStyles(styles)(Calculator); 