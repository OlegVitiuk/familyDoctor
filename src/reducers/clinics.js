import {GET_ALL_CLINICS} from "constants/index";

export const clinics = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_CLINICS:
            return [...action.clinics];
        default:
            return state
    }
}