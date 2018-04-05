import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from './_helpers';
import { App } from './App';

// setup fake backend
import { configureBackend } from './_helpers';
configureBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);