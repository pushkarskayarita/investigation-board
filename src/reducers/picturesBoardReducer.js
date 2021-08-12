import {
    ADD_ELEMENT_TO_BOARD,
    DELETE_ELEMENT_FROM_BOARD,
    SELECT_ELEMENT,
} from '../actions/drag_and_drop_actios';

const initialState = {
    picturesBoard: [],
    templatesBoard: [],
    activeElement: null,
    pinMode: false,
    isEditing: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ELEMENT_TO_BOARD:
            return {
                ...state,
                [action.payload.list]: [
                    ...state[action.payload.list],
                    action.payload,
                ],
                isEditing: false,
                pinMode: false,
            };
        case DELETE_ELEMENT_FROM_BOARD:
            return {
                ...state,
                [action.payload.list]: state[action.payload.list].filter(
                    (elem) => elem.id !== action.payload.id
                ),
            };

        case SELECT_ELEMENT:
            return {
                ...state,
                activeElement: action.payload,
            };

        default:
            return state;
    }
};
