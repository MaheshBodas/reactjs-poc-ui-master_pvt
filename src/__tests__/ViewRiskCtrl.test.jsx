import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter, Route} from 'react-router-dom';
import configureStore from 'redux-mock-store'; // Smart components
// import {shallow, configure} from 'enzyme/build';
import Enzyme, { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import  {ViewRiskCtrl}  from './../_components/ViewRiskCtrl/ViewRiskCtrl'
import { RiskList } from './../_components/RiskList/RiskList'
import {ComposableContainer} from './../_components/ComposableContainer/ComposableContainer'

configure({ adapter: new Adapter() });

function mapStateToProps(state) {      
  const {type, message} = {type:'', message:'' };
  const { singlerisk, riskid, rows, riskFieldArray, loading} = state;     

  let shouldDisplayMain = false   
  let hasError = false     
  if(riskFieldArray && riskFieldArray.length > 0) {
    shouldDisplayMain = true         
  }
  if(type === 'alert-danger') {
    hasError = true
  }
  // const {riskid} = (singlerisk!== null || singlerisk!== undefined) ? singlerisk.id : 0;
  console.log('mapStateToProps Single risk' + singlerisk)    
  return {          
    type,
    message,
    singlerisk, 
    riskid,  
    rows, 
    riskFieldArray,
    shouldDisplayMain,
    loading,
    hasError,
    getRisk: jest.fn(),
    resetSingleRisk: jest.fn()
  } 
}
function setup() {
  // const get_single_risk_success_response_to_expect = require('./../_data/get_single_risk_success_response.json')
  // const props = mapStateToProps(get_single_risk_success_response_to_expect)
  const props =  {
    user: 'mahesh.bodas',
    loggedIn: true,
    type : '',
    message: '',      
    loading: false,
    isAdmin : true,
    hasError: false,    
    getRisk: jest.fn(),
    resetSingleRisk: jest.fn()   
  }
 
  const wrapper = Enzyme.shallow(<ViewRiskCtrl {...props}/>);  
  return {
    props,
    wrapper
  }
}
// const componentDidMountSpy = jest.spyOn(ViewRiskCtrl.prototype, 'componentDidMount');  
describe('components', () => {
  describe('Header', () => {
    it('should render self and subcomponents', () => {
      const { props, wrapper } = setup()
      // const component = wrapper.dive();
      // expect(ViewRiskCtrl.prototype.componentDidMount).toHaveBeenCalledTimes(1);
      expect(props.resetSingleRisk).toHaveBeenCalledTimes(1);
      // expect(wrapper.find('RiskList')).to.have.lengthOf(1);
      // expect(wrapper.find(ComposableContainer)).to.have.lengthOf(1);
      wrapper.unmount()
      // componentDidMountSpy.mockClear();
      // expect(wrapper.find(RiskList)).to.have.lengthOf(1);
      // expect(wrapper.find(ComposableContainer)).to.have.lengthOf(1);
    })

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<MemoryRouter><Route path="/view/ViewRiskCtrl" name="ViewRiskCtrl" component={ViewRiskCtrl} /></MemoryRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  })
})