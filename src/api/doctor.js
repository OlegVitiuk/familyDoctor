import {api} from 'api/index';

export const getAppoinments = data =>
    api.post('/doctors/getAppoinments', data).then(res => res.data);

export const addAppoinment = data =>
    api.post('/doctors/getAppoinments', data).then(res => res.data);