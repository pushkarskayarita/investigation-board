import {
    FETCH_BOARD_DATA_FROM_DB,
    ADD_ELEMENT_TO_BOARD,
    DELETE_ELEMENT_FROM_BOARD,
    SELECT_ELEMENT,
    SAVE_ELEMENT_COORDS,
    CHANGE_IMAGE_SRC,
    SAVE_BOARD,
    FETCH_LINES_FROM_LOCAL_STORAGE,
} from '../actions/board_actios';
import { loadedPictures } from '../utils/loaded';
import mapStateToProps from 'react-redux/lib/connect/mapStateToProps';

const initialState = {
    picturesBoard: [],
    templatesBoard: [],
    activeElement: {},
    initialDrag: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOARD_DATA_FROM_DB: {
            const { picturesBoard, templatesBoard, lines } = action.payload;
            function matchPicturesSrc(arr, loadedFiles) {
                const loadedPicturesIds = Object.keys(loadedFiles);
                const boardItems = arr.map((el) => {
                    const matchId = loadedPicturesIds.find((id) => {
                        return id === el.loadedPictureFileId;
                    });
                    return matchId
                        ? {
                              ...el,
                              imageSrc: URL.createObjectURL(
                                  loadedPictures[matchId]
                              ),
                          }
                        : el;
                });
                return boardItems;
            }

            return {
                ...state,
                picturesBoard: matchPicturesSrc(picturesBoard, loadedPictures),
                templatesBoard: matchPicturesSrc(
                    templatesBoard,
                    loadedPictures
                ),
                initialDrag: false,
            };
        }
        case ADD_ELEMENT_TO_BOARD:
            return {
                ...state,
                [action.payload.list]: [
                    ...state[action.payload.list],
                    action.payload,
                ],
                initialDrag: true,
            };
        case DELETE_ELEMENT_FROM_BOARD:
            if (action.payload.list === 'lines') return state;
            return {
                ...state,
                [action.payload.list]: state[action.payload.list].filter(
                    (elem) => elem.id !== action.payload.id
                ),
            };
        case SELECT_ELEMENT:
            return {
                ...state,
                activeElement: action.payload,
            };
        case SAVE_ELEMENT_COORDS: {
            const { id, coords } = action.payload;

            return {
                ...state,
                [action.payload.list]: state[action.payload.list].map(
                    (item) => {
                        return item.id === id
                            ? {
                                  ...item,
                                  coords,
                              }
                            : item;
                    }
                ),
            };
        }

        case SAVE_BOARD: {
            return {
                ...state,
                templatesBoard: action.payload.templatesBoard,
                picturesBoard: action.payload.picturesBoard,
            };
        }

        case CHANGE_IMAGE_SRC: {
            const { id, imageSrc, loadedPictureFileId } = action.payload;
            return {
                ...state,
                templatesBoard: state.templatesBoard.map((item) => {
                    return item.id === id
                        ? {
                              ...item,
                              imageSrc,
                              loadedPictureFileId,
                          }
                        : item;
                }),
            };
        }

        default:
            return state;
    }
};
