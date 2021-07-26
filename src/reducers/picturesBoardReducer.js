import {
    ADD_ELEMENT_TO_BOARD,
    DELETE_ELEMENT_FROM_BOARD,
} from '../actions/drag_and_drop_actios';

const initialState = {
    picturesBoard: [],
    templatesBoard: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ELEMENT_TO_BOARD:
            console.log('payload list', action.payload.list);
            return {
                ...state,
                [action.payload.list]: [
                    ...state[action.payload.list],
                    action.payload,
                ],
            };
        case DELETE_ELEMENT_FROM_BOARD:
            return {
                ...state,
                [action.payload.list]: state[action.payload.list].filter(
                    (elem) => elem.id !== action.payload.id
                ),
            };
        default:
            return state;
    }
};
