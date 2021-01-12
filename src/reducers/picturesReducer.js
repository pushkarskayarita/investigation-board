import { DELETE_PICTURE, FETCH_PICTURES, UPLOAD_PICTURE } from '../actions';

const initialState = {
    pictures: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_PICTURE:
            return {
                ...state,
                pictures: [...state.pictures, action.payload],
            };
        case DELETE_PICTURE:
            return {
                ...state,
                pictures: state.pictures.filter(
                    (elem) => elem !== action.payload
                ),
            };
        case FETCH_PICTURES:
            return {
                ...state,
                pictures: [...state.pictures, ...action.payload],
            };
        default:
            return state;
    }
};
