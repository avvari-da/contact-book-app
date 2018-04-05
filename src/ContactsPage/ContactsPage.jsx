import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Container, Input, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { contactActions } from '../_actions';
import { Header } from '../_components';

import './ContactsPage.css';

class ContactsPage extends React.Component {
    constructor(props) {
        super(props);

        const { user, dispatch } = this.props;
        dispatch(contactActions.getAll(user.id));

        this.state = {
            search_query: ''
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.generatePaginationLinks = this.generatePaginationLinks.bind(this);
    }

    handleSearch(e) {
        const { value } = e.target;
        const { user, dispatch } = this.props;
        this.setState({
            search_query: value
        });
        dispatch(contactActions.search(user.id, value, 1));
    }

    handlePaginationClick(page) {
        const { user, dispatch } = this.props;
        dispatch(contactActions.search(user.id, this.state.search_query, page));
    }

    generatePaginationLinks(page, total_pages) {
        let pagination = [];
        pagination.push(
            <PaginationItem disabled={ page <= 1 }>
                <PaginationLink previous href="#" onClick={ (e) => { e.preventDefault(); this.handlePaginationClick(page - 1); } } />
            </PaginationItem>
        );
        let pages = [(page - 1), page, (page + 1)];
        if (pages[0] < 1) {
            pages = [];
            for (let i = 1; i <= Math.min(3, total_pages); i++) {
                pages.push(i);
            }
        } else if (pages[2] > total_pages) {
            pages = [];
            for (let i = 1; i <= Math.min(3, total_pages); i++) {
                pages.push(total_pages - i + 1);
            }
            pages.reverse();
        }
        pages.map((p) => {
            pagination.push(
                <PaginationItem active={ page == p }>
                    <PaginationLink href="#" onClick={ (e) => { e.preventDefault(); (page == p) ? null : this.handlePaginationClick(p); } }>
                        { p }
                    </PaginationLink>
                </PaginationItem>
            );
        });
        pagination.push(
            <PaginationItem disabled={ page >= total_pages }>
                <PaginationLink next href="#" onClick={ (e) => { e.preventDefault(); this.handlePaginationClick(page + 1); } } />
            </PaginationItem>
        );
        return pagination;
    }

    render() {
        const { contacts } = this.props;
        return (
            <DocumentTitle title={"My Contacts | Contact Book"}>
                <div>
                    <Header />
                    <Container className="min-80vh py-3">
                        <h1>My Contacts</h1>
                        <Input className="my-1" placeholder="Search Contacts" name="search" onChange={ this.handleSearch } />
                        {contacts.loading && <em>Loading contacts..</em>}
                        {contacts.error && <span className="text-danger">ERROR: {contacts.error}</span>}
                        {(contacts.contacts && contacts.contacts.length) ?
                        <Container className="contacts-list">
                            {contacts.contacts.map((contact) =>
                                <Row key={contact.id}>
                                    <Col className="py-2 border-bottom">
                                        <Link to={ "/my-contacts/" + contact.id }>
                                            <strong>{ contact.firstname }</strong>{ ' ' }
                                            { contact.lastname }
                                        </Link>
                                    </Col>
                                </Row>
                            )}
                            <Row>
                                <Col className="mt-5">
                                    <Pagination size="sm">
                                        { this.generatePaginationLinks(contacts.page, contacts.total_pages) }
                                    </Pagination>
                                </Col>
                            </Row>
                        </Container>
                        : <div className="py-3 text-center text-info">You don't have any contacts</div>
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

const connectedContactsPage = connect(mapStateToProps)(ContactsPage);
export { connectedContactsPage as ContactsPage };