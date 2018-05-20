import {SET_USER} from "constants/index";
import {api} from 'api/index';

export const getUser = data => dispatch => {
    api.get('/user/user',data).then(response => {
        dispatch({type: SET_USER, user: response.data});
    }).catch(err => console.log(err));
};