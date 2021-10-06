import {
    SET_START,
    SET_END,
    FINISH_DRAW,
    SAVE_PIN,
    UPDATE_PIN_END,
    UPDATE_PIN_POSITION,
    DELETE_RELATED_PINS,
    SET_DRAWING_PIN,
    SAVE_LINE,
} from '../actions/lines_actions';
import {
    DELETE_ELEMENT_FROM_BOARD,
    SELECT_ELEMENT,
} from '../actions/board_actios';

const initialState = {
    startPoint: null,
    endPoint: null,
    draggablePin: null,
    drawing: false,
    pins: {},
    linesKeysMap: {},
    selectedLine: null,
    // selectedPins: [],
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

        case UPDATE_PIN_POSITION:
            return {
                ...state,
                pins: {
                    ...state.pins,
                    [action.payload.id]: action.payload.coords,
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
        case DELETE_RELATED_PINS: {
            const filteresIds = Object.keys(state.pins).filter((pin) => {
                return (
                    pin === state.linesKeysMap[action.payload].start ||
                    pin === state.linesKeysMap[action.payload].end
                );
            });
            const {
                [filteresIds[0]]: foo,
                [filteresIds[1]]: bar,
                ...updatedPins
            } = state.pins;
            return {
                ...state,
                pins: updatedPins,
            };
        }
        case SET_DRAWING_PIN:
            return {
                ...state,
                draggablePin: action.payload,
            };
        case SELECT_ELEMENT:
            if (action.payload.list === 'lines')
                return {
                    ...state,
                    selectedLine: action.payload.id,
                };

            return {
                ...state,
                selectedLine: null,
            };
        case DELETE_ELEMENT_FROM_BOARD: {
            const id = state.selectedLine;
            const {
                [id]: anyshit,
                ...updatedLinesKeysMap
            } = state.linesKeysMap;
            return {
                ...state,
                linesKeysMap: updatedLinesKeysMap,
                selectedLine: null,
            };
        }
        default:
            return state;
    }
};
