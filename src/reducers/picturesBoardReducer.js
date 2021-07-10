import { ADD_PICTURE_TO_BOARDLIST } from '../actions';

const initialState = {
    picturesBoard: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PICTURE_TO_BOARDLIST:
            return {
                ...state,
                picturesBoard: [...state.picturesBoard, action.payload],
            };

        default:
            return state;
    }
};
