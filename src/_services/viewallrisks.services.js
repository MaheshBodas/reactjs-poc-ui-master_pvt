import auth from '../api/auth'
export const viewallrisksService = {
    getRisks    
};

function getRisks(risk_type_id) {
    return new Promise((resolve, reject) => {
        auth.getRisks(risk_type_id).then(response => {
          const riskinstances = response
          if(riskinstances !== null) {
            resolve(riskinstances)
          }
          else {
            const strError  = 'No data found for Risks'
            reject(strError)
          }
        }).catch(error => {
          console.log('Error in getRisks')
          reject(error)
        })
      })
}
