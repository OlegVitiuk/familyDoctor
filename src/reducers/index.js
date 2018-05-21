import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import {doctors} from "reducers/doctors";
import {clinics} from "reducers/clinics";
import {auth} from "reducers/auth";

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    doctors,
    clinics,
    auth
})