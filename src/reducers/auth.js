import {SET_CURRENT_USER} from 'constants/index';
import {isEmpty} from 'lodash';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export const auth  = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            }
        default:
            return state
    }
}