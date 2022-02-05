import { GET_CATEGORIES } from '../constants/categoryConstants';

const INITIAL_STATE = {
    categories: [],
}

const categoryReducer = (state=INITIAL_STATE, action) => {
    switch (action.payload) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    };
}

export default categoryReducer;