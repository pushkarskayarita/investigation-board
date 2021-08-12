import { ADD_CONNECTION, DONE_EDITING } from '../actions/edit_panel_actions';

const initialState = {
    pinMode: false,
    isEditing: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONNECTION:
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
        default:
            return state;
    }
};
