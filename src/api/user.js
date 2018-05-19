import {api} from 'api/index';

export const registerNewUser = user =>
    api.post('/user/register', user);

export const loginUser = data => api.post('/user/login', data);