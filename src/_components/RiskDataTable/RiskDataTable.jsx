import * as React from 'react';
import { Layout } from 'element-react';
import RiskDataCell from './../RiskDataCell/RiskTableCell';
// import './RiskDataTable.css';

export class RiskDataTable extends React.Component {
  _isMounted = false
    constructor(props) {
        super(props);     
        console.log('constructor RiskDataTable')
        this.renderRow = this.renderRow.bind(this);
    }
    componentDidMount() {      
      this._isMounted = true;
    }
  
    componentWillUnmount() {
      this._isMounted = false;
    }
  
    componentDidCatch(error, info) {
      console.log('componentDidCatch ' + error)                
    }

    renderRow = (_row, rowIndex) => {
      const {rows, isReadOnly,formInputState, handleChange} = this.props;
      return (
        <Layout.Row key={rowIndex} gutter="20">
          {rows[rowIndex].map((_cell, cellIndex) => {
            return (
              <RiskDataCell
                key={_cell.risk_type_field_name}
                isReadOnly = {isReadOnly}
                iColumn={_cell.risk_type_field_name}
                riskField={rows[rowIndex][cellIndex]} 
                formInputState={formInputState}             
                handleChange={handleChange}              
              />
            )
          })}
        </Layout.Row>
      )
    };

    render() {
      const {rows} = this.props;  
      let tbodyMarkup = null
      console.log("rows count in RiskDataTable")   
      if(this._isMounted) {
        tbodyMarkup = rows.map(this.renderRow);
        // console.log(tbodyMarkup)
      }  
      return (           
          <div>
            {tbodyMarkup}          
          </div> 
      );
    }
}

/* createTableForRiskFields() {      
  let table = []
  if(this.props.riskFieldArray) {
    let arrayofRiskFieldArray = this.props.riskFieldArray                
    for(let iRow=0 ; iRow < arrayofRiskFieldArray.length ; ++iRow) {
      const riskFieldArray = arrayofRiskFieldArray[iRow]
      const tableCells = []
      for(let iColumn=0;iColumn<riskFieldArray.length;++iColumn) {
        const riskField = riskFieldArray[iColumn]
        const tableCell = <Layout.Col span="8" key={iColumn}>
                            <Form.Item  label={riskField.risk_type_field_name} labelWidth="120px" size="mini">                                  
                              <RiskInput field_name={riskField.risk_type_field_name} field_type={riskField.risk_type_field_enum} isReadOnly={false} value={riskField.risk_field_value} render={this.setParent} />  
                            </Form.Item>
                          </Layout.Col>
        tableCells.push(tableCell)            
      }
      const tableRow = <Layout.Row key={iRow} gutter="20">{ tableCells }</Layout.Row>                      
      table.push(tableRow)        
  }      
  return table
  }
} */