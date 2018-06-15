import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import {doctor} from "reducers/doctor";
import {clinics} from "reducers/clinics";
import {auth} from "reducers/auth";

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    doctor,
    clinics,
    auth
})