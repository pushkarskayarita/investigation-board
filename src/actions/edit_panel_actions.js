export const ADD_LINK = 'ADD_LINK';
export const DONE_EDITING = 'DONE_EDITING';
export const SET_DELETE_CONNECTION_MODE = 'SET_DELETE_CONNECTION_MODE';

export const addLink = () => {
    return {
        type: ADD_LINK,
    };
};

export const doneEditing = () => {
    return {
        type: DONE_EDITING,
    };
};
