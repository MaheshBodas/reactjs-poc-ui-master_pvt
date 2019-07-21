import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DateInput  from './../DateInput/DateInput'
import CurrencyInput from './../CurrencyInput/CurrencyInput'
import FloatInput from './../FloatInput/FloatInput'
import IntegerInput from './../IntegerInput/IntegerInput'
import TextInput from './../TextInput/TextInput'

export class RiskInput extends Component {
    // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    
    static propTypes = {         
      isReadOnly: PropTypes.bool.isRequired,      
      field_name: PropTypes.string.isRequired
    }
    constructor(props){
        super(props)        
        this.props = props 

        const inputcomponents = [  
            { name: 'date', visible: false, component: DateInput },
            { name: 'float', visible: false, component: FloatInput },
            { name: 'currency', visible: false, component: CurrencyInput },
            { name: 'integer', visible: false, component: IntegerInput },
            { name: 'text', visible: false, component: TextInput  }
        ];
        let inputComponent = inputcomponents.filter(inputcomponent => inputcomponent.name === this.props.field_type)
        // console.log('inputComponent')
        // console.log(inputComponent)        
        if(inputComponent !== null && inputComponent.length > 0) {
            inputComponent[0].visible = true
        }
        this.state = {
            componentArray: [...inputcomponents]
        };
    }        

    getShowHideComp(strCompType) {
        let bShowHide = false
        const oComponentArray = this.state.componentArray
        if(oComponentArray !== null) {
            let filteredComponent = oComponentArray.filter(inputcomponent => inputcomponent.name === strCompType)
            // console.log('filteredComponent')
            // console.log(filteredComponent)  
            if(filteredComponent !== null && filteredComponent.length > 0) {
                bShowHide = filteredComponent[0].visible
            }
        }
        
        return bShowHide
    }

    render() {  
        
      const oComponentArray = this.state.componentArray
      // console.log('oComponentArray')
      // console.log(oComponentArray) 
        return (  
                 <div>
                    { oComponentArray && this.getShowHideComp(oComponentArray[0].name) && <DateInput {...this.props} /> }
                    { oComponentArray && this.getShowHideComp(oComponentArray[1].name) && <FloatInput {...this.props} /> }
                    { oComponentArray && this.getShowHideComp(oComponentArray[2].name) && <CurrencyInput {...this.props} /> }
                    { oComponentArray && this.getShowHideComp(oComponentArray[3].name) && <IntegerInput {...this.props} /> }
                    { oComponentArray &&  this.getShowHideComp(oComponentArray[4].name) && <TextInput {...this.props} /> }
                 </div>
            
        );      
    }
}
export default RiskInput;