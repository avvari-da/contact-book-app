import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Button, Alert, Container, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';

import { userActions } from '../_actions';
import { Header } from '../_components';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;

        dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    render() {
        const { alert, loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <DocumentTitle title="Login | Contact Book">
                <div>
                    <Header />
                    <Container className="min-80vh py-3">
                        <h1>Login</h1>
                        <Form name="form" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="Email" invalid={(submitted && email == '')} onChange={this.handleChange} />
                                <FormFeedback>Email is required</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" id="password" placeholder="Password" invalid={(submitted && password == '')} onChange={this.handleChange} />
                                <FormFeedback>Password is required</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" disabled={ loggingIn } style={{ width: '100px' }}>
                                {
                                    loggingIn ?
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        : "Login"
                                }
                                </Button>
                                <Button color="link" tag={Link} to="/register" >Register</Button>
                            </FormGroup>
                        </Form>
                        {alert.message &&
                        <Alert color={alert.type}>
                            {alert.message}
                        </Alert>
                        }
                    </Container>
                </div>
            </DocumentTitle>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    const { loggingIn } = authentication;
    return {
        alert,
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 