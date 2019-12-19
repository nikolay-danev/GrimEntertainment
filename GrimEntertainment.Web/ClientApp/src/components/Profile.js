import React, { Component } from 'react';
import Game from '../components/GameComponents/Game';
import { Decode } from '../components/JwtDecoder';
import { IsAuthenticated } from '../Services/UserService';
import { Fragment } from 'react';
import { Error } from '../components/Error';

export class Profile extends Component {
    static displayName = Profile.name;
    constructor(props) {
        super(props);
        this.state = { user: '', username: '', email: '', loading: true, errorMessage: ''  };
    }
    componentDidMount() {
        this.GetAllGames();
    }

    handleFieldChange = (sender) => {
        this.setState({ username: sender.target.value });
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        let data = { email: this.state.email, username: this.state.username };

        fetch('/Account/Update', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)
        }).then(async function (response) {
            if (response.status === 200) {
                window.location.href = '/profile';
            } else {
                let resData = await response.json();
                throw new Error(resData.errorMessage);
            }
        }).catch(error => {
            this.setState({ errorMessage: error.props });
        });
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
        let errorContent;
        if (this.state.errorMessage) {
            errorContent = <Error errorMessage={this.state.errorMessage} />;
        }
        return (
            <Fragment>
                {errorContent}
                <h1 className="pageTitle">Your data, {user.username}!</h1>
                <hr />
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label className="control-label">Email</label>
                        <input className="form-control" disabled type="email" value={this.state.email} name="email" />
                    </div>
                <div className="form-group">
                        <label className="control-label">Username</label>
                        <input className="form-control" type="text" value={this.state.username} onChange={this.handleFieldChange} name="username" />
                    </div>
                    <button className="btn btn-primary" type="submit">Update</button>
                </form>

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
            this.setState({ username: data.username })
            this.setState({ email: data.email })
        }
        else {
            if (response.status === 401) {
                this.setState({ user: {}, loading: false });
            }
        }
        }
    }
}