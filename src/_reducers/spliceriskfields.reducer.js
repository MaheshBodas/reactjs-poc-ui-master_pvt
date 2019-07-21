import { viewsingleriskConstants } from '../_constants';
function rowCount(riskfields, itemsPerRow) {
  if (riskfields !== null) {
    return Math.ceil(riskfields.length / itemsPerRow)
  } else {
    return 0
  }
}
function itemsInRow(riskfields,itemsPerRow,index) {
  if(riskfields)
    return riskfields.slice((index - 1) * itemsPerRow, index * itemsPerRow)
}
export function spliceriskfields(state = {}, action) {
  switch (action.type) {
    case viewsingleriskConstants.SPLICE_RISK_FIELDS:
      // Splice the passed in riskfields and return object containing
      // Number of rows and spliced jagged array of riskfields containing 
      // passed number of riskfields per row
      return {
        loading: true
      };      
    case viewsingleriskConstants.START_SPLICE_RISK_FIELDS:     
      const itemsPerRow = action.itemsPerRow
      const riskfields = { ...action.riskfields }
      let splicedRiskFieldArray = []
      let splicedRiskFields = null      
      const nRows = rowCount(riskfields, action.itemsPerRow)
      for(let i=0; i < nRows; ++i ) {
        splicedRiskFields = itemsInRow(riskfields, itemsPerRow, i) 
        splicedRiskFieldArray.push([splicedRiskFields])       
      }      
      return {
        nRows,
        splicedRiskFieldArray,
        itemsPerRow
      };
    case viewsingleriskConstants.SPLICE_RISK_FIELDS_FAILURE:      
      return { 
        error: action.error
      };
    default:
      return state
  }
}