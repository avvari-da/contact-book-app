import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import DocumentTitle from 'react-document-title';

import { Header } from '../_components';

class HomePage extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <DocumentTitle title={ "Welcome | Contact Book" }>
                <div>
                    <Header />
                    <Container className="min-80vh py-5 text-center">
                        <h1>Welcome, { user.name }!</h1>
                    </Container>
                </div>
            </DocumentTitle>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };