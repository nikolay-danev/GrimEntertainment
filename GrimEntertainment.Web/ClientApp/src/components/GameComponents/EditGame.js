import React, { Component, Fragment } from 'react';

import { Error } from '../Error';
export class EditGame extends Component {
    constructor(props) {
        super(props);

        this.state = { id: '', title: '', publisher: '', trailerUrl: '', downloadLink: '', description: '', staticGameTitle: '', errorMessage: '' };
    }

    handleFieldChange = (sender) => {
        this.setState({ [sender.target.name]: sender.target.value });
    }
    componentDidMount() {
        this.GetGame();
    }

    async GetGame() {
       const response = await fetch('/Game/Get/' + this.props.match.params.id, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            }
       });
        const data = await response.json();
        this.setState({ staticGameTitle: data.title, id: data.id, title: data.title, publisher: data.publisher, trailerUrl: data.trailerUrl, downloadLink: data.downloadLink, description: data.description });
    }
    onFormSubmit = (e) => {
        e.preventDefault();

        fetch('/Games/Edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            },
            body: JSON.stringify(this.state)
        }).then(async function (response) {
            let resData = await response.json();
            if (response.status === 200) {
                window.location.href = '/';
            } else {
                throw new Error(resData.errorMessage);
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
                <h1 className="pageTitle">Editing - {this.state.staticGameTitle}</h1>
                <hr />
                <form onSubmit={this.onFormSubmit}>
                    <input hidden name="id" value={this.state.id} />
                    <div className="form-group">
                        <label className="control-label required">Title</label>
                        <input className="form-control" required type="text" value={this.state.title} onChange={this.handleFieldChange} name="title" />
                    </div>
                    <div className="form-group">
                        <label className="control-label required">Publisher</label>
                        <input className="form-control" required type="text" value={this.state.publisher} onChange={this.handleFieldChange} name="publisher" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Video Trailer</label>
                        <input className="form-control" type="text" value={this.state.trailerUrl} onChange={this.handleFieldChange} name="trailerUrl" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Download Link</label>
                        <input className="form-control" type="text" value={this.state.downloadLink} onChange={this.handleFieldChange} name="downloadLink" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Description</label>
                        <textarea className="form-control" type="text" value={this.state.description} onChange={this.handleFieldChange} name="description"></textarea>
                    </div>
                    <button className="btn btn-primary" type="submit">EDIT</button>
                </form>
            </Fragment>
        );
    }
}