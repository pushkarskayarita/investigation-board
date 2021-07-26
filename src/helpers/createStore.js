import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';

const logger = createLogger();

export default () => {
    return createStore(reducers, {}, applyMiddleware(thunk, logger));
};
