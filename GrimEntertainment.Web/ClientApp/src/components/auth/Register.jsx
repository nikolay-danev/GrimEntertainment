import React, { Component, Fragment } from 'react';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = { email: '', username: '', password: '', confirmPassword: '' };
    }

    handleFieldChange = (sender) => {
        this.setState({ [sender.target.name]: sender.target.value });
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        fetch('/Account/Register', {
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
        }).then(function(response) {
            if (response.status === 200) {
                window.location.href = '/login';
            }
        }).catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Fragment>
                <h1 className="pageTitle">Register account</h1>
                <hr/>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label className="control-label required">Email</label>
                        <input className="form-control" required type="email" value={this.state.email} onChange={this.handleFieldChange} name="email" />
                    </div>
                    <div className="form-group">
                        <label className="control-label required">Username</label>
                        <input className="form-control" required type="text" value={this.state.username} onChange={this.handleFieldChange} name="username" />
                    </div>
                    <div className="form-group">
                        <label className="control-label required">Password</label>
                        <input className="form-control" required type="password" value={this.state.password} onChange={this.handleFieldChange} name="password" />
                    </div>
                    <div className="form-group">
                        <label className="control-label required">Confirm Password</label>
                        <input className="form-control" required type="password" value={this.state.confirmPassword} onChange={this.handleFieldChange} name="confirmPassword" />
                    </div>
                    <button className="btn btn-primary" type="submit">Register</button>
                </form>
            </Fragment>
                        );
                }
}