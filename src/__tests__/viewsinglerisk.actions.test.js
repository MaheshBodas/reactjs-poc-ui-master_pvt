import configureMockStore  from 'redux-mock-store';
import thunk from 'redux-thunk'
import mockAxios from 'axios'
import { viewsingleriskConstants, alertConstants } from './../_constants';
// Actions to be tested
import { viewsingleriskActions } from './../_actions';
// import * as viewsingleriskActions from './../viewsinglerisk.actions';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore();

// Helper functions
function findAction(store, type) {
  return store.getActions().find(action => action.type === type);
}

export function getAction(store, type) {
  const action = findAction(store, type);
  if (action) return Promise.resolve(action);

  return new Promise(resolve => {
    store.subscribe(() => {
      const action = findAction(store, type);
      if (action) resolve(action);
    });
  });
}
//

describe('viewsingleriskActions', () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });
      describe("getRisk", () => {
        const riskid = 1
        const itemsPerRow = 2                      
                
        it("creates GET_SINGLE_RISK_SUCCESS when fetching single Risk has been done'", () => {                                         
          const riskinstances = [{id:1, val:2}, {id:3, val:4}]
          mockAxios.get.mockImplementationOnce(() =>
              Promise.resolve(riskinstances)
          ) 
          const expectedActions = [ 
            { type: viewsingleriskConstants.GET_SINGLE_RISK, riskid: 1 },
            { type: viewsingleriskConstants.GET_SINGLE_RISK_SUCCESS, riskinstance: { id: 1, val: 2 }, itemsPerRow: 2 },
            { type: alertConstants.CLEAR } 
          ]
          // await store.dispatch(viewsingleriskActions.getRisk(riskid, itemsPerRow))
          return store.dispatch(viewsingleriskActions.getRisk(riskid, itemsPerRow)).then(() => {
            // const actions = store.getActions();
            // console.log(actions)          
            expect(store.getActions()).toEqual(expectedActions)          
          });      
        });

        //
        it("creates GET_SINGLE_RISK_FAILURE when fetching single Risk has failed'", () => {                                         
          const riskinstance = {dummy:1} 
          mockAxios.get.mockImplementationOnce(() =>
              Promise.resolve(riskinstance)
          ) 
          const expectedActions = [ 
            { type: viewsingleriskConstants.GET_SINGLE_RISK, riskid: 1 },
            { type: viewsingleriskConstants.GET_SINGLE_RISK_FAILURE, error: 'No data found for Risk id 1' },
            { type: alertConstants.ERROR, message: 'No data found for Risk id 1' } 
          ]
          // await store.dispatch(viewsingleriskActions.getRisk(riskid, itemsPerRow))
          return store.dispatch(viewsingleriskActions.getRisk(riskid, itemsPerRow)).then(() => {
            // const actions = store.getActions();
            // console.log(actions)          
            expect(store.getActions()).toEqual(expectedActions)          
          });      
        });      
    });
    
    describe("resetSingleRisk", () => {              
      it("creates GET_SINGLE_RISK_SUCCESS when fetching single Risk has been done'", () => {                                                  
        const expectedActions = [ 
          { type: viewsingleriskConstants.RESET_VIEW_SINGLE_RISK }, 
          { type: 'ALERT_CLEAR' } 
        ]        
        store.dispatch(viewsingleriskActions.resetSingleRisk())
        const actions = store.getActions();
        console.log(actions)          
        expect(store.getActions()).toEqual(expectedActions)                  
      });
    })
  });