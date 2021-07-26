export const DELETE_ELEMENT_FROM_BOARD = 'DELETE_ELEMENT_FROM_BOARD';
export const ADD_ELEMENT_TO_BOARD = 'ADD_ELEMENT_TO_BOARD';

export const addElementToBoard = (startDrag) => {
    return (dispatch) => {
        dispatch({
            type: ADD_ELEMENT_TO_BOARD,
            payload: startDrag,
        });
    };
};

export const deleteElementFromBoard = (id, list) => {
    return {
        type: DELETE_ELEMENT_FROM_BOARD,
        payload: { id, list },
    };
};
