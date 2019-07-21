// <RiskInput field_name={riskField.risk_type_field_name} field_type={riskField.risk_type_field_enum} formInputState={formInputState} value={riskField.risk_field_value} isReadOnly={false}  handleChange={handleChange} />  
import React from 'react'
import Enzyme from 'enzyme'
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16'
import RiskInput  from './../_components/RiskInput/RiskInput'


Enzyme.configure({ adapter: new Adapter() })

describe('RiskInput', () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });
  
  it('mount ReadOnly IntegerInput lazily', async()=> {
    const props =  {
      field_name: 'doors',
      field_type: 'integer',
      formInputState: {doors:4},
      value: 4,
      isReadOnly: true,
      // handleChange: jest.fn()
    }
    const root = Enzyme.mount(
        <RiskInput {...props}>            
        </RiskInput>
    )      
    
    expect(root.find('IntegerInput')).toHaveLength(1); 
    expect(root.find('IntegerInput').prop('field_name')).toBe('doors');     
    expect(root.find('IntegerInput').prop('field_type')).toBe('integer');     
    expect(root.find('IntegerInput').prop('isReadOnly')).toBe(true);     
    expect(root.find('IntegerInput').prop('value')).toBe(4);     
    
    expect(root.find('InputNumber')).toHaveLength(1);
    expect(root.find('InputNumber').prop('disabled')).toBe(true);  
    root.unmount(); 
    // expect(root).toMatchSnapshot();
  })
    
  it('rendered ReadOnly IntegerInput without crashing', () => {
    const props =  {
      field_name: 'doors',
      field_type: 'integer',
      formInputState: {doors:4},
      value: 4,
      isReadOnly: true,
      // handleChange: jest.fn()
    }
    const div = document.createElement('div');
    ReactDOM.render(<RiskInput {...props}></RiskInput>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  
  it('mount editable IntegerInput lazily', async()=> {
    const props =  {
      field_name: 'doors',
      field_type: 'integer',
      formInputState: {doors:4},
      value: 4,
      isReadOnly: false,
      handleChange: jest.fn()
    }
    const root = Enzyme.mount(
        <RiskInput {...props}>            
        </RiskInput>
    )          
    
    expect(root.find('IntegerInput')).toHaveLength(1); 
    expect(root.find('IntegerInput').prop('field_name')).toBe('doors');     
    expect(root.find('IntegerInput').prop('field_type')).toBe('integer');     
    expect(root.find('IntegerInput').prop('isReadOnly')).toBe(false);     
    expect(root.find('IntegerInput').prop('value')).toBe(4);     
    
    expect(root.find('InputNumber')).toHaveLength(1); 
    expect(root.find('InputNumber').prop('disabled')).not.toBeDefined();        

    root.unmount(); 
  })
    
  it('renders editable IntegerInput without crashing', () => {
    const props =  {
      field_name: 'doors',
      field_type: 'integer',
      formInputState: {doors:4},
      value: 4,
      isReadOnly: false,
      handleChange: jest.fn()
    }
    const div = document.createElement('div');
    ReactDOM.render(<RiskInput {...props}></RiskInput>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
 
  
  it('mount ReadOnly CurrencyInput lazily', async()=> {
    const props =  {
      field_name: 'amount',
      field_type: 'currency',
      formInputState: {amount:400.12},
      value: 400.12,
      isReadOnly: true,
      // handleChange: jest.fn()
    }
    const root = Enzyme.mount(
        <RiskInput {...props}>            
        </RiskInput>
    )    

    expect(root.find('CurrencyInput')).toHaveLength(1); 
    expect(root.find('CurrencyInput').prop('field_name')).toBe('amount');     
    expect(root.find('CurrencyInput').prop('field_type')).toBe('currency');     
    expect(root.find('CurrencyInput').prop('isReadOnly')).toBe(true);     
    expect(root.find('CurrencyInput').prop('value')).toBe(400.12);     
    
    expect(root.find('Input')).toHaveLength(1); 
    expect(root.find('Input').prop('readOnly')).toBeDefined();        
  
    root.unmount(); 
    //expect(root).toMatchSnapshot();
  })
    
  it('rendered ReadOnly CurrencyInput without crashing', () => {
    const props =  {
      field_name: 'amount',
      field_type: 'currency',
      formInputState: {amount:400.12},
      value: 400.12,
      isReadOnly: true,
      // handleChange: jest.fn()
    }
    const div = document.createElement('div');
    ReactDOM.render(<RiskInput {...props}></RiskInput>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('mount editable CurrencyInput lazily', async()=> {
    const props =  {
      field_name: 'amount',
      field_type: 'currency',
      formInputState: {amount:400.12},
      value: 400.12,
      isReadOnly: false,
      handleChange: jest.fn()
    }
    const root = Enzyme.mount(
        <RiskInput {...props}>            
        </RiskInput>
    )        
    
    expect(root.find('CurrencyInput')).toHaveLength(1); 
    expect(root.find('CurrencyInput').prop('field_name')).toBe('amount');     
    expect(root.find('CurrencyInput').prop('field_type')).toBe('currency');     
    expect(root.find('CurrencyInput').prop('isReadOnly')).toBe(false);     
    expect(root.find('CurrencyInput').prop('value')).toBe(400.12);     
    
    expect(root.find('Input')).toHaveLength(1); 
    expect(root.find('Input').prop('readOnly')).not.toBeDefined();        

    root.unmount(); 
  })
    
  it('rendered editable CurrencyInput without crashing', () => {
    const props =  {
      field_name: 'amount',
      field_type: 'currency',
      formInputState: {amount:400.12},
      value: 400.12,
      isReadOnly: false,
      handleChange: jest.fn()
    }
    const div = document.createElement('div');
    ReactDOM.render(<RiskInput {...props}></RiskInput>, div);
    ReactDOM.unmountComponentAtNode(div);
  });  

  
  it('mount ReadOnly TextInput lazily', async()=> {
    const props =  {
      field_name: 'model',
      field_type: 'text',
      formInputState: {model:'Mercedes'},
      value: 'Mercedes',
      isReadOnly: true,
      // handleChange: jest.fn()
    }
    const root = Enzyme.mount(
        <RiskInput {...props}>            
        </RiskInput>
    )        

    expect(root.find('TextInput')).toHaveLength(1); 
    expect(root.find('TextInput').prop('field_name')).toBe('model');     
    expect(root.find('TextInput').prop('field_type')).toBe('text');     
    expect(root.find('TextInput').prop('isReadOnly')).toBe(true);     
    expect(root.find('TextInput').prop('value')).toBe('Mercedes');     
    
    expect(root.find('Input')).toHaveLength(1); 
    expect(root.find('Input').prop('readOnly')).toBeDefined();  
    
    root.unmount(); 
  })
    
  it('rendered ReadOnly TextInput without crashing', () => {
    const props =  {
      field_name: 'model',
      field_type: 'text',
      formInputState: {model:'Mercedes'},
      value: 'Mercedes',
      isReadOnly: true,
      // handleChange: jest.fn()
    }
    const div = document.createElement('div');
    ReactDOM.render(<RiskInput {...props}></RiskInput>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  
  it('mount editable TextInput lazily', async()=> {
    const props =  {
      field_name: 'model',
      field_type: 'text',
      formInputState: {model:'Mercedes'},
      value: 'Mercedes',
      isReadOnly: false,
      handleChange: jest.fn()
    }
    const root = Enzyme.mount(
        <RiskInput {...props}>            
        </RiskInput>
    )

    expect(root.find('TextInput')).toHaveLength(1); 
    expect(root.find('TextInput').prop('field_name')).toBe('model');     
    expect(root.find('TextInput').prop('field_type')).toBe('text');     
    expect(root.find('TextInput').prop('isReadOnly')).toBe(false);     
    expect(root.find('TextInput').prop('value')).toBe('Mercedes');     
    
    expect(root.find('Input')).toHaveLength(1); 
    expect(root.find('Input').prop('readOnly')).not.toBeDefined();

    root.unmount(); 

  })
    
  it('rendered editable TextInput without crashing', () => {
    const props =  {
      field_name: 'model',
      field_type: 'text',
      formInputState: {model:'Mercedes'},
      value: 'Mercedes',
      isReadOnly: false,
      handleChange: jest.fn()
    }
    const div = document.createElement('div');
    ReactDOM.render(<RiskInput {...props}></RiskInput>, div);
    ReactDOM.unmountComponentAtNode(div);
  });


  it('mount ReadOnly DateInput lazily', async()=> {
    const props =  {
      field_name: 'issuedate',
      field_type: 'date',
      formInputState: {issuedate:'07/23/2004'},
      value: '07/23/2004',
      isReadOnly: true,
      // handleChange: jest.fn()
    }
    const root = Enzyme.mount(
        <RiskInput {...props}>            
        </RiskInput>
    )        
    expect(root.find('DateInput')).toHaveLength(1); 
    expect(root.find('DateInput').prop('field_name')).toBe('issuedate');     
    expect(root.find('DateInput').prop('field_type')).toBe('date');     
    expect(root.find('DateInput').prop('isReadOnly')).toBe(true);     
    expect(root.find('DateInput').prop('value')).toBe('07/23/2004');     
    
    expect(root.find('DatePicker')).toHaveLength(1); 
    expect(root.find('DatePicker').prop('isDisabled')).toBeDefined();  
    
    root.unmount(); 
  })
    
  it('rendered ReadOnly DateInput without crashing', () => {
    const props =  {
      field_name: 'issuedate',
      field_type: 'date',
      formInputState: {issuedate:'07/23/2004'},
      value: '07/23/2004',
      isReadOnly: true,
      // handleChange: jest.fn()
    }
    const div = document.createElement('div');
    ReactDOM.render(<RiskInput {...props}></RiskInput>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('mount editable DateInput lazily', async()=> {
    const props =  {
      field_name: 'issuedate',
      field_type: 'date',
      formInputState: {issuedate:'07/23/2004'},
      value: '07/23/2004',
      isReadOnly: false,
      handleChange: jest.fn()
    }
    const root = Enzyme.mount(
        <RiskInput {...props}>            
        </RiskInput>
    )        
    expect(root.find('DateInput')).toHaveLength(1); 
    expect(root.find('DateInput').prop('field_name')).toBe('issuedate');     
    expect(root.find('DateInput').prop('field_type')).toBe('date');     
    expect(root.find('DateInput').prop('isReadOnly')).toBe(false);     
    expect(root.find('DateInput').prop('value')).toBe('07/23/2004');     
    
    expect(root.find('DatePicker')).toHaveLength(1); 
    expect(root.find('DatePicker').prop('isDisabled')).not.toBeDefined();  

    root.unmount(); 
  })
    
  it('rendered editable DateInput without crashing', () => {
    const props =  {
      field_name: 'issuedate',
      field_type: 'date',
      formInputState: {issuedate:'07/23/2004'},
      value: '07/23/2004',
      isReadOnly: false,
      handleChange: jest.fn()
    }
    const div = document.createElement('div');
    ReactDOM.render(<RiskInput {...props}></RiskInput>, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
})
