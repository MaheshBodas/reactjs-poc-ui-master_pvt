import auth from '../api/auth'
import { RiskPostData } from '../utils/createriskctrl'
export const createsingleriskService = {
    getRiskFromType,
    createRisk    
};

function getRiskFromType(risk_type_id, itemsPerRow) {
    return new Promise((resolve, reject) => {
        auth.getRiskType(risk_type_id).then(response => {
          var risktypedata = response
          console.log('getRiskType Response Data')
          console.log(risktypedata)
          if(risktypedata && risktypedata.length >= 1 ) {
            var risktypeobj = risktypedata[0]
            var output = {risktypeobj: risktypeobj, itemsPerRow: itemsPerRow}
            resolve(output)
          }
          else {
            const strError  = 'No data found for Risk Type id ' + risk_type_id
            reject(strError)
          }
        }).catch(error => {
          console.log(error)
          console.log('Error in getRiskType')
          reject(error)
        })
      })
}

//
function createRisk(risktype, riskFieldArray, inputFormFields) {
  const riskpostobj = processRiskFields(risktype, riskFieldArray, inputFormFields)
  console.log('Posting data to server')
  var strPostData = JSON.stringify(riskpostobj)
  console.log(strPostData)
    
  return new Promise((resolve, reject) => {
      auth.createRisk(riskpostobj).then(response => {
        var output = response
        console.log('createRisk Response Data')
        console.log(output)        
        resolve(output)
      }).catch(error => {
        console.log(error)
        console.log('Error in createRisk')
        reject(error)
      })
    })
}

function processRiskFields(risktype, riskFieldArray, inputFormFields) {
  var riskpostobj = new RiskPostData(risktype, 
                            inputFormFields.risk_name, inputFormFields.risk_description)
  let splicedRiskFields = null
  console.log('Inside processRiskFields')
  for(let i=0; i < riskFieldArray.length; ++i ) {
    splicedRiskFields = riskFieldArray[i]
    for (let splicedRiskField of splicedRiskFields) {
      console.log(splicedRiskField.risktypefield)
      console.log(splicedRiskField.risk_type_field_name)
      console.log(inputFormFields[splicedRiskField.risk_type_field_name])      
      riskpostobj.addRiskField(splicedRiskField.risktypefield,
        inputFormFields[splicedRiskField.risk_type_field_name])
    }   
  }
  // Object.keys(inputFormFields).forEach((key) => {
  //   console.log('key is' + key + 'Having value' + inputFormFields[key]);
  //   riskpostobj.addRiskField(key, inputFormFields[key])
  // });                            
  return riskpostobj
}