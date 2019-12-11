import React, { Component } from 'react';
import Game from '../components/GameComponents/Game';
import { Decode } from '../components/JwtDecoder';
import { IsAuthenticated } from '../Services/UserService';
import { Fragment } from 'react';

export class Profile extends Component {
    static displayName = Profile.name;
    constructor(props) {
        super(props);
        this.state = { user: '', loading: true };
    }
    componentDidMount() {
        this.GetAllGames();
    }

    render() {
        let hasUser = IsAuthenticated();
        let user;
        if (hasUser) {
            user = Decode(sessionStorage.getItem('authToken'));
        }
        let userContent = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.user;

       
        return (
            <Fragment>
                <h1 className="pageTitle">Your data, {user.username}!</h1>
                <hr />
                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input className="form-control" disabled type="email" value={userContent.email} name="email" />
                </div>
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input className="form-control" type="text" value={userContent.username} name="username" />
                </div>
            </Fragment>
        );
    }

    async GetAllGames() {
        let user;
        if (IsAuthenticated) {

            user = Decode(sessionStorage.getItem('authToken'));
            
            // Fetch user 
            let url = '/Account/User/' + user.id;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            this.setState({ user: data, loading: false });
        }
        else {
            if (response.status === 401) {
                this.setState({ user: {}, loading: false });
            }
        }
        }
    }
}