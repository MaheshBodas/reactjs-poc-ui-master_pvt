import { createsingleriskConstants } from '../_constants';
import { createsingleriskService } from '../_services';
import { alertActions } from './';
// import { async } from 'q';
export const createsingleriskActions = {
    getRiskFromType,
    resetSingleRisk,
    createRisk
};

function getRiskFromType(risktypeid, itemsPerRow) {
    return dispatch => {  
        console.log('getRiskFromType dispatch riskid ' + risktypeid )        
        dispatch(request(risktypeid));

        return createsingleriskService.getRiskFromType(risktypeid, itemsPerRow)
            .then(
                output => {                    
                    dispatch(success(output.risktypeobj, output.itemsPerRow));
                    dispatch(alertActions.clear());                    
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )           
            
    };

    function request(riskid) { return { type: createsingleriskConstants.GET_SINGLE_RISK_FROM_TYPE, riskid } }
    function success(risktypeobj, itemsPerRow) { return { type: createsingleriskConstants.GET_SINGLE_RISK_FROM_TYPE_SUCCESS, risktypeobj, itemsPerRow } }
    function failure(error) { return { type: createsingleriskConstants.GET_SINGLE_RISK_FROM_TYPE_FAILURE, error } }
}

function resetSingleRisk() {
    return dispatch => {  
        console.log('resetSingleRisk dispatched')        
        dispatch(request());
        dispatch(alertActions.clear());
    }
    function request() { return { type: createsingleriskConstants.RESET_CREATE_SINGLE_RISK } }
}

function createRisk(risktype, riskFieldArray, inputFormFields) {    
    const risk_name = inputFormFields.risk_name
      return async dispatch => {  
        console.log('createRisk dispatch riskname ' + inputFormFields.risk_name )        
        dispatch(request(risk_name));
        createsingleriskService.createRisk(risktype, riskFieldArray, inputFormFields)
            .then(
                output => {
                    dispatch(success(output));
                    dispatch(alertActions.clear());                    
                    dispatch(getRiskFromType(risktype, 2))
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )            
    };

    function request(risk_name) { return { type: createsingleriskConstants.CREATE_SINGLE_RISK, risk_name } }
    function success(output) { return { type: createsingleriskConstants.CREATE_SINGLE_RISK_SUCCESS, output } }
    function failure(error) { return { type: createsingleriskConstants.CREATE_SINGLE_RISK_FAILURE, error } }
}
