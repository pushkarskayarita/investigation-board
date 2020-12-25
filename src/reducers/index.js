import { combineReducers } from 'redux';
import filesReducer from './filesReducer';

export default combineReducers({
    files: filesReducer,
});
