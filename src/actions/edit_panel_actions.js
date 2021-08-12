export const ADD_CONNECTION = 'ADD_CONNECTION';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const DONE_EDITING = 'DONE_EDITING';

export const addConnection = () => {
    return {
        type: ADD_CONNECTION,
    };
};

export const deleteELement = (data) => {
    return {
        type: DELETE_ELEMENT,
        payload: data,
    };
};

export const doneEditing = () => {
    return {
        type: DONE_EDITING,
    };
};
