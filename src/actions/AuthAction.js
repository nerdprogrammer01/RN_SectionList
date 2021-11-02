import { makeAPICall } from '../common';
import config from '../config';
////urlMediaLogin triggerMediaAuthLogin
export const TRIGGER_API = "TRIGGER_API";
export const TRIGGER_API_SUCCESS = "TRIGGER_API_SUCCESS";
export const TRIGGER_API_FAILED = "TRIGGER_API_FAILED";


export function triggerGetApi( callback, errCallback) {
    return dispatch => {
        const params = {
            url: `${config.apiBasePath}`,
            dispatch,
            defaultAction: TRIGGER_API,
            successAction: TRIGGER_API_SUCCESS,
            failedAction: TRIGGER_API_FAILED,
            type: "GET",
            headers: {},
            params:{},
            callback,
            errCallback
        }
        makeAPICall(params)
      //  console.log("Auth reg: "+para)
    }
}


