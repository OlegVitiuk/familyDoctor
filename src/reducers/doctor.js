import {GET_ALL_DOCTORS,SET_APPOINMENT_DOCTOR} from "constants/index";

export const doctor = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_DOCTORS:
            return {
                ...state,
                items: [...action.doctors]
            };
        case SET_APPOINMENT_DOCTOR:
            return {
                ...state,
                appoinmentDoctor: action.id
            };
        default:
            return state
    }
}