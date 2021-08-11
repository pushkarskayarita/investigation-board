import {
    SET_START,
    SET_END,
    FINISH_DRAW,
    SAVE_LINE,
    SAVE_PIN,
    UPDATE_PIN_END,
    SET_DRAGGABLE_PIN,
} from '../actions/lines_actions';

const initialState = {
    startPoint: null,
    endPoint: null,
    draggablePin: null,
    drawing: false,
    pins: {},
    linesKeysMap: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_START:
            return {
                ...state,
                startPoint: action.payload,
                drawing: true,
            };
        case SET_END:
            return {
                ...state,
                endPoint: { ...state.endPoint, ...action.payload },
            };
        case FINISH_DRAW:
            return {
                ...state,
                drawing: false,
            };
        case SAVE_LINE:
            return {
                ...state,
                linesKeysMap: {
                    ...state.linesKeysMap,
                    [action.payload.id]: action.payload.coords,
                },
            };
        case UPDATE_PIN_END:
            return {
                ...state,
                pins: {
                    ...state.pins,
                    [action.payload.id]: action.payload.endCoords,
                },
            };
        case SAVE_PIN:
            return {
                ...state,
                pins: {
                    ...state.pins,
                    [action.payload.id]: action.payload.coords,
                },
            };
        case SET_DRAGGABLE_PIN:
            return {
                ...state,
                draggablePin: action.payload,
            };
        default:
            return state;
    }
};
