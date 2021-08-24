export const SET_START = 'SET_START';
export const SET_END = 'SET_END';
export const FINISH_DRAW = 'FINISH_DRAW';
export const SAVE_LINE = 'SAVE_LINE_ID';
export const SAVE_PIN = 'SAVE_PIN';
export const DELETE_RELATED_PINS = 'DELETE_RELATED_PINS';
export const UPDATE_PIN_END = 'UPDATE_PIN_END';
export const SET_DRAGGABLE_PIN = 'SET_DRAGGABLE_PIN';
export const SELECT_LINE = 'SELECT_LINE';
export const DELETE_LINE = 'DELETE_ELEMENT_FROM_BOARD';

export const setStart = (id, coords) => {
    return {
        type: SET_START,
        payload: {
            id,
            coords,
        },
    };
};

export const setEnd = (id, coords) => {
    return {
        type: SET_END,
        payload: {
            id,
            coords,
        },
    };
};

export const finishDraw = () => {
    return {
        type: FINISH_DRAW,
    };
};

export const saveLineId = (pinId, coords) => {
    return {
        type: SAVE_LINE,
        payload: {
            id: pinId,
            coords,
        },
    };
};

export const savePin = (pinId, coords) => {
    return {
        type: SAVE_PIN,
        payload: {
            id: pinId,
            coords,
        },
    };
};

export const updatePinEnd = (id, endCoords) => {
    return {
        type: UPDATE_PIN_END,
        payload: {
            id,
            endCoords,
        },
    };
};

export const deleteRelatedPins = (lineId) => {
    return {
        type: DELETE_RELATED_PINS,
        payload: lineId,
    };
};

export const setDragablePin = (id) => {
    return {
        type: SET_DRAGGABLE_PIN,
        payload: id,
    };
};

export const deleteLine = (id) => {
    return {
        type: DELETE_LINE,
        payload: id,
    };
};
