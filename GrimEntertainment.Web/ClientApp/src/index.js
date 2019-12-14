import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
    // you can also just use 'bottom center'
    position: positions.MIDDLE,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
    containerStyle: {
        zIndex: 100,
        color: 'red'
    }
}
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <AlertProvider template={AlertTemplate} {...options}>
            <App />
        </AlertProvider>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

