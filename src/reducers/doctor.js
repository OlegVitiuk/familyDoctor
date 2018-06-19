import {GET_ALL_DOCTORS, SET_APPOINMENT_DOCTOR, FILTER_DOCTORS} from "constants/index";

export const doctor = (state = {
    filterItems: [],
    items: []
}, action) => {
    switch (action.type) {
        case GET_ALL_DOCTORS:
            return {
                ...state,
                items: [...action.doctors]
            };
        case SET_APPOINMENT_DOCTOR:
            return {
                ...state,
                appoinmentDoctor: action.item
            };
        case FILTER_DOCTORS:
            const {filterOptions} = action;
            if (filterOptions.length) {
                return {
                    ...state,
                    filterItems: state.items.filter(item =>
                        item[filterOptions[0].nameOfField].includes(filterOptions[0].value)
                    )
                }
            }
            return {
                ...state,
                filterItems: []
            }
        // return {
        //     ...state,
        //     items: state.items.filter((item) => {
        //         filterOptions.forEach(option => {
        //             item[option.nameOfField]
        //         })
        //         return item[filterOptions.name] !== filterOptions.value
        //     })
        // }
        default:
            return state
    }
}