import {api} from 'api/index';

export const getTimeSheetByDate = date =>
    api.get('/clinics/getTimeSheet', date );