import React, { Component } from 'react';
import { Decode } from '../../components/JwtDecoder';
import { IsAuthenticated } from '../../Services/UserService';
import { AdditionalInformationPopUp } from './AdditionalInformationPopUp';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { likes: this.props.rating };
    }

    handleLike = (e) => {

        let url = ' /Game/Like/' + this.props.id;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            }
        });

        this.setState({ likes: this.state.likes + 1 });
    }

    render() {
        let buttons = null;
        let user = null;
        if (IsAuthenticated()) {
            user = Decode(sessionStorage.getItem('authToken'));
            buttons = <div>
                <a onClick={() => this.props.onEdit(this.props.id)} style={{ color: 'darkred' }} className="btn btn-warning">EDIT</a>
                <a onClick={() => this.props.onDelete(this.props.id)} style={{ marginLeft: 5 }} className="btn btn-danger deleteGame">DELETE</a>
            </div>
        }
        return (
            <div className="card eighteenRem" style={{ marginTop: '10px', marginBottom: '10px', border: '1px solid darkred' }}>
                <img src={this.props.bannerUrl} style={{ height: 285 }} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                </div>
                <div className="card-footer">
                    <small className="text-muted">By {this.props.publisher}</small>
                    <div className="cardOptions">
                        <a href={this.props.trailerUrl} target="_blank" rel="noopener noreferrer" title="Watch the trailer!"><i style={{ color: "darkred" }} className="fa fa-youtube-play" aria-hidden="true"></i></a>
                        <a onClick={this.handleLike} style={{ marginLeft: 10, color: 'darkred', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer" title="Give it a like!"><i style={{ color: "darkred" }} className="fa fa-heart" aria-hidden="true"></i>{this.state.likes}</a>
                        <AdditionalInformationPopUp downloadLink={this.props.downloadLink} description={this.props.description} />
                    </div>
                    {
                        user != null ? this.props.creatorId === user.id ? buttons : '' : ''
                    }
                </div>
            </div>);
    }
}

export default Game;