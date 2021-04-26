import React, {Component} from 'react';
import {Button, Form, Grid, Header, Icon, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {_firebase} from "../../config/firebase";


class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const createdUser = await _firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
            console.log(createdUser)
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        const {username, email, password, passwordConfirmation} = this.state

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for DevChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="username"
                                value={username}
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={this.handleChange}
                                type="text"
                            />

                            <Form.Input
                                fluid
                                name="email"
                                value={email}
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                onChange={this.handleChange}
                                type="email"
                            />

                            <Form.Input
                                fluid
                                name="password"
                                value={password}
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={this.handleChange}
                                type="password"
                            />

                            <Form.Input
                                fluid
                                name="passwordConfirmation"
                                value={passwordConfirmation}
                                icon="repeat"
                                iconPosition="left"
                                placeholder="Password Confirmation"
                                onChange={this.handleChange}
                                type="password"
                            />

                            <Button color="orange" fluid size="large">
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already a user? <Link to="/login">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;
