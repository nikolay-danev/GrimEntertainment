import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Decode } from '../components/JwtDecoder';

export class LoginMenu extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '' };
    }

    componentDidMount() {
        this.isUserLogged();
    }

    render() {
        let contents = this.state.username
            ? <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink tag={Link} to="/profile">Welcome, {this.state.username}!</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/logout">Logout</NavLink>
                </NavItem>
            </ul >
            :
            <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink tag={Link} to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/login">Login</NavLink>
                </NavItem> </ul >
            ;

        return (<div style={{ left: 350, position: "relative" }}>{contents}</div>);
    }

    isUserLogged = () => {
        let token = window.sessionStorage.getItem('authToken');

        if (token) {
            let jwtData = Decode(token);
            this.setState({ username: jwtData.username });
        }
    }
}