//---  Import axios for ajax calls ---//
//------------------------------------//
import axios from 'axios';

//--- Import Constants ---//
//------------------------//
import {incomesConstants} from '../constants/incomesConstants';
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
//--- Retrieve Incomes ---//
//------------------------//
export function getAllIncomes(id){
	return (dispatch) => {
        dispatch(fetchingIncomes(true));
        return axios.get("/get_all_incomes",{params: {user_id: id}})
            .then((response) => {  
               if (nonValidResponse(response)) {
                	 dispatch(fetchingIncomesError(true));
                     dispatch(fetchingIncomes(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingIncomes(false));
                return response;
            })
            .then((response)=>{
                dispatch(fetchingIncomesSuccess(true));
                dispatch(getAllIncomesSuccess(response.data));
            })
            .catch((err) => dispatch(fetchingIncomesError(err.response.data.errors)));
    };
}

//--- Get All Incomes In Month ---//
//--------------------------------//
export function getAllIncomesInMonth(user_id,month,year){
    return (dispatch) => {
        dispatch(fetchingIncomes(true));
        return axios.get("/get_all_incomes_in_month",{params:{user_id,month,year}})
            .then((response) => {  
                if (nonValidResponse(response)) {
                     dispatch(fetchingIncomesError(true));
                     dispatch(fetchingIncomes(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingIncomes(false));
                return response;
            })
            .then((response)=>{ 
                dispatch(fetchingIncomesSuccess(true));
                dispatch(getAllIncomesInMonthSuccess(response.data));
            })
            .catch((err) => dispatch(fetchingIncomesError(err.response.data.errors)));
    };
}

//--- Get All Incomes In Range ---//
//--------------------------------//
export function getAllIncomesInRange(params){
    return (dispatch) => {
        dispatch(fetchingIncomes(true));
        return axios.get("/get_all_incomes_in_range",{params:params})
            .then((response) => {  
                if (nonValidResponse(response)) {
                     dispatch(fetchingIncomesError(true));
                     dispatch(fetchingIncomes(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingIncomes(false));
                return response;
            })
            .then((response)=>{ 
                dispatch(fetchingIncomesSuccess(true));
                dispatch(getAllIncomesInRangeSuccess(response.data));
            })
            .catch((err) => dispatch(fetchingIncomesError(err.response.data.errors)));
    };
}

//--- Update Existing Income ---//
//-------------------------------//
export function updateIncomesInQuery(params){
    return (dispatch) => {
        dispatch(fetchingIncomes(true));
        return axios.post("/update_incomes_in_query",params)
            .then((response) => {  
                if (nonValidResponse(response)) {
                     dispatch(fetchingIncomesError(true));
                     dispatch(fetchingIncomes(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingIncomes(false));
                return response;
            })
            .then((response)=>{ 
                dispatch(fetchingIncomesSuccess(true));
                dispatch(updateIncomesSuccess(params));
            })
            .catch((err) => dispatch(fetchingIncomesError(err.response.data.errors)));
    };
}

//--- Remove Existing Income ---//
//-------------------------------//
export function removeIncomesInQuery(params){
    return (dispatch) => {
        dispatch(fetchingIncomes(true));
        return axios.post("/remove_incomes_in_query",params)
            .then((response) => {  
                if (nonValidResponse(response)) {
                     dispatch(fetchingIncomesError(true));
                     dispatch(fetchingIncomes(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingIncomes(false));
                return response;
            })
            .then((response)=>{ 
                dispatch(fetchingIncomesSuccess(true));
                dispatch(removeIncomesSuccess(params));
            })
            .catch((err) => dispatch(fetchingIncomesError(err.response.data.errors)));
    };
}
//--- Add New Income ---//
//----------------------//
export function addIncomesInQuery(params){
    return (dispatch) => {
        dispatch(fetchingIncomes(true));
        return axios.post("/add_incomes_in_query",params)
            .then((response) => {
                if (nonValidResponse(response)) {
                     dispatch(fetchingIncomesError(true));
                     dispatch(fetchingIncomes(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingIncomes(false));
                return response;
            })
            .then((response)=>{ 
                dispatch(fetchingIncomesSuccess(true));
                dispatch(addIncomesSuccess(Object.assign(params, {incomesId: response.data.incomesId})));
            })
            .catch((err) => {
                dispatch(fetchingIncomesError(err.response.data.errors))});
    };
}


//--- Action Creators ---//
//--- Requesting Data ---//
//-----------------------//
export function fetchingIncomes(bool){
	return {
		type: incomesConstants.REQUESTING_INCOME,
		isRegistering: bool
	}
}

//--- Request Failures ---//
export function fetchingIncomesError(err){
	return {
		type: errorConstants.REQUESTING_INCOME_FAILURE,
		err

	}
}

//--- Request Successes ---//
export function fetchingIncomesSuccess(bool){
    return {
        type: incomesConstants.REQUESTING_INCOME_SUCCESS,
        isSuccessful: bool
    }
}

export function updateIncomesSuccess(response){
    return {
        type: incomesConstants.UPDATE_INCOME,
        data: response
    }
}

export function getAllIncomesSuccess(response){
    return {
        type: incomesConstants.GET_ALL_INCOMES,
        data: response
    }
}

export function getAllIncomesInMonthSuccess(response){
    return {
        type: incomesConstants.GET_ALL_INCOMES_IN_MONTH,
        data: response
    }
}

export function getAllIncomesInRangeSuccess(response){
    return {
        type: incomesConstants.GET_ALL_INCOMES_IN_RANGE,
        data: response
    }
}

export function removeIncomesSuccess(query){
    return {
        type: incomesConstants.REMOVE_INCOME,
        data: query
    }
}

export function addIncomesSuccess(query){
    return {
        type: incomesConstants.ADD_INCOME,
        data: query
    }
}

export function clearIncomes(){
    return{
        type: incomesConstants.CLEAR_INCOME
    }
}