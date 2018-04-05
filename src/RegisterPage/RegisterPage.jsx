import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Button, Alert, Container, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';

import { userActions } from '../_actions';
import { Header } from '../_components';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.name && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { alert, registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <DocumentTitle title="Register | Contact Book" >
                <div>
                    <Header />
                    <Container className="min-80vh py-3">
                        <h2>Register</h2>
                        <Form name="form" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input type="text" name="name" id="name" placeholder="Name" invalid={(submitted && user.name == '')} onChange={this.handleChange} />
                                <FormFeedback>name is required</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="Email" invalid={(submitted && user.email == '')} onChange={this.handleChange} />
                                <FormFeedback>Email is required</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" id="password" placeholder="Password" invalid={(submitted && user.password == '')} onChange={this.handleChange} />
                                <FormFeedback>Password is required</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" disabled={ registering } style={{ width: '100px' }}>
                                    {
                                        registering ?
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            : "Register"
                                    }
                                </Button>
                                <Button color="link" tag={Link} to="/login" >Login</Button>
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
    const { alert, registration } = state;
    const { registering } = registration;
    return {
        alert,
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };