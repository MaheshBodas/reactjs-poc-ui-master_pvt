import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Form, Input } from 'element-react';
import { viewsingleriskActions} from '../../_actions';
import './ViewRiskCtrl.css';

import { RiskDataTable } from './../RiskDataTable/RiskDataTable'
import { ComposableContainer } from './../ComposableContainer/ComposableContainer'
import { ToggleContainer } from './../ToggleContainer/ToggleContainer'
import { RiskList } from './../RiskList/RiskList'

// const RiskDataTable = React.lazy(() => import('./../RiskDataTable/RiskDataTable').then(module => ({ default: module.RiskDataTable })))
// const ComposableContainer = React.lazy(() => import('./../ComposableContainer/ComposableContainer').then(module => ({ default: module.ComposableContainer })))
// const ToggleContainer = React.lazy(() => import('./../ToggleContainer/ToggleContainer').then(module => ({ default: module.ToggleContainer })))
// const RiskList = React.lazy(() => import('./../RiskList/RiskList').then(module => ({ default: module.RiskList })))
// import { RiskInput } from './../RiskInput/RiskInput'

const emptyRiskobj = {}
const emptySelectRiskInstance = {}
export class ViewRiskCtrl extends Component {    
  _isMounted = false;
  constructor(props) {
    super(props);     
    console.log('constructor ViewRiskCtrl')
    this.props.resetSingleRisk()
  }
    
  componentDidMount() {
    console.log(this.props.user)
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidCatch(error, info) {
    console.log('componentDidCatch ' + error)                
  }
    
  onRiskInstanceChange = event => {
      const selectedValue = (event !== '') ? event : 'None'
      console.log('onChange selectedValue is ' + selectedValue)
      if(selectedValue !== 'None') {  
        if(this._isMounted) {
          this.props.getRisk(selectedValue, 2)
        }
      } else {
        console.log('Dispacting resetSingleRisk')     
        if(this._isMounted) {
          this.props.resetSingleRisk()
        }          
      }
    }

    
    // componentDidMount() {
    //   // this.props.getRisk(1, 2)        
    // }

    // componentDidUpdate(prevProps) {
    //   if((this.props.riskid !== prevProps.riskid) && (this.props.riskid !== undefined) ) {
    //     // alert(this.props.riskid)        
    //   }
    // }    

    /* setListLoading(isLoading) {
      this.setState({ listLoading: isLoading });
    } */

    shouldDisplayTable() {
      let bshouldDisplayTable = false
      if ( this.props.riskFieldArray 
            && (this.props.riskFieldArray.length > 0) ) {
              bshouldDisplayTable = true
            }
      return bshouldDisplayTable
    }
    
    render() {      
      const singleRiskobj = this.props.singlerisk || emptyRiskobj        
      // const {type: alert_type , message} = this.props;   
      const {type, message} = this.props;    
      const errorInfo = {type: type, message: message} 
      let toggleContainer =
          <ToggleContainer loading={this.props.loading} shouldDisplayMain={this.props.shouldDisplayMain} hasError= {this.props.hasError}>
          {{
            warningmsg: (
              <Form ref="warningform" id='5' labelPosition="left" labelWidth="120px" size="mini" style={{flex:1, align:'left', marginLeft:5}} model={emptyRiskobj}>
              <Layout.Row gutter="20">
                    <Layout.Col span="16">
                      <h4>Invalid Risk Name or No Data found</h4>
                    </Layout.Col>                                        
              </Layout.Row>
            </Form> 
            ),              
            content: (
              <div className='ui-tabs ui-widget ui-widget-content ui-corner-all'>
              <Form ref="detailform" labelPosition="top" labelWidth="120px" size="mini"  style={{flex:1, align:'left', marginLeft:5}} model={singleRiskobj}>
              <Layout.Row  gutter="20">
                    <Layout.Col span="6">
                    <Form.Item  label="Risk Name">
                      <Input readOnly value={singleRiskobj.risk_name}></Input>  
                      </Form.Item>
                    </Layout.Col>                  
                    <Layout.Col span="6">
                      <Form.Item label="Risk Description">
                      <Input readOnly value={singleRiskobj.risk_description}></Input>
                      </Form.Item>
                    </Layout.Col>
              </Layout.Row>                              
             { this.shouldDisplayTable() && <RiskDataTable rows={this.props.riskFieldArray} isReadOnly={true}></RiskDataTable> }
            </Form>
            </div>
            ),
            errorInfo: errorInfo
            // alert: (
            //   {alert_type, message}
            // )              
          }}
        </ToggleContainer>
      return (
        <div>           
          <ComposableContainer showHeader={true}>
          {{
            header:(
              <Form ref="form" labelPosition="left" style={{flex:1, align:'left', marginLeft:5}}  model={emptySelectRiskInstance} label-position="left" label-width="130px">
                <Layout.Row gutter="20">
                    <Layout.Col span="8">
                    <Form.Item label="Select Risk" labelWidth="120px">                        
                      <RiskList disabled={this.props.loading} onChange={this.onRiskInstanceChange}></RiskList>
                    </Form.Item> 
                    </Layout.Col>              
                </Layout.Row>
              </Form>     
            ),
            content: (
              toggleContainer
            )
          }}
          </ComposableContainer>
        </div>
      );      
    }
}

function mapStateToProps(state) {    
    const { alert, authentication, viewsinglerisk } = state;        
    const { loggingIn } = authentication;
    const {type, message} = alert;
    const { singlerisk, riskid, rows, riskFieldArray, loading} = viewsinglerisk;     

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
      loggingIn,
      type,
      message,
      singlerisk, 
      riskid,  
      rows, 
      riskFieldArray,
      shouldDisplayMain,
      loading,
      hasError
    }
    //TBD 
}

function mapDispatchToProps(dispatch) {
    return {        
        getRisk: (riskid, itemsPerRow) => dispatch( viewsingleriskActions.getRisk(riskid, itemsPerRow) ),        
        resetSingleRisk: () => dispatch(viewsingleriskActions.resetSingleRisk()),
    }
}

// export default connect(mapStateToProps , mapDispatchToProps)(ViewRiskCtrl);
// const connectedViewRiskCtrl = connect(mapStateToProps , mapDispatchToProps)(ViewRiskCtrl);
// export { connectedViewRiskCtrl as ViewRiskCtrl }; 

const ConnectedViewRiskCtrl = connect(mapStateToProps , mapDispatchToProps)(ViewRiskCtrl);
export default ConnectedViewRiskCtrl