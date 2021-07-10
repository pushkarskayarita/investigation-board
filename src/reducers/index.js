import { combineReducers } from 'redux';
import picturesReducer from './picturesReducer';
import picturesBoardReducer from './picturesBoardReducer';

export default combineReducers({
    picturesData: picturesReducer,
    picturesBoardData: picturesBoardReducer,
});
