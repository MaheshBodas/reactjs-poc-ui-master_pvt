import { createsinglerisktypeConstants } from '../_constants';
import { createsingleriskTypeService } from '../_services';
import { alertActions } from './';
export const createsinglerisktypeActions = {
    getRiskType,
    addRiskTypeField,
    editRiskTypeField,
    deleteRiskTypeField,
    createRiskType
};
/*
newRiskTypeField: {
    id: undefined,
    risk_type_field_name: '',
    risk_type_field_enum: 'text',
    risk_type_field_description: ''
}
*/
function getRiskType() {
    return dispatch => {  
        console.log('getRiskType dispatch' )        
        dispatch(request());
        dispatch(success());
        dispatch(alertActions.clear());                    
    };

    function request() { return { type: createsinglerisktypeConstants.GET_RISKTYPE } }
    function success() { return { type: createsinglerisktypeConstants.GET_RISKTYPE_SUCCESS } }
    // function failure(error) { return { type: createsinglerisktypeConstants.GET_SINGLE_RISK_FROM_TYPE_FAILURE, error } }
}

function addRiskTypeField(risktypefield) {
    return async dispatch => {  
        console.log('addRiskTypeField dispatch risk_type_field_name ' + risktypefield.risk_type_field_name )        
        dispatch(request(risktypefield));
        dispatch(success(risktypefield));
        dispatch(alertActions.clear());                    
    };

    function request(risktypefield) { return { type: createsinglerisktypeConstants.ADD_RISKTYPEFIELD, risktypefield } }
    function success(risktypefield) { return { type: createsinglerisktypeConstants.ADD_RISKTYPEFIELD_SUCCESS, risktypefield } }
    // function failure(error) { return { type: createsinglerisktypeConstants.GET_SINGLE_RISK_FROM_TYPE_FAILURE, error } }
}

function editRiskTypeField(risktypefield) {
    return async dispatch => {  
        console.log('editRiskTypeField dispatch risk_type_field_name ' + risktypefield.risk_type_field_name )        
        dispatch(request(risktypefield));
        dispatch(success(risktypefield));
        dispatch(alertActions.clear());                    
    };

    function request(risktypefield) { return { type: createsinglerisktypeConstants.EDIT_RISKTYPEFIELD, risktypefield } }
    function success(risktypefield) { return { type: createsinglerisktypeConstants.EDIT_RISKTYPEFIELD_SUCCESS, risktypefield } }
    // function failure(error) { return { type: createsinglerisktypeConstants.GET_SINGLE_RISK_FROM_TYPE_FAILURE, error } }
}

function deleteRiskTypeField(risktypefield) {
    return async dispatch => {  
        console.log('deleteRiskTypeField dispatch risk_type_field_name ' + risktypefield.risk_type_field_name )        
        dispatch(request(risktypefield));
        dispatch(success(risktypefield));
        dispatch(alertActions.clear());                    
    };

    function request(risktypefield) { return { type: createsinglerisktypeConstants.DELETE_RISKTYPEFIELD, risktypefield } }
    function success(risktypefield) { return { type: createsinglerisktypeConstants.DELETE_RISKTYPEFIELD_SUCCESS, risktypefield } }
    // function failure(error) { return { type: createsinglerisktypeConstants.GET_SINGLE_RISK_FROM_TYPE_FAILURE, error } }
}

//
function createRiskType(riskTypeObj, risktypefields) { 
      const {risk_type_name} = riskTypeObj 
      return async dispatch => {  
        console.log('createRiskType dispatch risktypename ' + riskTypeObj.risk_type_name )        
        dispatch(request(risk_type_name));
        createsingleriskTypeService.createRiskType(riskTypeObj, risktypefields)
            .then(
                output => {
                    dispatch(success(output));
                    dispatch(alertActions.clear());
                    dispatch(getRiskType())
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )            
    };

    function request(strRiskTypeName) { return { type: createsinglerisktypeConstants.CREATE_SINGLE_RISK_TYPE, strRiskTypeName } }
    function success(output) { return { type: createsinglerisktypeConstants.CREATE_SINGLE_RISK_TYPE_SUCCESS, output } }
    function failure(error) { return { type: createsinglerisktypeConstants.CREATE_SINGLE_RISK_TYPE_FAILURE, error } }
}
//
