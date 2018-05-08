import {api} from 'api/index';

export const registerNewUser = user =>
    api.post('/users', user);