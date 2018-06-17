import {SET_USER, SET_AUTHORIZATON} from 'constants/index';
import {isEmpty} from 'lodash';

const initialState = {
    isAuthenticated: false,
    activeUser: {}
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHORIZATON:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.user)
            };
        case SET_USER: {
            return {
                ...state,
                activeUser: action.user
            }
        }
        default:
            return state
    }
}