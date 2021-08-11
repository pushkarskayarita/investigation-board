export const SET_START = 'SET_START';
export const SET_END = 'SET_END';
export const FINISH_DRAW = 'FINISH_DRAW';
export const SAVE_LINE = 'SAVE_LINE_ID';
export const SAVE_PIN = 'SAVE_PIN';
export const UPDATE_PIN_END = 'UPDATE_PIN_END';
export const SET_DRAGGABLE_PIN = 'SET_DRAGGABLE_PIN';

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

export const setDragablePin = (id) => {
    return {
        type: SET_DRAGGABLE_PIN,
        payload: id,
    };
};
