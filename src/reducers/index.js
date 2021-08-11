import { combineReducers } from 'redux';
import picturesReducer from './picturesReducer';
import picturesBoardReducer from './picturesBoardReducer';
import linesReducer from './linesReducer';

export default combineReducers({
    picturesData: picturesReducer,
    picturesBoardData: picturesBoardReducer,
    lines: linesReducer,
});
