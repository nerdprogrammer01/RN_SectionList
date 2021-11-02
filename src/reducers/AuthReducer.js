import {
    TRIGGER_API,
    TRIGGER_API_SUCCESS,
    TRIGGER_API_FAILED

} from '../actions'

// import { persistor } from '../../src/store';

const initialState = {
    apiObj: {
        loading: false,
        data: [],
        error: null
    }
    
}



const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case TRIGGER_API:
            return {
                ...state,
                apiObj: {
                    loading: true,
                    data: [],
                    error: null
                }
            }
        case TRIGGER_API_SUCCESS:
            return {
                ...state,
                apiObj: {
                    loading: false,
                    data: action.payload,
                    error: null
                },
            }

               case TRIGGER_API_FAILED:
            return {
                ...state,
                apiObj: {
                    loading: false,
                    data: action.payload,
                    error: null
                },
            }
     
     
        default:
            return state
    }
}

export default authReducer;