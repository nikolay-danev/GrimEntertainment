import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom'

export const AuthorizedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        sessionStorage.getItem('authToken')
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)