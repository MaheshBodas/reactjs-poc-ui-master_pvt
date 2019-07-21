import { viewsingleriskConstants, viewallrisksConstants } from './../_constants';
// Actions to be tested
import { createsingleriskActions, viewsingleriskActions , viewAllRisksActions} from './../_actions';
// import * as viewsingleriskActions from './../viewsinglerisk.actions';
import { Risk } from './../utils/risk'
import viewsinglerisk from './../_reducers/viewsinglerisk.reducer'

  

describe('viewsinglerisk reducer', () => {  
    const initialState = {
      riskobj : new Risk(0,0,'','','',[]),
      nRows : 0,
      splicedRiskFieldArray : null
    }
    
    it('should return the initial state', () => {
      const action = { type: 'dummy_action' }
      expect(viewsinglerisk(undefined, action)).toEqual([
        initialState
      ])
    })

    it('should handle GET_SINGLE_RISK', () => {
      expect(
        viewsinglerisk(initialState, {
          type: viewsingleriskConstants.GET_SINGLE_RISK,        
        })
      ).toEqual(
        {
          loading: true
        }
      )
    })

    it('should handle GET_SINGLE_RISK_SUCCESS', () => {
      const itemsPerRow = 2
      const riskinstance = require('./../_data/singlerisk.json')
      const get_single_risk_success_response_to_expect = require('./../_data/get_single_risk_success_response.json')
      expect(
        viewsinglerisk(initialState, {
          type: viewsingleriskConstants.GET_SINGLE_RISK_SUCCESS,
          riskinstance,
          itemsPerRow       
        })
      ).toEqual(
        get_single_risk_success_response_to_expect
      )
    })
})
  