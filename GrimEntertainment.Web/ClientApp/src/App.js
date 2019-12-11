import React, { Component } from 'react';
import { Route } from 'react-router';
import { AuthorizedRoute } from './components/AuthorizedRouter';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Register } from './components/auth/Register'
import { Login } from './components/auth/Login'
import { Logout } from './components/auth/Logout'
import { PublishGame } from './components/GameComponents/PublishGame'
import { Profile } from './components/Profile';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/logout' component={Logout} />
                <AuthorizedRoute path='/publishGame' component={PublishGame} />
                <AuthorizedRoute path='/profile' component={Profile} />
            </Layout>
        );
    }
}
