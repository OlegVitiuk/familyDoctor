import {GET_ALL_DOCTORS} from "constants/index";

export const doctors = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_DOCTORS:
            return [...action.doctors];
        default:
            return state
    }
}