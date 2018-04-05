import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Container, ButtonGroup, Button } from 'reactstrap';

import { contactActions } from '../_actions';
import { Header } from '../_components';
import ContactIcon from '-!babel-loader!svg-react-loader!../_svg/contact-icon.svg?name=ContactIcon';
import EmailIcon from '-!babel-loader!svg-react-loader!../_svg/email-icon.svg?name=EmailIcon';

import './ContactPage.css';

class ContactPage extends React.Component {
    constructor(props) {
        super(props);

        const { user, dispatch, match } = this.props;
        dispatch(contactActions.getById(user.id, match.params.id));
    }

    handleDelete(id) {
        const { user, dispatch } = this.props;
        return (e) => dispatch(contactActions.delete(user.id, id));
    }

    render() {
        const { contacts } = this.props;
        let title = "Contact Book";
        if (!contacts.loading && typeof contacts.contact !== 'undefined') {
            title = contacts.contact.firstname + " " +  contacts.contact.lastname + " | " + title
        }
        return (
            <DocumentTitle title={ title }>
                <div>
                    <Header />
                    <Container className="min-80vh py-3">
                        {contacts.loading && <em>Loading contact..</em>}
                        {contacts.error && <span className="text-danger">ERROR: {contacts.error}</span>}
                        {
                            contacts.contact
                                ?
                                <div className="contact-item">
                                    <div className="contact-image">
                                        <ContactIcon alt="Contact Image" width="100%" height="100%" />
                                    </div>
                                    <div className="contact-details">
                                        <h1>{ contacts.contact.firstname } { contacts.contact.lastname }</h1>
                                        <p>
                                            <EmailIcon alt="Email Icon" width="30px" />{' '}
                                            <span style={{position: 'relative', top: '-10px'}}>{ contacts.contact.email }</span>
                                        </p>
                                    </div>
                                    <ButtonGroup>
                                        <Button tag={Link} to={"/my-contacts/" + contacts.contact.id + "/edit"} color="primary">
                                            Edit
                                        </Button>
                                        <Button color="danger" onClick={this.handleDelete(contacts.contact.id)}>Delete</Button>
                                    </ButtonGroup>
                                </div>
                                : ''
                        }
                    </Container>
                </div>
            </DocumentTitle>
        );
    }
}

function mapStateToProps(state) {
    const { contacts, authentication } = state;
    const { user } = authentication;
    return {
        user,
        contacts
    };
}

const connectedContactPage = connect(mapStateToProps)(ContactPage);
export { connectedContactPage as ContactPage };