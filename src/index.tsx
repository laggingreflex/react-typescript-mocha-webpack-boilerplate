/// <reference path="../typings/index.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import * as Immutable from 'immutable';

import App from './app/App.tsx';

const actionType: string = 'RECEIVE_DATA';

const configureStore = (): any => {

    const initialState: Immutable.Map<{}, {}> = Immutable.Map();

    const store: any = createStore(
        (state: any, action: { type: string, data: any }) => {
            let nextState: any;
            state = state || Immutable.fromJS({});
            if (action.type === actionType) {
                nextState = state.merge({ 'data': action.data });
            } else {
                nextState = state;
            }
            return nextState;
        },
        initialState,
        applyMiddleware(
            // thunk allows to dispatch functions
            //thunk.default,
            // log previous state / dispatched action / next state
            createLogger()
        )
    );
    return store;
}

ReactDOM.render(
    <Provider store={ configureStore() }>
        <App action={{ type: actionType }} />
    </Provider>,
    document.getElementById('root')
)