import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import GridContainer from "./Grid/GridContainer.js";
import GridItem from "./Grid/GridItem.js";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    link: {
        margin: theme.spacing(1, 1.5),
    }
});


class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container align="center">
                    <div className={classes.section}>
                        <div className={classes.container}>
                            <GridContainer className={classes.textCenter} justify="center">
                                <GridItem xs={12} sm={12} md={8}>
                                    <h2>Instant recall of addition, subtraction, multiplication
                                        and division facts</h2>
                                    <h4> Our mission is to try getting students to recall math facts such
                                    as addition, subtraction, multiplication, and division. We believe
                                    nts should know all there math facts to be successful in their lives.
                                    What is 8 + 6? Did the number 14 crash into your head? It should of.
                                    How about 9 X 7? Instant recall of math facts
                                    is when we simply know the answer without having to count in our heads
                                    or writing it on paper count by using fingers or pursue other
                                    strategies to reach to the answer.

                                    </h4>
                                </GridItem>
                                <GridItem xs={12} sm={8} md={6}>
                                    <Link variant="button" color="textPrimary" href="/mathfacts" className={classes.link}>
                                        Let's practice
            </Link>
                                </GridItem>
                            </GridContainer>
                            <br />
                            <br />
                            <GridContainer className={classes.textCenter} justify="center">
                                <GridItem xs={12} sm={12} md={8}>
                                    <h2>  Study math facts</h2>
                                    <h4> When start using are website, they should start everyday learning how
                                    to master math facts that will be critical to their success.
                                    They will start to develop in their mind how math facts will
                                    help them gain confidence when it comes to math in are everyday life.
                                    Students are to begin focusing on developing instant
                                    recall skills on math facts daily after they have a firm
                                    understanding of the concepts of addition, subtraction,
                                    multiplication and division.
            </h4>
                                </GridItem>
                                <GridItem xs={12} sm={8} md={6}>
                                    <Link variant="button" color="textPrimary" href="/mathfacts" className={classes.link}>
                                        Let's practice
            </Link>
                                </GridItem>
                            </GridContainer>
                            <br />
                            <br />
                            <GridContainer className={classes.textCenter} justify="center">
                                <GridItem xs={12} sm={12} md={8}>
                                    <h2>Why are math facts so important?</h2>
                                    <h4>Math facts are important and critical to a students life cause it sets
                                    them up for success in the future in their lives, math facts are used
                                    everyday in are lives so its very critical for students to recall them.

                                    Recall of math facts correlates with success in math at school.
                                    Students who don’t have immediate recall of
                                    math facts or don't practice  math facts spend much of their
                                    time on basic computations instead of learning higher order
                                           math skills and properties. </h4>
                                </GridItem>
                                <GridItem xs={12} sm={8} md={6}>
                                    <Link variant="button" color="textPrimary" href="/mathfacts" className={classes.link}>
                                        Let's practice
            </Link>
                                </GridItem>
                            </GridContainer>
                            <div className={classes.textCenter + " " + classes.sharingArea}>
                                <GridContainer justify="center">
                                    <h3>Thank you for supporting us!</h3>
                                </GridContainer>
                            </div>
                        </div>
                    </div>

                </Container>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(Home);

