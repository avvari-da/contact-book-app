import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Container, Form, FormGroup, FormFeedback, Label, Input, ButtonGroup, Button, Alert } from 'reactstrap';

import {  contactActions } from '../_actions';
import { Header } from '../_components';

class AddContactPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: {
                id: null,
                firstname: '',
                lastname: '',
                email: ''
            },
            submitted: false,
            editContact: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const { match } = this.props;
        if (typeof match.params.id !== 'undefined') {
            const { user, dispatch } = this.props;
            this.state.editContact = true;
            dispatch(contactActions.getById(user.id, match.params.id));
        }
    }

    handleChange(event) {
        this.setState({ submitted: false });
        const { name, value } = event.target;
        const { contact } = this.state;
        this.setState({
            contact: {
                ...contact,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { contact, editContact } = this.state;
        const { user, dispatch } = this.props;
        if (contact.firstname && contact.lastname && contact.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contact.email)) {
            if (editContact) {
                let data_to_send = { id: contact.id, firstname: contact.firstname, lastname: contact.lastname, email: contact.email };
                dispatch(contactActions.update(user.id, contact.id, data_to_send));
            } else {
                let data_to_send = { firstname: contact.firstname, lastname: contact.lastname, email: contact.email };
                dispatch(contactActions.add(user.id, data_to_send));
            }
        }
    }

    componentDidUpdate() {
        const { contacts, match } = this.props;
        const { contact, editContact } = this.state;
        if (editContact && typeof contacts.contact != 'undefined' && (contact.id == null || match.params.id != contact.id)) {
            this.setState({
                contact: contacts.contact
            });
        }
    }

    render() {
        const { loading, alert } = this.props;
        const { editContact, contact, submitted } = this.state;
        let title = '';
        if (editContact) {
            title = "Edit Contact";
        } else {
            title = "Add Contact";
        }
        return (
            <DocumentTitle title={ title + " | Contact Book" } >
                <div>
                    <Header />
                    <Container className="min-80vh py-3">
                        <h1>{ title }</h1>
                        <Form name="form" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="firstname" className={(submitted && !contact.firstname ? 'has-error' : '')}>
                                    First Name
                                </Label>
                                <Input type="text" name="firstname" id="firstname" placeholder='eg. "John"' value={contact.firstname} invalid={(submitted && contact.firstname == '')} onChange={this.handleChange} />
                                <FormFeedback>Firstname is required</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastname" className={(submitted && !contact.lastname ? 'has-error' : '')}>
                                    Last Name
                                </Label>
                                <Input type="text" name="lastname" id="lastname" placeholder='eg. "Snow"' value={contact.lastname} invalid={(submitted && contact.lastname == '')} onChange={this.handleChange} />
                                <FormFeedback>Lastname is required</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email" className={(submitted && !contact.email ? 'has-error' : '')}>
                                    Email
                                </Label>
                                <Input type="email" name="email" id="email" placeholder='eg. "john.snow@got.com"' value={contact.email} invalid={(submitted && (contact.email == '' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contact.email)))} onChange={this.handleChange} />
                                <FormFeedback>Email is required / not valid</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <ButtonGroup>
                                    <Button color="success" disabled={ loading } style={{ width: '100px' }}>
                                        {
                                            loading
                                                ? <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                : editContact ? "Save" : "Submit"
                                        }
                                    </Button>
                                    <Button color="danger" tag={ Link } to="/my-contacts">Cancel</Button>
                                </ButtonGroup>
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
    const { alert, contacts, authentication } = state;
    const { user } = authentication;
    const { loading } = contacts;
    return {
        alert,
        loading,
        contacts,
        user
    };
}

const connectedAddContactPage = connect(mapStateToProps)(AddContactPage);
export { connectedAddContactPage as AddContactPage };