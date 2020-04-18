import React, { Component } from 'react';
import {Container, Button,withStyles } from '@material-ui/core';
import GridContainer from "./Grid/GridContainer.js";
import GridItem from "./Grid/GridItem.js";

const styles = theme => ({
    link: {
        margin: theme.spacing(1, 1.5),
    },
    root1: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
          },
      },
      label1: {
        textTransform: 'capitalize',
      },
    root2: {
        background: 'linear-gradient(45deg, #00ff00 30%, #99ff99 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
      label2: {
        textTransform: 'capitalize',
      },
      root3: {
        background: 'linear-gradient(45deg, #ffff00 30%, #ffff99 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
      label3: {
        textTransform: 'capitalize',
      },
});


class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container align="center">
                    <div>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <h2>Instant recall of facts</h2>
                                <h4> Our mission is to try to get anyone to recall math facts such
                                as addition, subtraction, multiplication, and division. We believe
                                recall all math facts allow student to be successful in their lives.
                                Instant recall of math facts is when anyone know answer without having to count in their heads
                                or writing it on paper or count by using fingers or pursue other
                                way to reach to the answer.
                                    </h4>
                            </GridItem>
                            <GridItem xs={12} sm={8} md={6}>
                                <Button variant="outlined"
                                    classes={{
                                        root: classes.root1, // class name, e.g. `classes-nesting-root-x`
                                        label: classes.label1, // class name, e.g. `classes-nesting-label-x`
                                      }}
                                    href="/mathfacts">
                                    Let's practice
                                </Button>
                            </GridItem>
                        </GridContainer>
                        <br />
                        <br />
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <h2>  Study math facts</h2>
                                <h4> When you start using our website and everyday practicing how
                                to master math facts will be critical to anyone success.
                                staring to develop in the mind how math facts will
                                help gain the math skills that can used in everyday life.
                                </h4>
                            </GridItem>
                            <GridItem xs={12} sm={8} md={6}>
                            <Button variant="outlined"
                                    classes={{
                                        root: classes.root2, // class name, e.g. `classes-nesting-root-x`
                                        label: classes.label2, // class name, e.g. `classes-nesting-label-x`
                                      }}
                                    href="/mathfacts">
                                    Let's practice
                                </Button>
                            </GridItem>
                        </GridContainer>
                        <br />
                        <br />
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <h2>Why math facts so important?</h2>
                                <h4>Math facts are important and critical to a students life cause it sets
                                them up for success in the future in their lives, math facts are used
                                everyday in our lives so its very critical for students to recall them. </h4>
                            </GridItem>
                            <GridItem xs={12} sm={8} md={6}>
                            <Button variant="outlined"
                                    classes={{
                                        root: classes.root3, // class name, e.g. `classes-nesting-root-x`
                                        label: classes.label3, // class name, e.g. `classes-nesting-label-x`
                                      }}
                                    href="/mathfacts">
                                    Let's practice
                                </Button>
                            </GridItem>
                        </GridContainer>
                        <div>
                            <GridContainer justify="center">
                                <h3>Thank you for supporting us!</h3>
                            </GridContainer>
                        </div>
                    </div>

                </Container>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(Home);

