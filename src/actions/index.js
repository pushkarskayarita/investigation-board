import { addPictureDB, deletePictureDB } from '../helpers/indexedDB';
import { loadedPictures } from '../utils/loaded';

export const FETCH_PICTURES = 'FETCH_PICTURES';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const DELETE_PICTURE = 'DELETE_PICTURE';
export const ADD_PICTURE_TO_BOARDLIST = 'ADD_PICTURE_TO_BOARDLIST';

export const fetchPictures = (data) => {
    return {
        type: FETCH_PICTURES,
        payload: data,
    };
};

export const uploadPicture = (file) => async (dispatch) => {
    const res = await addPictureDB(file);
    loadedPictures[file.id] = file.file;

    dispatch({
        type: UPLOAD_PICTURE,
        payload: res,
    });
};

export const deletePicture = (id) => async (dispatch) => {
    await deletePictureDB(id);
    delete loadedPictures[id];

    dispatch({
        type: DELETE_PICTURE,
        payload: id,
    });
};

export const addPictureToBoardList = (startDrag) => {
    console.log('Add picture to board list');
    return {
        type: ADD_PICTURE_TO_BOARDLIST,
        payload: startDrag,
    };
};
