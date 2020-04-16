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
                                    <h2>The goal: instant recall of addition, subtraction, multiplication and division facts</h2>
                                    <h4>
                                        What is 5+ 3? Did the number 8 pop into your head? It should. How about 6 X 7? Instant recall of math facts 
                                        is when we simply know the answer without having to count in our heads, count fingers or pursue other 
                                        strategies to reach the answer.

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
                                    <h2>The goal: instant recall of addition, subtraction, multiplication and division facts</h2>
                                    <h4>
                                        What is 5+ 3? Did the number 8 pop into your head? It should. How about 6 X 7? Instant recall of math facts
                                         is when we simply know the answer without having to count in our heads, count fingers or pursue other
                                          strategies to reach the answer.

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
                                    <h4>

                                        Recall of math facts correlates with success in math at school. Students who don’t have immediate recall of
                                         math facts spend much of their time on basic computations instead of learning higher order math skills. Sadly, the average Grade 5 student only knows 32% of his multiplication tables. Both the National Council of Teachers of Mathematics (NCTM) and the National Mathematics Advisory Panel urge that all students develop automatic recall of math facts.

                                        When to study math facts
                                        Students should begin to focus on developing instant recall of math facts only after they have a firm 
                                        understanding of the concepts of addition, subtraction, multiplication and division.

                                        Typically, students should strive to have instant recall of their addition and subtraction facts by the
                                         end of grade 2 and their multiplication and division facts by the end of grade 3; however, this can vary 
                                         for each child.  Fluency in math facts will help children gain confidence in math and excel in other areas
                                          of math.
                                    </h4>
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

