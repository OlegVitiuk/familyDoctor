import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {GET_USERS} from "../constants";

const user  = (state = [], action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.items
            }

        default:
            return state
    }
}

export default combineReducers({
    routing: routerReducer,
    user
})