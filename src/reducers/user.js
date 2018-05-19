import {SET_USER} from 'constants';

export const user  = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                activeUser: action.user
            }
        default:
            return state
    }
}