import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from '../components/LoginMenu';
import { IsAuthenticated } from '../Services/UserService'
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

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
        let gamesButton = IsAuthenticated() ? <Navbar> <ul className="navbar-nav flex-grow">
            <NavItem>
                <NavLink tag={Link} className="grimText" to="/publishGame">publish game</NavLink>
            </NavItem>
        </ul></Navbar> : '';

        return (
            <header>
                <Navbar style={{ paddingTop: 0, paddingBottom: 0 }} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container style={{ marginLeft: 0 }}>
                        <NavbarBrand tag={Link} to="/" style={{ paddingTop: 0, paddingBottom: 0 }}><img src="/images/logo.png" style={{ width: 150 }}></img></NavbarBrand>
                        {gamesButton}
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <LoginMenu>
                            </LoginMenu>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
