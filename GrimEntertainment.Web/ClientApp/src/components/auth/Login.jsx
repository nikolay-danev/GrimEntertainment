import React, { Component, Fragment } from 'react';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { username: '', password: '' };
    }

    handleFieldChange = (sender) => {
        this.setState({ [sender.target.name]: sender.target.value });
    }

    componentWillMount() {
        if (sessionStorage.getItem('authToken')) {
            window.location.href = '/';
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        if (sessionStorage.getItem('authToken')) {
            window.location.href = '/';
        }
        fetch('/Account/Login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(this.state)
        }).then(async function(response) {
            if (response.status === 200) {
                var data = await response.json();
                window.sessionStorage.setItem("authToken", data.authToken);
                window.location.href = '/';
            }
        }).catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Fragment>
                <h1>Login</h1>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label className="control-label required">Username</label>
                        <input className="form-control" required type="text" value={this.state.username} onChange={this.handleFieldChange} name="username" />
                    </div>
                    <div className="form-group">
                        <label className="control-label required">Password</label>
                        <input className="form-control" required type="password" value={this.state.password} onChange={this.handleFieldChange} name="password" />
                    </div>
                    <button className="btn btn-primary" type="submit">Login</button>
                </form>
            </Fragment>
        );
    }
}