import React, { Component, Fragment } from 'react';

export class PublishGame extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '', publisher: '', bannerUrl: null, trailerUrl: '', downloadLink: '', description: '' };
    }

    handleFieldChange = (sender) => {
        this.setState({ [sender.target.name]: sender.target.value });
    }

    handleFile = (sender) => {
        this.setState({ bannerUrl: sender.target.files[0] });
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('bannerUrl', this.state.bannerUrl);
        data.append('title', this.state.title);
        data.append('publisher', this.state.publisher);
        data.append('trailerUrl', this.state.trailerUrl);
        data.append('downloadLink', this.state.downloadLink);
        data.append('description', this.state.description);

        fetch('/Games/Publish', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            },
            body: data
        }).then(function(response) {
            if (response.status === 200) {
                window.location.href = '/';
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        return (
            <Fragment>
                <h1 className="pageTitle">Publish your game</h1>
                <hr/>
                <form onSubmit={this.onFormSubmit}>
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
                    <div className="image-container">
                        <label className="control-label">Banner</label>
                        <input className="form-control" type="file" onChange={this.handleFile} name="bannerUrl" />
                    </div>
                    <button className="btn btn-primary" type="submit">PUBLISH</button>
                </form>
            </Fragment>
        );
    }
}