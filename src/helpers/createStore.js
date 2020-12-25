import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default () => {
    return createStore(reducers, {}, applyMiddleware(thunk));
};
