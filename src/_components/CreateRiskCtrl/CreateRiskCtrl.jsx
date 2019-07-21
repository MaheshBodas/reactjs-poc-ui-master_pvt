import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Layout, Form, Notification } from 'element-react';
import { authenticationActions, createsingleriskActions} from '../../_actions';
import './CreateRiskCtrl.css';


import { RiskDataTable } from './../RiskDataTable/RiskDataTable'
import { RiskInput} from './../RiskInput/RiskInput'
import { ComposableContainer } from './../ComposableContainer/ComposableContainer'
import { ToggleContainer } from './../ToggleContainer/ToggleContainer'
import { RiskTypeList } from './../RiskTypeList/RiskTypeList'

// const RiskDataTable = React.lazy(() => import('./../RiskDataTable/RiskDataTable').then(module => ({ default: module.RiskDataTable })))
// const ComposableContainer = React.lazy(() => import('./../ComposableContainer/ComposableContainer').then(module => ({ default: module.ComposableContainer })))
// const ToggleContainer = React.lazy(() => import('./../ToggleContainer/ToggleContainer').then(module => ({ default: module.ToggleContainer })))
// const RiskTypeList = React.lazy(() => import('./../RiskTypeList/RiskTypeList').then(module => ({ default: module.RiskTypeList })))
// const RiskInput = React.lazy(() => import('./../RiskInput/RiskInput').then(module => ({ default: module.RiskInput })))


const emptyRiskobj = {}
const emptyDetailForm = {}
const emptyRiskFieldArray = []
const emptySelectRiskInstance = {}
const emptyRulesArray = {}
class CreateRiskCtrl extends Component {
    _isMounted = false
    constructor(props) {
        super(props);     
        console.log('constructor CreateRiskCtrl')           
        this.state = {              
          detailform: {}
        };        
        this.props.resetSingleRisk()
    }
    
    componentDidMount() {
      console.log(this.props.user)
      // document.addEventListener("click", this.handleClickOutside, true);
      this._isMounted = true
    };

    componentWillUnmount() {
      // document.removeEventListener("click", this.handleClickOutside, true);
      this._isMounted = false
    };

    onRiskTypeChange = event => {
      const selectedValue = (event !== '') ? event : 'None'      
      console.log('onRiskTypeChange selectedValue is ' + selectedValue)
      // Clear Form Input fields
      this.clearRiskFormData()
      // Fetch data related to selected RiskType
      if(selectedValue !== 'None') {
        if(this._isMounted) {
          this.props.getRiskFromType(selectedValue, 2)
        }        
      } else {
        console.log('Dispacting resetSingleRisk')   
        if(this._isMounted) {
          this.props.resetSingleRisk()
        }
      }
    }     
    
    onRiskInputChange = (event, field_name) => {
      if(this._isMounted) {
        this.setState({
          detailform: Object.assign({}, this.state.detailform, { [field_name]: event })
        }); 
      }
      console.log(event)
      console.log(this.state)
    }

    onChange(key, value) {
      if(this._isMounted) {
        this.setState({
          detailform: Object.assign({}, this.state.detailform, { [key]: value })
        });     
      } 
    }

    clearRiskFormData() {      
      if(this.refs.detailform) {
        this.refs.detailform.resetFields();
      }
      if(this._isMounted) {
        this.setState({
          detailform: Object.assign({}, {})
        });         
      }
    }

    resetRiskFormData() { 
      if(this._isMounted) {
        this.setState({
          detailform: Object.assign({}, this.state.detailform, this.props.inputFormFieldsObj)
        }); 
      }
      if(this.refs.detailform)          
        this.refs.detailform.resetFields();
    }

