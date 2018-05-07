import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import {GET_USERS} from "../constants";

const initialState = {
    users: [],
    clinics: []
}

const users  = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state.users,
                items: action.items
            }
        default:
            return state
    }
}

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    users
})