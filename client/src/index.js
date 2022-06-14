import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { usePromiseTracker } from "react-promise-tracker";

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';


const store = createStore(reducers, compose(applyMiddleware(thunk)));

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && (<h1>Hey some async call in progress ! </h1>)
    );
}

ReactDOM.render(
    <Provider store={store}>
        <App />
        <LoadingIndicator />
    </Provider>,
    document.getElementById('root')
);
