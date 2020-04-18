import React from 'react';
import { TextField, Container, Button, withStyles } from '@material-ui/core';
import GridContainer from "./Grid/GridContainer.js";
import GridItem from "./Grid/GridItem.js";
import axios from "axios";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            status: ""
        };
    }

    handleServerResponse = (ok, msg, form) => {
        this.setState({
            submitting: false,
            status: { ok, msg }
        });
        if (ok) {
            form.reset();
        }
    };

    handleOnSubmit = e => {
        e.preventDefault();
        const form = e.target;
        this.setState({ submitting: true });
        axios({
            method: "post",
            url: "https://formspree.io/xyydqkwj",
            data: new FormData(form)
        })
            .then(r => {
                this.handleServerResponse(true, "Thanks!", form);
            })
            .catch(r => {
                this.handleServerResponse(false, r.response.data.error, form);
            });
    };

    render() {
        const { classes } = this.props;
        const { status, submitting } = this.state;
        return (

            <Container align="center">
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
                </GridContainer>
                <div>
                    <h1>Contact Us</h1>
                    <form className={classes.root} onSubmit={this.handleOnSubmit}>
                        <TextField id="email" label="Email" type="email" name="email" required />
                        <TextField
                            id="message"
                            label="Message"
                            name="message"
                            multiline
                            required
                            rows={4}
                        />
                        <Button type="submit" disabled={submitting}>
                            Submit
                    </Button>
                        {status && (
                            <p className={!status.ok ? "errorMsg" : ""}>
                                {status.msg}
                            </p>
                        )}
                    </form>
                </div>
            </Container>
        );
    };
}

export default withStyles(styles)(About);


