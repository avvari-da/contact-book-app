import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

import { history } from '../_helpers';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ContactsPage } from '../ContactsPage';
import { ContactPage } from '../ContactPage';
import { AddContactPage } from '../AddContactPage';
import { alertActions } from '../_actions';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
    render() {
        return (
            <DocumentTitle title={ "Contact Book" }>
                <div className="container-fluid">
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={ HomePage } />
                            <Route path="/login" component={ LoginPage } />
                            <Route path="/register" component={ RegisterPage } />
                            <PrivateRoute exact path="/my-contacts" component={ ContactsPage } />
                            <PrivateRoute exact path="/my-contacts/:id" component={ ContactPage } />
                            <PrivateRoute path="/my-contacts/:id/edit" component={ AddContactPage } />
                            <PrivateRoute path="/add-contact" component={ AddContactPage } />
                        </div>
                    </Router>
                </div>
            </DocumentTitle>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 