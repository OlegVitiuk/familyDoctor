import {GET_ALL_CLINICS} from "constants/index";
import {api} from 'api/index';

export const getAllClinics = () => dispatch =>{
    api.get('/clinics/getAll').then(response => {
        dispatch({type: GET_ALL_CLINICS, clinics: response.data});
    }).catch(err => console.log(err));
}