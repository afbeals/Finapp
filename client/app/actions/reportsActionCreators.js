//--- Import Constants ---//
//------------------------//
import {reportsConstants} from '../constants/reportsConstants';
import {default as errors} from '../constants/errorConstants';

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
            .catch((err) => dispatch(generateReportFailure(err.response.data.errors)));
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
