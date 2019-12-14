import React, { Component } from 'react';
import Game from '../components/GameComponents/Game';
import { Decode } from '../components/JwtDecoder';
import { IsAuthenticated } from '../Services/UserService';
import { Fragment } from 'react';
import { PublishGame } from 'react';

import { Error } from '../components/Error';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = { games: [], loading: true };
    }
    componentDidMount() {
        this.GetAllGames();
    }

    handleSearchText = (e) => {
        let value = e.target.value;
        if (value === '') {
            this.GetAllGames();
        }
        let filteredGames = this.state.games.filter(game => game.title.toLowerCase().includes(value.toLowerCase()));
        this.setState({ games: filteredGames });
    }

    handleDelete = itemId => {
        if (IsAuthenticated) {

            let user = Decode(sessionStorage.getItem('authToken'));
            const items = this.state.games.filter(item => item.id !== itemId);
            this.setState({ games: items });

            let data = {
                gameId: itemId,
                userId: user.id
            };

            fetch('/Games/Delete', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
                },
                body: JSON.stringify(data)
            }).then(async function (response) {
                let resData = await response.json();
                if (response.status === 200) {
                    console.log(response);
                } else {
                    throw new Error(resData.errorMessage);
                }
            }).catch(error => {
                this.setState({ errorMessage: error.props });
            });
        }
    };

    handleEdit = itemId => {
        if (IsAuthenticated) {
            window.location.href = "/game/edit/" + itemId;
        }
    };

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.games.map(game => {
                return (<Game key={game.id} {...game} onDelete={this.handleDelete} onEdit={this.handleEdit} />)
            });

        let videoStyle = {
            width: '100%',
            heigth: 'auto',
            position: "relative",
            zIndex: '-999',
            border: '3px solid darkred'
        }
        let hasUser = IsAuthenticated();
        let errorContent;
        if (this.state.errorMessage) {
            errorContent = <Error errorMessage={this.state.errorMessage} />;
        }
        return (
            <Fragment>
                {errorContent}
                <h1 className="pageTitle">welcome</h1>
                <hr />
                <video style={videoStyle} autoPlay loop>
                    <source src="//www.warmane.com/renders/darna.mp4" />
                    <source src="//www.warmane.com/renders/darna.webm" />
                </video>
                <hr />
                <input className="form-control" type="text" placeholder="Search games..." aria-label="Search" style={{ marginBottom: 15 }} onChange={this.handleSearchText} />
                {hasUser ? <div className="card-deck" style={{ overflowY: 'scroll', border: '2px solid darkred', width: '975px', left: '100px', height: '500px', position: 'relative', marginBottom: '15px' }}>
                    {contents}
                </div> : <h1 className="pageTitle">register to experience all games</h1>}
            </Fragment>
        );
    }

    async GetAllGames() {
        const response = await fetch('/Games');
        const data = await response.json();
        this.setState({ games: data, loading: false });
    }
}