//---  Import axios for ajax calls ---//
//------------------------------------//
import axios from 'axios';

//--- Import Constants ---//
//------------------------//
import {expensesConstants} from '../constants/expensesConstants';
import {errorConstants} from '../constants/errorConstants';
console.log('aefa',errorConstants);
//--- validate reponse ---//
let nonValidResponse = (response) => {
    let status = null
    if(response.status >= 200 && response.status < 300){
        return status = false;
    }
    return status = true
};


//--- AJAX Calls ---//
//--- Retrieve Expeneses ---//
//--------------------------//
export function getAllExpenses(id){
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.get("/get_all_expenses",{params: {user_id: id}})
            .then((response) => {  
                if (nonValidResponse(response)) {
                     dispatch(fetchingExpensesError(response));
                     dispatch(fetchingExpenses(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingExpenses(false));
                return response;
            })
            .then((response)=>{
                dispatch(fetchingExpensesSuccess(true));
                dispatch(getAllExpensesSuccess(response.data));
            })
            .catch((err) => dispatch(fetchingExpensesError(err.response.data.errors)));
    };
}

//--- Get All Expenses In Month ---//
//---------------------------------//
export function getAllExpensesInMonth(user_id,month,year){
    console.log(user_id,month)
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.get("/get_all_expenses_in_month",{params:{user_id:user_id,month:month,year:year}})
            .then((response) => {  
                if (nonValidResponse(response)) {
                     dispatch(fetchingExpensesError(response));
                     dispatch(fetchingExpenses(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingExpenses(false));
                return response;
            })
            .then((response)=>{
                console.log(response.data);
                dispatch(fetchingExpensesSuccess(true));
                dispatch(getAllExpensesInMonthSuccess(response.data));
            })
            .catch((err) => dispatch(fetchingExpensesError(err.response.data.errors)));
    };
}

//--- Get All Expenses In Range ---//
//---------------------------------//
export function getAllExpensesInRange(params){
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.get("/get_all_expenses_in_range",{params:params})
            .then((response) => {  
                if (nonValidResponse(response)) {
                     dispatch(fetchingExpensesError(response));
                     dispatch(fetchingExpenses(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingExpenses(false));
                return response;
            })
            .then((response)=>{ 
                dispatch(fetchingExpensesSuccess(true));
                dispatch(getAllExpensesInRangeSuccess(response.data));
            })
            .catch((err) => dispatch(fetchingExpensesError(err.response.data.errors)));
    };
}

//--- Update Existing Expense ---//
//-------------------------------//
export function updateExpensesInQuery(params){
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.post("/update_expenses_in_query",params)
            .then((response) => {  
                if (nonValidResponse(response)) {
                     dispatch(fetchingExpensesError(response));
                     dispatch(fetchingExpenses(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingExpenses(false));
                return response;
            })
            .then((response)=>{ 
                dispatch(fetchingExpensesSuccess(true));
                dispatch(updateExpensesSuccess(params));
            })
            .catch((err) => dispatch(fetchingExpensesError(err.response.data.errors)));
    };
}

//--- Remove Existing Expense ---//
//-------------------------------//
export function removeExpensesInQuery(params){
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.post("/remove_expenses_in_query",params)
            .then((response) => {  
               if (nonValidResponse(response)) {
                     dispatch(fetchingExpensesError(response));
                     dispatch(fetchingExpenses(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingExpenses(false));
                return response;
            })
            .then((response)=>{ 
                dispatch(fetchingExpensesSuccess(true));
                dispatch(removeExpensesSuccess(params));
            })
            .catch((err) => dispatch(fetchingExpensesError(err.response.data.errors)));
    };
}
//--- Add New Expense ---//
//-----------------------//
export function addExpensesInQuery(params){
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.post("/add_expenses_in_query",params)
            .then((response) => {
                if (nonValidResponse(response)) {
                     dispatch(fetchingExpensesError(response));
                     dispatch(fetchingExpenses(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingExpenses(false));
                return response;
            })
            .then((response)=>{
                dispatch(fetchingExpensesSuccess(true));
                dispatch(addExpensesSuccess(Object.assign({},params, {expensesId: response.data.expensesId})));
            })
            .catch((err) => dispatch(fetchingExpensesError(err.response.data.errors)));
    };
}


//--- Action Creators ---//
//--- Requesting Data ---//
//-----------------------//
export function fetchingExpenses(bool){
    return {
        type: expensesConstants.REQUESTING_EXPENSE,
        isRegistering: bool
    }
}

//--- Request Failures ---//
//------------------------//
export function fetchingExpensesError(err){
    return {
        type: errorConstants.REQUESTING_EXPENSE_FAILURE,
        err

    }
}

//--- Request Successes ---//
//-------------------------//
export function fetchingExpensesSuccess(bool){
    return {
        type: expensesConstants.REQUESTING_EXPENSE_SUCCESS,
        isSuccessful: bool
    }
}

export function updateExpensesSuccess(response){
    return {
        type: expensesConstants.UPDATE_EXPENSE,
        data: response
    }
}

export function getAllExpensesSuccess(response){
    return {
        type: expensesConstants.GET_ALL_EXPENSES,
        data: response
    }
}

export function getAllExpensesInMonthSuccess(response){
    return {
        type: expensesConstants.GET_ALL_EXPENSES_IN_MONTH,
        data: response
    }
}

export function getAllExpensesInRangeSuccess(response){
    return {
        type: expensesConstants.GET_ALL_EXPENSES_IN_RANGE,
        data: response
    }
}

export function removeExpensesSuccess(query){
    return {
        type: expensesConstants.REMOVE_EXPENSE,
        data: query
    }
}

export function addExpensesSuccess(query){
    return {
        type: expensesConstants.ADD_EXPENSE,
        data: query
    }
}

export function clearExpenses(){
    return{
        type: expensesConstants.CLEAR_EXPENSE
    }
}