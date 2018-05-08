import {GET_USERS} from "../constants";
import {api} from 'api/index';

export const getUsers = () => dispatch => {
    api.get('/users').then(response => {
        dispatch({type: GET_USERS, items: response.data});
    }).catch(err => console.log(err));
};
