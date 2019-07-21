// TBD remove
// https://github.com/cornflourblue/react-redux-registration-login-example/blob/master/src/HomePage/HomePage.jsx
// https://tylermcginnis.com/react-router-protected-routes-authentication/
// TBD remove
import auth from '../api/auth'
// import { setToken, removeToken } from '../utils/auth'
export const viewsingleriskService = {
    getRisk    
};

function getRisk(risk_id, itemsPerRow) {
    return new Promise((resolve, reject) => {
        auth.getRisk(risk_id).then(response => {
          var riskdata = response
          console.log('getRisk Response Data')
          console.log(riskdata)
          if(riskdata && riskdata.length >= 1 ) {
            const riskinstance = riskdata[0]  
            const output = Object.assign({},{riskinstance, itemsPerRow}) 
            console.log('service output')
            console.log(output)
            // resolve(riskdata)
            resolve(output)
          }
          else {
            const strError  = 'No data found for Risk id ' + risk_id
            reject(strError)
          }
          
        }).catch(error => {
          console.log(error)
          console.log('Error in getRisk')
          reject(error)
        })
      })
}


// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         console.log('server response')
//         console.log(data)
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();                
//                 window.location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }
//         console.log('Token' + data.key)
//         return data;
//     });
// }