    onClickSubmit = event => {
      const {risktype} = this.props
      event.preventDefault();     
      this.refs.detailform.validate((valid) => {
        if (valid) {
          console.log('risktype is ' + risktype)
          console.log('this.state.detailform')
          console.log(this.state.detailform)
          Object.keys(this.state.detailform).forEach((key) => {
            console.log('key is ' + key + ' Having value ' + this.state.detailform[key]);              
          });                    
          
          this.props.createRisk(this.props.risktype, this.props.riskFieldArray, this.state.detailform).then(response => {          
            Notification({
              title: 'Success',
              message: 'Risk created successfully',
              type: 'success',
              duration: 2000
            })            
          }) 
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });      
    }
    
    onClickCancel = event => {      
      event.preventDefault();  
      this.resetRiskFormData()
      this.refs.detailform.resetFields();   
    }
    
     componentDidUpdate(prevProps) {        
      // if((this.props.risktype !== prevProps.risktype) && (this.props.risktype !== undefined) ) {
        if((this.props.inputFormFieldsObj !== prevProps.inputFormFieldsObj) && (this.props.inputFormFieldsObj !== undefined) ) {
          if(this._isMounted) {     
            this.setState({
              detailform: Object.assign({}, this.state.detailform, this.props.inputFormFieldsObj)
            });
          }
          console.log('componentDidUpdate => this.state.detailform'); 
          console.log(this.state.detailform);
        }
    } 

    componentDidCatch(error, info) {
      console.log('componentDidCatch ' + error)                
    }
    
    shouldDisplayMain() {
      let bDisplayMain = false
      if ( this.props.singlerisk && this.props.singlerisk.riskfields 
            && (this.props.singlerisk.riskfields.length > 0) ) {
              bDisplayMain = true
            }
      return bDisplayMain
    }
    
    hasStateLoaded(field_name) {
      let bFieldLoaded = false
      if(this.state.detailform !== undefined && this.state.detailform !== null ) {
        if(typeof(this.state.detailform[field_name]) !== "undefined"){
          bFieldLoaded = true
        }
      }
      return bFieldLoaded
    }

    render() {      
      const {type, message, createRiskSuccessMsg, isAdmin, loading} = this.props;      
      const propRules = this.props.propValidators_rules || emptyRulesArray
      const detailform = this.state.detailform || emptyDetailForm
      const oRiskFieldArray = this.props.riskFieldArray || emptyRiskFieldArray
      const errorInfo = {type: type, message: message} 
      const riskCreateSuccessMsg = {message: createRiskSuccessMsg} 
      const strUnauthorizeMsg = "You do not have permission to access this page."
      const strContactAdmin = "Please contact Site Admin."
      const strInvalidRiskTypeMsg = "Invalid Risk Type Name or No Data found"   
      return (
        <div>          
          <ComposableContainer showHeader={isAdmin}>
          {{
            header: (
              <Form ref="form" labelPosition="left" style={{flex:1, align:'left', marginLeft:5}}  model={emptySelectRiskInstance} label-position="left" label-width="130px">
                <Layout.Row gutter="20">
                    <Layout.Col span="8">
                    <Form.Item label="Select Risk Type" labelWidth="120px">                        
                      <RiskTypeList disabled={loading} onChange={this.onRiskTypeChange}></RiskTypeList>
                    </Form.Item> 
                    </Layout.Col>              
                </Layout.Row>
              </Form>  
            ),
            content: (
              <ToggleContainer loading={loading} shouldDisplayMain={this.props.shouldDisplayMain} 
                  showFooter={this.props.showFooter} hasError={this.props.hasError} showSuccess={this.props.showSuccessMsg}>
              {{
                warningmsg: (                  
                  <Form ref="warningform" labelPosition="left" style={{flex:1, align:'left', marginLeft:5}} model={emptyRiskobj}>
                  <Layout.Row gutter="20">
                        <Layout.Col span="16">
                          <h4>{isAdmin && strInvalidRiskTypeMsg}</h4>                          
                          { (!isAdmin) && <h4>                            
                            { strUnauthorizeMsg } <br />
                            { strContactAdmin }                                                       
                          </h4>
                          }
                        </Layout.Col>                                        
                  </Layout.Row>
                </Form>                
                ),              
                content: (               
                  <div className='ui-tabs ui-widget ui-widget-content ui-corner-all'>                
                  <Form id="detailform" ref="detailform" model={detailform} labelPosition="top" labelWidth="120px" size="mini"  rules={propRules} style={{flex:1, align:'left', marginLeft:5}} >
                  <Layout.Row  gutter="20">
                        <Layout.Col span="6">
                        { 
                          this.hasStateLoaded("risk_name") && 
                          <Form.Item label="Risk Name" prop="risk_name">                      
                              <RiskInput field_name="risk_name" field_type="text" value={this.state.detailform['risk_name']} formInputState={this.state.detailform} isReadOnly={false} handleChange ={this.onRiskInputChange} />  
                              {/* <Input value={this.state.detailform.risk_name} onChange={this.onChange.bind(this, 'risk_name')}/> */}
                          </Form.Item> 
                        }
                        </Layout.Col>                  
                        <Layout.Col span="6">
                          { 
                            this.hasStateLoaded("risk_description") &&
                              <Form.Item label="Risk Description" prop="risk_description">                                                      
                                <RiskInput field_name="risk_description" field_type="text" formInputState={this.state.detailform} isReadOnly={false} handleChange={this.onRiskInputChange} />  
                                {/* <Input value={this.state.detailform.risk_description} onChange={this.onChange.bind(this, 'risk_description')}/> */}
                              </Form.Item>
                          }
                        </Layout.Col>
                  </Layout.Row>                
                  {/* { this.createTableForRiskFields() }*/}              
                  { this.hasStateLoaded("risk_name") &&  <RiskDataTable rows={oRiskFieldArray} formInputState={this.state.detailform} isReadOnly={false} handleChange={this.onRiskInputChange}></RiskDataTable>
                  }
                </Form>
                </div>                
                ),
                footer: (
                  <Layout.Row gutter="20">
                        <Layout.Col span="16">
                        <Button type="primary" onClick={this.onClickSubmit} className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">Submit</Button>
                        <Button type="primary" onClick={this.onClickCancel} className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">Reset</Button>
                        </Layout.Col>                                        
                  </Layout.Row>                              
                ),
                errorInfo: errorInfo,                
                successMsg: riskCreateSuccessMsg
              }}
            </ToggleContainer>            
            )
          }}
          </ComposableContainer>
        </div>
      );      
    }
}

function mapStateToProps(state) {
    const { alert, authentication, createsinglerisk } = state;
    const { isAdmin, user, loggedIn } = authentication;
    const {type, message} = alert;
    const { singlerisk, risktype, rows, riskFieldArray, propValidators_rules, inputFormFieldsObj, createsingleriskoutput, loading} = createsinglerisk;    
    let shouldDisplayMain = false    
    let showFooter = false    
    let hasError = false
    let showSuccessMsg = false
    let createRiskSuccessMsg = ''    

    if(isAdmin && riskFieldArray && riskFieldArray.length > 0) {
      shouldDisplayMain = true   
      showFooter = true
    }

    if(createsingleriskoutput && createsingleriskoutput.risk_riskfields) {
      shouldDisplayMain = true   
      showFooter = true
    }

    if(type === 'alert-danger') {
      hasError = true
      console.log('This is an error')
    }
    if(createsingleriskoutput) {
      // showSuccessMsg = true
      createRiskSuccessMsg = 'Risk created successfully'
      console.log('mapStateToProps Create Single Risk output')    
      console.log(createsingleriskoutput)
    }
    // const {riskid} = (singlerisk!== null || singlerisk!== undefined) ? singlerisk.id : 0;
    console.log('mapStateToProps Single risk' + singlerisk)    
    return {      
      loggedIn,
      user,       
      type,
      message,
      singlerisk, 
      createsingleriskoutput,
      risktype,      
      rows, 
      riskFieldArray,
      propValidators_rules,
      inputFormFieldsObj,
      shouldDisplayMain,
      showFooter,
      showSuccessMsg,
      createRiskSuccessMsg,
      loading,
      isAdmin,
      hasError
    }
    //TBD 
}

function mapDispatchToProps(dispatch) {
    return {        
        getRiskFromType: (riskid, itemsPerRow) => dispatch( createsingleriskActions.getRiskFromType(riskid, itemsPerRow) ),        
        resetSingleRisk: () => dispatch(createsingleriskActions.resetSingleRisk()),
        createRisk: (risktype, riskFieldArray, inputFormFields) => dispatch( createsingleriskActions.createRisk(risktype, riskFieldArray, inputFormFields) ),
        getUserDetails : (userName) => dispatch( authenticationActions.getUserDetails(userName))      
    }
}

const connectedCreateRiskCtrl = connect(mapStateToProps , mapDispatchToProps)(CreateRiskCtrl);
export { connectedCreateRiskCtrl as CreateRiskCtrl }; 


// *****************   TBD to remove ****************
/* let inputFormFields = [];
let detailform = {};
inputFormFields.push({ ['risk_name']: '' });
inputFormFields.push({ ['risk_description']: '' });
inputFormFields.push({ ['model']: '' });
inputFormFields.push({ ['issuedate']: '' });
console.log(inputFormFields);
detailform = Object.assign({}, detailform, inputFormFields[0])
detailform = Object.assign({}, detailform, inputFormFields[1])
detailform = Object.assign({}, detailform, inputFormFields[2])
detailform = Object.assign({}, detailform, inputFormFields[3])
console.log(detailform);                       */

// let toggleContainer =
//           <ToggleContainer loading={this.state.listLoading} shouldDisplayMain={this.props.shouldDisplayMain} 
//               showFooter= {this.props.showFooter} hasError= {this.props.hasError} showSuccess={this.props.showSuccessMsg}>
//           {{
//             warningmsg: (
//               <Form ref="warningform" labelPosition="left" style={{flex:1, align:'left', marginLeft:5}} model={emptyRiskobj}>
//               <Layout.Row gutter="20">
//                     <Layout.Col span="16">
//                       <h4>Invalid Risk Type Name or No Data found</h4>
//                     </Layout.Col>                                        
//               </Layout.Row>
//             </Form>
//             ),              
//             content: (               
//               <div className='parent'>                
//               <Form id="detailform" ref="detailform" model={detailform} labelPosition="top" labelWidth="120px" size="mini"  rules={propRules} style={{flex:1, align:'left', marginLeft:5}} >
//               <Layout.Row  gutter="20">
//                     <Layout.Col span="6">
//                      { 
//                        this.hasStateLoaded("risk_name") && 
//                        <Form.Item label="Risk Name" prop="risk_name">                      
//                           <RiskInput field_name="risk_name" field_type="text" value={this.state.detailform['risk_name']} formInputState={this.state.detailform} isReadOnly={false} handleChange ={this.onRiskInputChange} />  
//                           {/* <Input value={this.state.detailform.risk_name} onChange={this.onChange.bind(this, 'risk_name')}/> */}
//                       </Form.Item> 
//                     }
//                     </Layout.Col>                  
//                     <Layout.Col span="6">
//                       { 
//                          this.hasStateLoaded("risk_description") &&
//                           <Form.Item label="Risk Description" prop="risk_description">                      
//                             <Input value={this.state.detailform.risk_description} onChange={this.onChange.bind(this, 'risk_description')}/>
//                             {/* <RiskInput field_name="risk_description" field_type="text" formInputState={this.state.detailform} isReadOnly={false} handleChange={this.onRiskInputChange} />   */}
//                           </Form.Item>
//                       }
//                     </Layout.Col>
//               </Layout.Row>                
//               {/* { this.createTableForRiskFields() }*/}              
//               <RiskDataTable rows={oRiskFieldArray} formInputState={this.state.detailform} isReadOnly={false} handleChange={this.onRiskInputChange}></RiskDataTable>
//             </Form>
//             </div>
//             ),
//             footer: (
//               <Layout.Row gutter="20">
//                     <Layout.Col span="16">
//                     <Button type="primary" onClick={this.onClickSubmit}>Submit</Button>
//                     </Layout.Col>                                        
//               </Layout.Row>                              
//             ),
//             successmsg: (
//               new Notification({
//                 title: 'Success',
//                 message: 'Risk created successfully',
//                 type: 'success',
//                 duration: 2000
//               })
//             ),
//             IErrorInfo: errorInfo
//           }}
//         </ToggleContainer>