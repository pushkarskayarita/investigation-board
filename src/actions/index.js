import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
export const FETCH_FILES = 'fetch_files';

export const fetchUsers = () => async (dispatch) => {
    const res = await axios.get('http://react-ssr-api.herokuapp.com/users');

    dispatch({
        type: FETCH_USERS,
        payload: res,
    });
};

export const fetchFiles = () => async (dispatch) => {
    const res = await axios.get('http://localhost:8080/api/files');

    dispatch({
        type: FETCH_FILES,
        payload: res,
    });
};
