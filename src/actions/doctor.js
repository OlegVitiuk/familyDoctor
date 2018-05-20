import {api} from 'api/index';
import {GET_ALL_DOCTORS} from "constants/index";

export const getAllDoctors = () => dispatch =>{
    api.get('/doctors/getAll').then(response => {
        dispatch({type: GET_ALL_DOCTORS, doctors: response.data});
    }).catch(err => console.log(err));
}