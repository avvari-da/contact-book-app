import React from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Logo from '-!babel-loader!svg-react-loader!../_svg/logo.svg?name=Logo';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        const { user } = this.props;
        const isLoggedIn = user && user.id;
        return (
            <Navbar color="light" role="navigation" light expand="md">
                <NavbarBrand href="/" className="mr-auto">
                    <Logo className="App-logo" alt="logo" height="50px" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    {!isLoggedIn ?
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/register">Register</NavLink>
                        </NavItem>
                    </Nav>
                    :
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/my-contacts">My Contacts</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/add-contact">Add Contact</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/login">Logout</NavLink>
                        </NavItem>
                    </Nav>
                    }
                </Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };