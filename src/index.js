import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "react-apollo";
import {BrowserRouter} from 'react-router-dom';
import history from './helpers/history';

const localGraphql = "http://localhost:7000/";
const client = new ApolloClient({
    uri:localGraphql
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter history={history}>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
document.getElementById('root'));
