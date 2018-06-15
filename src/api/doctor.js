import {api} from 'api/index';

export const getTimeSheetByDate = data =>
    api.post('/doctors/getTimeSheet', data).then(res => res.data);