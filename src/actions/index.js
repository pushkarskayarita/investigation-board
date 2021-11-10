import { addPictureDB, deletePictureDB } from '../helpers/indexedDB';
import { loadedPictures } from '../utils/loaded';

export const FETCH_PICTURES = 'FETCH_PICTURES';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const DELETE_PICTURE = 'DELETE_PICTURE';

export const fetchPictures = (data) => {
    return {
        type: FETCH_PICTURES,
        payload: data,
    };
};

export const uploadPicture = (file) => async (dispatch) => {
    addPictureDB(file)
        .then(() => {
            loadedPictures[file.id] = file.file;
            dispatch({
                type: UPLOAD_PICTURE,
                payload: file.id,
            });
        })
        .catch((error) => {
            console.log(
                ` ${error} 
                Error occurred on adding image to indexedDB`
            );
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
