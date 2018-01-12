//--- Import Constants ---//
//------------------------//
import {errorConstants} from '../constants/errorConstants';

//--- Remove Error ---//
//--------------------//
export function removeError(index){
	return {
		type: errorConstants.REMOVE_ERROR,
		index
	}
}

export function clearAllErrors(){
	return {
		type: errorConstants.CLEAR_ALL_ERRORS
	}
}