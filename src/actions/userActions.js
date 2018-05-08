import {GET_USERS} from "../constants";
import axios from 'axios';
import {apiPrefix} from '../etc/config';

//const apiPrefix = 'https://evening-shelf-73105.herokuapp.com';

export const getUsers = () => dispatch => {
    axios.get(`${apiPrefix}/users`).then(response => {
        dispatch({type: GET_USERS, items: response.data});
    }).catch(err => console.log(err));
};
