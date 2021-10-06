import { combineReducers } from 'redux';
import picturesReducer from './picturesReducer';
import boardReducer from './boardReducer';
import linesReducer from './linesReducer';
import editPanelReducer from './editPanelReducer';

export default combineReducers({
    picturesData: picturesReducer,
    boardData: boardReducer,
    lines: linesReducer,
    editPanel: editPanelReducer,
});
