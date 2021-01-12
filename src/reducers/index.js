import { combineReducers } from 'redux';
import picturesReducer from './picturesReducer';

export default combineReducers({
    picturesData: picturesReducer,
});
