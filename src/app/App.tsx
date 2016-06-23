import * as React from 'react'
import { connect } from 'react-redux'
import * as Immutable from 'immutable'
import 'fetch-ie8'
import * as P from 'es6-promise'

require('../../stylesheets/app/App.scss')

interface Data {
    randomNews: {
        title?: string,
        detail?: string
    }
}

const Promise = P.polyfill();

let counter = 0;

const getData = (callback): () => Promise<void> => {
    return (): Promise<void> => {
        return fetch('/api/user/greet', { method: 'GET' })
            .then(
                (response: Response): any => {
                    if (response.ok && response.json && typeof response.json === 'function') {
                        return callback(response.json());
                    } else {
                        throw 'error fetch';
                    }
                }
            )
            .then(
                undefined, 
                (err: Error): any => {
                    callback({
                        randomNews: {
                            title: 'exciting news',
                            detail: ++counter
                        }
                    }); 
                }
            )
    }
}

const App = (props: { data: Data, getData: () => {} }): JSX.Element => {
    const data: Data = props.data;
    const news: { title?: string, detail?: string } = data.randomNews;
    const value: string = news ? news.title  + ': ' + news.detail : '';
    return  <div>
                <div key="0">
                    <a onClick={ props.getData }>click to get data from the api</a>
                </div>
                <div key="1">{ value }</div>
            </div>
};

const emptyObject: Immutable.Map<string, {}> = Immutable.fromJS({});

export default connect(
    (state: any): { data: any } => {
        const data: any = state.get('data');
        return {
            data: data && data.toJS() || emptyObject
        }
    },
    (dispatch: any, props: { action: { type: string }}) => {
        return {
            getData: getData((data): void => {
                return dispatch({
                    type: props.action.type,
                    data: data
                });
            })
        }
    }
)(App);