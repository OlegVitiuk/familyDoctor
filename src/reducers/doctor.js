import {
    GET_ALL_DOCTORS,
    SET_APPOINMENT_DOCTOR,
    FILTER_DOCTORS,
    REMOVE_FILTER_OPTIONS,
    SET_INFO_OF_SELECTED_OBJECT,
    SEARCH_ITEM
} from "constants/index";

export const doctor = (state = {
    filterItems: [],
    items: [],
    filterOptions: []
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
        case FILTER_DOCTORS: {
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
        }
        case SEARCH_ITEM:
            const {filterOptions} = action;
            return {
                ...state,
                filterItems: state.items.filter(item =>
                    item[filterOptions.nameOfField].includes(filterOptions.value)
                ),
                filterOptions: action.filterOptions
            }
        case REMOVE_FILTER_OPTIONS: {
            return {
                ...state,
                filterItems: [],
                filterOptions: {}
            }
        }

        case SET_INFO_OF_SELECTED_OBJECT:
            return {
                ...state,
                selectedItem: action.selectedObj
            }
        default:
            return state
    }
}