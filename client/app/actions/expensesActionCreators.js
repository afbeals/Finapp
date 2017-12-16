//---  Import axios for ajax calls ---/
import axios from 'axios';

//--- Import Constants ---//
import {expensesConstants} from '../constants/expensesConstants';

//--- Action Creators ---//
/*--- Example:
Basic:
export function increaseNum(i) {
  return {
    type: 'INCREASE_NUM'
  };
}

Ajax:
export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch();
        axios.get(url)
            .then((response) => {  
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch();
                return response;
            })
            .then((data) => dispatch())
            .catch(() => dispatch());
    };
}
--- */

//--- url selector based on query.url -> to return url for axios request ---//
const urlSelector = (queryType)=>{
    switch(queryType){
        case 'get_all_expenses':
            return "/get_all_expenses";
        case 'get_all_expenses_in_month':
            return '/get_all_expenses_in_month';
        case 'get_all_expenses_in_range':
            return "/get_all_expenses_in_range";
        default:
            return null;
    }
}

//--- AJAX Calls ---//
//--- Retrieve Expeneses ---//
export function getAllExpenses(query){
	return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.get("/get_all_expenses",{params: {users_id: query}})
            .then((response) => {  
                if (!(response.status >= 200 && response.status <= 299)) {
                	 dispatch(fetchingExpensesError(true));
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
            .catch((err) => dispatch(fetchingExpensesError(true)));
    };
}

//--- Get All Expenses In Month ---//
export function getAllExpensesInMonth(users_id,month){
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.get("/get_all_expenses_in_month",{params:{users_id,month}})
            .then((response) => {  
                if (!(response.status >= 200 && response.status <= 299)) {
                     dispatch(fetchingExpensesError(true));
                     dispatch(fetchingExpenses(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingExpenses(false));
                return response;
            })
            .then((response)=>{ 
                dispatch(fetchingExpensesSuccess(true));
                dispatch(getAllExpensesInMonthSuccess(response.data));
            })
            .catch((err) => dispatch(fetchingExpensesError(true)));
    };
}

//--- Get All Expenses In Range ---//
export function getAllExpensesInRange(params){
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.get("/get_all_expenses_in_range",{params:{params}})
            .then((response) => {  
                if (!(response.status >= 200 && response.status <= 299)) {
                     dispatch(fetchingExpensesError(true));
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
            .catch((err) => dispatch(fetchingExpensesError(true)));
    };
}

//--- Update Existing Expense ---//
export function updateExpensesInQuery(params){
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.post("/update_expenses_in_query",{params:{params}})
            .then((response) => {  
                if (!(response.status >= 200 && response.status <= 299)) {
                     dispatch(fetchingExpensesError(true));
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
            .catch((err) => dispatch(fetchingExpensesError(true)));
    };
}

//--- Remove Existing Expense ---//
export function removeExpensesInQuery(params){
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.delete("/remove_expenses_in_query",{params:{params}})
            .then((response) => {  
                if (!(response.status >= 200 && response.status <= 299)) {
                     dispatch(fetchingExpensesError(true));
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
            .catch((err) => dispatch(fetchingExpensesError(true)));
    };
}
//--- Add New Expense ---//
var testQuery = {
    users_id: 1,
    name: "test name2",
    due_day: 5,
    amount_due: 4200.33,
    amount_paid: 250,
    notes: "!!!noenasa anot notes eafea!!!"

}
export function addExpensesInQuery(query){
    return (dispatch) => {
        dispatch(fetchingExpenses(true));
        return axios.post("/add_expenses_in_query",testQuery)
            .then((response) => {
                if (!(response.status >= 200 && response.status <= 299)) {
                     dispatch(fetchingExpensesError(true));
                     dispatch(fetchingExpenses(false));
                    throw Error(response.statusText);
                }
                dispatch(fetchingExpenses(false));
                return response;
            })
            .then((response)=>{ 
                dispatch(fetchingExpensesSuccess(true));
                dispatch(addExpensesSuccess(testQuery));
            })
            .catch((err) => {
                dispatch(fetchingExpensesError(true))});
    };
}


//--- Action Creators ---//
//--- Requesting Data ---//
export function fetchingExpenses(bool){
	return {
		type: expensesConstants.REQUESTING_EXPENSE,
		isRegistering: bool
	}
}

//--- Request Failures ---//
export function fetchingExpensesError(bool){
	return {
		type: expensesConstants.REQUESTING_EXPENSE_FAILURE,
		hasErrored: bool,

	}
}

//--- Request Successes ---//
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
        id: query
    }
}

export function addExpensesSuccess(query){
    return {
        type: expensesConstants.ADD_EXPENSE,
        data: query
    }
}