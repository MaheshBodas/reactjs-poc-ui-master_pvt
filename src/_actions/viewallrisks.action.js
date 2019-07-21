import { viewallrisksConstants } from '../_constants';
import { viewallrisksService } from '../_services';
import { alertActions } from './';
export const viewAllRisksActions = {
    getRisks,
    resetAllRisks
};

function getRisks(risk_type_id) {
    return dispatch => {  
        console.log('getRisks dispatch risk_type_id ' + risk_type_id )        
        dispatch(request(risk_type_id));

        return viewallrisksService.getRisks(risk_type_id)
            .then(
                riskinstances => {
                    console.log(riskinstances);
                    dispatch(success(riskinstances));
                    dispatch(alertActions.clear());                    
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )           
            
    };

    function request(risk_type_id) { return { type: viewallrisksConstants.GET_ALL_RISKS, risk_type_id } }
    function success(riskinstances) { return { type: viewallrisksConstants.GET_ALL_RISKS_SUCCESS, riskinstances } }
    function failure(error) { return { type: viewallrisksConstants.GET_ALL_RISKS_FAILURE, error } }
}

function resetAllRisks() {
    return dispatch => {  
        console.log('resetAllRisks dispatched')        
        dispatch(request());
        dispatch(success());
        dispatch(alertActions.clear());
    }
    function request() { return { type: viewallrisksConstants.RESET_ALL_RISKS } }
    function success() { return { type: viewallrisksConstants.RESET_ALL_RISKS_SUCCESS } }
}
