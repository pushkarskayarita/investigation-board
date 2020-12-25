import { FETCH_FILES } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_FILES:
            return action.payload.data;
        default:
            return state;
    }
};
