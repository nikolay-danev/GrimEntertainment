import React, { Component, Fragment } from 'react';
import { Error } from '../Error';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { username: '', password: '', errorMessage: '' };
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
        }).then(async function (response) {
            let data = await response.json();
            if (response.status === 200) {
                window.sessionStorage.setItem("authToken", data.authToken);
                window.location.href = '/';
            } else {
                throw new Error(data.errorMessage);
            }
        }).catch(error => {
            this.setState({ errorMessage: error.props });
        });
    }

    render() {
        let errorContent;
        if (this.state.errorMessage) {
            errorContent = <Error errorMessage={this.state.errorMessage} />;
        }
        return (
            <Fragment>
                {errorContent}
                <h1 className="pageTitle">Login</h1>
                <hr/>
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