import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = { games: [], loading: true };
    }
    componentDidMount() {
        this.GetAllGames();
    }

    static renderGamesTable(games) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game =>
                        <tr key={game.title}>
                            <td>{game.title}</td>
                            <td>{game.publisher}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderGamesTable(this.state.games);

        return (
            <div>
                <h1 id="tabelLabel" >Games</h1>
                {contents}
            </div>
        );
    }

    async GetAllGames() {
        const response = await fetch('/Games');
        const data = await response.json();
        this.setState({ games: data, loading: false });
    }
}
