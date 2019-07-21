import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Form, Table } from 'element-react';
import { viewAllRisksActions} from '../../_actions';
import styles from './ViewRiskGrid.css.js'
import './ViewRiskGrid.css';

import { ComposableContainer } from './../ComposableContainer/ComposableContainer'
import { ToggleContainer } from './../ToggleContainer/ToggleContainer'
import { RiskTypeList } from './../RiskTypeList/RiskTypeList'

// const ComposableContainer = React.lazy(() => import('./../ComposableContainer/ComposableContainer').then(module => ({ default: module.ComposableContainer })))
// const ToggleContainer = React.lazy(() => import('./../ToggleContainer/ToggleContainer').then(module => ({ default: module.ToggleContainer })))
// const RiskTypeList = React.lazy(() => import('./../RiskTypeList/RiskTypeList').then(module => ({ default: module.RiskTypeList })))


const emptySelectRiskInstance = {}
const emptyColumnNames = []
class ViewRiskGrid extends Component {
    _isMounted = false
    constructor(props) {
        super(props);     
        console.log('constructor ViewAllRiskCtrl')
        this.state = {
          isMounted: false      
        }; 
        this.props.resetAllRisks()
    }
    
    componentDidMount() {
      console.log(this.props.user)
      this._isMounted = true
    }
  
    componentWillUnmount() {
      this._isMounted = false
    }

    onRiskTypeChange = event => {
      const selectedValue = (event !== '') ? event : 'None'      
      console.log('onRiskTypeChange selectedValue is ' + selectedValue)
      
      // Fetch data related to selected RiskType
      if(selectedValue !== 'None') { 
        if(this._isMounted) {       
          this.props.getRisks(selectedValue)
        }
      } else {
        console.log('Dispacting resetAllRisks')        
        if(this._isMounted) {         
          this.props.resetAllRisks()
        }
      }
    }

    componentDidCatch(error, info) {
      console.log('componentDidCatch ' + error)                
    }    

    render() {
      const {type, message, riskInstancesTable, riskInstanceTableColumns} = this.props;      
      const errorInfo = {type: type, message: message}      
      const oRiskTableColumns = riskInstanceTableColumns || emptyColumnNames
      console.log('riskInstancesTable')    
      // console.log(riskInstancesTable)            
      return (
        <div>           
          <ComposableContainer showHeader={true}>
          {{
            header:(
              <Form ref="form" labelPosition="left" style={styles.formselectriskinstance}  model={emptySelectRiskInstance} label-position="left" label-width="130px">
                <Layout.Row gutter="20">
                    <Layout.Col span="8">
                      <Form.Item label="Select Risk Type" labelWidth="120px">                        
                        <RiskTypeList disabled={this.props.loading} onChange={this.onRiskTypeChange}></RiskTypeList>
                      </Form.Item> 
                    </Layout.Col>              
                </Layout.Row>
              </Form>     
            ),
            content: (
              <ToggleContainer loading={this.props.loading} shouldDisplayMain={this.props.shouldDisplayMain} 
                  showFooter={this.props.showFooter} hasError={this.props.hasError} showSuccess={this.props.showSuccessMsg}>
              {{
                warningmsg: (
                  <Form ref="warningform" labelPosition="left" style={{flex:1, align:'left', marginLeft:5}} model={emptySelectRiskInstance}>
                  <Layout.Row gutter="20">
                        <Layout.Col span="16">
                          <h4>Invalid Risk Type Name or No Data found</h4>
                        </Layout.Col>                                        
                  </Layout.Row>
                </Form>
                ),              
                content: (               
                  <div className="ui-tabs ui-widget ui-widget-content ui-corner-all">                      
                    { riskInstancesTable && <Table 
                          style={{width: '100%'}}                          
                          columns={oRiskTableColumns} 
                          data={riskInstancesTable}
                          height={250}
                     />
                    }                                       
                  </div>
                ),                
                errorInfo: errorInfo
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
    const { alert, authentication, viewallrisks } = state;        
    const { loggingIn } = authentication;
    const {type, message} = alert;
    const { risktype, riskInstancesTable, riskInstanceTableColumns, loading } = viewallrisks;        

    let shouldDisplayMain = false    
    let showFooter = false    
    let hasError = false
    
    if(riskInstancesTable && riskInstancesTable.length > 0) {
      shouldDisplayMain = true   
      showFooter = true
    }

    if(type === 'alert-danger') {
      hasError = true
      console.log('This is an error')
    }    
    console.log('mapStateToProps Single risk' + viewallrisks)    
    return {      
      loggingIn,
      type,
      message,
      shouldDisplayMain,
      showFooter,
      risktype,
      riskInstancesTable,
      riskInstanceTableColumns,
      loading,
      hasError
    }    
}

function mapDispatchToProps(dispatch) {
    return {        
        getRisks: (risktypeid) => dispatch( viewAllRisksActions.getRisks(risktypeid) ),        
        resetAllRisks: () => dispatch(viewAllRisksActions.resetAllRisks())
    }
}

const connectedViewRiskGrid = connect(mapStateToProps , mapDispatchToProps)(ViewRiskGrid);
export { connectedViewRiskGrid as ViewRiskGrid }; 
