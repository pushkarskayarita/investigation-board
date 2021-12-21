import {
    addBoardItemsDB,
    addLinesDB,
    getTemplatesBoard,
    updateBoardItemsDB,
    getPicturesBoard,
    deleteBoardItemDB,
    getLinesDB,
    modifyCollectionDB,
    mapGetDB,
} from '../helpers/indexedDB';

export const DELETE_ELEMENT_FROM_BOARD = 'DELETE_ELEMENT_FROM_BOARD';
export const ADD_ELEMENT_TO_BOARD = 'ADD_ELEMENT_TO_BOARD';
export const SELECT_ELEMENT = 'SELECT_ELEMENT';
export const SAVE_BOARD = 'SAVE_BOARD';
export const SAVE_ELEMENT_COORDS = 'SAVE_ELEMENT_COORDS';
export const CHANGE_IMAGE_SRC = 'CHANGE_IMAGE_SRC';
export const FETCH_BOARD_DATA_FROM_DB = 'FETCH_BOARD_DATA_FROM_DB';
export const FETCH_LINES_FROM_LOCAL_STORAGE = 'FETCH_LINES_FROM_LOCAL_STORAGE';

export const fetchBoardDataFromDB = (data) => async (dispatch) => {
    dispatch({
        type: FETCH_BOARD_DATA_FROM_DB,
        payload: {
            picturesBoard: data[0],
            templatesBoard: data[1],
            lines: data[2],
        },
    });
};

export const addElementToBoard = (startDrag) => {
    return (dispatch) => {
        dispatch({
            type: ADD_ELEMENT_TO_BOARD,
            payload: startDrag,
        });
    };
};

export const deleteElementFromBoard = (id, list) => async (dispatch) => {
    mapGetDB[list]()
        // eslint-disable-next-line consistent-return
        .then((data) => {
            if (data.length > 0) {
                return deleteBoardItemDB(id, list);
            }
        })
        .then(() => {
            dispatch({
                type: DELETE_ELEMENT_FROM_BOARD,
                payload: { id, list },
            });
        });
};

export const selectElement = (id, list) => {
    return {
        type: SELECT_ELEMENT,
        payload: { id, list },
    };
};

export const saveElementCoords = (id, list, coords) => {
    return {
        type: SAVE_ELEMENT_COORDS,
        payload: {
            id,
            list,
            coords,
        },
    };
};

export const saveBoard = (boardItems, lines) => async () => {
    Promise.all([getTemplatesBoard(), getPicturesBoard()])
        .then((boardDataDB) => {
            const lists = ['templatesBoard', 'picturesBoard'];
            const requests = boardDataDB.map((boardList, index) => {
                const list = lists[index];
                if (boardList.length > 0) {
                    return updateBoardItemsDB(boardItems, list);
                }
                return addBoardItemsDB(boardItems, list);
            });
            return Promise.all(requests);
        })
        .then(() => {
            return getLinesDB();
        })
        .then((result) => {
            if (result.length > 0) {
                return modifyCollectionDB(lines);
            }
            return addLinesDB(lines);
        })
        .catch((err) => console.log('Error occurred on saving the board', err));
};

export const changeTemplateImgSrc = (
    idOfTemplate,
    list,
    imageSrc,
    loadedPictureFileId
) => {
    return {
        type: CHANGE_IMAGE_SRC,
        payload: {
            id: idOfTemplate,
            list,
            imageSrc,
            loadedPictureFileId,
        },
    };
};
