import {
    ADD_LINK,
    DONE_EDITING,
    SET_DELETE_CONNECTION_MODE,
} from '../actions/edit_panel_actions';
import { DELETE_RELATED_PINS } from '../actions/lines_actions';

const initialState = {
    pinMode: false,
    isEditing: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_LINK:
            return {
                ...state,
                pinMode: true,
                isEditing: true,
            };
        case SET_DELETE_CONNECTION_MODE:
            return {
                ...state,
                pinMode: true,
                isEditing: true,
            };
        case DONE_EDITING:
            return {
                ...state,
                isEditing: false,
                pinMode: false,
            };
        case DELETE_RELATED_PINS:
            return {
                ...state,
                isEditing: false,
                pinMode: false,
            };
        default:
            return state;
    }
};
