//---  Import axios for ajax calls ---//
//------------------------------------//
import axios from 'axios';

//--- Import Constants ---//
//------------------------//
import {reportsConstants} from '../constants/reportsConstants';
import {errorConstants} from '../constants/errorConstants';

//--- validate reponse ---//
let nonValidResponse = (response) => {
    let status = null
    if(response.status >= 200 && response.status < 300){
        return status = false;
    }
    return status = true
};

//--- AJAX Calls ---//
//--- Retrieve Report ---//
//--------------------------//
export function generateReport(query){
    return (dispatch) => {
        dispatch(generateReportRequest(true));
        return axios.get("/generate_report",{params: query})
            .then((response) => {  
                if (nonValidResponse(response)) {
                  dispatch(generateReportFailure(response));
                  dispatch(generateReportRequest(false));
                  throw Error(response.statusText);
                }
                dispatch(generateReportRequest(false));
                return response;
            })
            .then((response)=>{
                dispatch(generateReportSuccess(response.data));
            })
            .catch((err) =>{console.log(err.response); dispatch(generateReportFailure(err.response.data.errors))} );
    };
}


export function generateReportRequest(bool){
	return {
		type: reportsConstants.GENERATE_REPORT_REQUEST,
		bool
	}
}

export function generateReportFailure(err){
	return {
		type: errorConstants.GENERATE_REPORT_FAILURE,
		err
	}
}

export function generateReportSuccess(data){
	return {
		type: reportsConstants.GENERATE_REPORT_SUCCESS,
		data
	}
}

export function clearReport(){
    return {
        type: reportsConstants.CLEAR_REPORT
    }
}