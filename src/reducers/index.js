import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import {user} from "reducers/user";
import {doctors} from "reducers/doctors";

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    user,
    doctors
})