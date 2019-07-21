export class RequiredFieldValidator {
    constructor(propName, triggerType) {
      this.prop_name = propName
      this.trigger_type = triggerType
      this.reqiredValidatorObj = null
      this.validationArray = null
      this.validationEntry = null      
    }
  }
  
  export class RequiredNumberFieldValidator extends RequiredFieldValidator {
  }

  
  export class RequiredIntegerFieldValidator extends RequiredFieldValidator {
    
  }
  
  
  export class RequiredValidatorBuilder {
    constructor(propName, triggerType) {
      this.propName = propName
      this.triggerType = triggerType
      this.propValidator = new RequiredFieldValidator(this.propName, this.triggerType)
    }
    addValidatorObject() {
      this.propValidator = new RequiredFieldValidator(this.propName, this.triggerType)
    }
    buildValidationArray() {
      this.propValidator.validationArray = []
      this.propValidator.reqiredValidatorObj = { required: true, message: `${this.propValidator.prop_name} is required`, trigger: this.propValidator.trigger_type }
      this.propValidator.validationArray.push(this.propValidator.reqiredValidatorObj)
      // console.log(this.propValidator.validationArray)
      return this.propValidator.validationArray
    }
    buildValidationObjectEntry() {
      this.propValidator.validationEntry = { 'key': this.propValidator.prop_name, 'obj': this.propValidator.validationArray }
    }
    build() {
      // this.addValidatorObject()
      this.buildValidationArray()
      this.buildValidationObjectEntry()
      var ovalidationEntry = this.getValidationObjectEntry()
      return ovalidationEntry
    }
    getValidationObjectEntry() {
      return this.propValidator.validationEntry
    }
  }
  export class RequiredNumberValidatorBuilder extends RequiredValidatorBuilder {
    constructor(propName, triggerType) {
      super(propName,'blur')
      this.propName = propName
      this.triggerType = triggerType
      this.propValidator = new RequiredIntegerFieldValidator(this.propName, this.triggerType)
    }
    addValidatorObject() {
      this.propValidator = new RequiredNumberFieldValidator(this.propName, this.triggerType)
    }
    buildValidationArray() {
      const oValidatorFunc = (rule, value, callback) => {   
        let parsedValue = parseFloat(value)
        if (!Number.isFinite(parsedValue)) {
          callback(new Error('Please input digits'));
        } else{
          if (value < 0) {
            callback(new Error('Value must be greater than 0'));
        } else {
            callback();
          }
        }
      }
      this.numValidatorChangeObj = { validator: oValidatorFunc, trigger: 'change'}
      this.numValidatorBlurObj = { validator: oValidatorFunc, trigger: 'blur'}
      this.propValidator.validationArray = super.buildValidationArray()
      
      this.propValidator.validationArray.push(this.numValidatorChangeObj)
      this.propValidator.validationArray.push(this.numValidatorBlurObj)
    }    
    buildValidationArray1() {
      this.numberValidatorObj = { type: 'number', message: `${this.propValidator.prop_name} must be a number` }
      this.propValidator.validationArray = super.buildValidationArray()
      this.propValidator.validationArray.push(this.numberValidatorObj)
    }
  } 
    
  export class RequiredIntegerValidatorBuilder extends RequiredValidatorBuilder {
    constructor(propName, triggerType) {
      super(propName,'blur')
      this.propName = propName
      this.triggerType = triggerType
      this.propValidator = new RequiredIntegerFieldValidator(this.propName, this.triggerType)
    }
    addValidatorObject() {
      this.propValidator = new RequiredIntegerFieldValidator(this.propName, this.triggerType)
    }    
         
    buildValidationArray() {
      const oValidatorFunc = (rule, value, callback) => {   
        let parsedValue = parseInt(value)
        if (!Number.isInteger(parsedValue)) {
          callback(new Error('Please input digits'));
        } else{
          if (value < 0) {
            callback(new Error('Value must be greater than 0'));
        } else {
            callback();
          }
        }
      }
      this.intValidatorChangeObj = { validator: oValidatorFunc, trigger: 'change'}
      this.intValidatorBlurObj = { validator: oValidatorFunc, trigger: 'blur'}
      // ToDo working code
      /* this.intValidatorObj = { validator: (rule, value, callback) => {
        var age = parseInt(value, 10);
        if (!Number.isInteger(age)) {
          callback(new Error('Please input digits'));
        } else{
          if (age < 0) {
            callback(new Error('Age must be greater than 0'));
        } else {
            callback();
          }
        }
      }, trigger: 'change' } */
      // ToDo working code
      this.propValidator.validationArray = super.buildValidationArray()
      // this.propValidator.validationArray = []
      this.propValidator.validationArray.push(this.intValidatorChangeObj)
      this.propValidator.validationArray.push(this.intValidatorBlurObj)
    }
  }

  export function createValidationEntryFor(propName, eventTriggerType) {
    var oValidatorBuilder = null  
    oValidatorBuilder = new RequiredValidatorBuilder(propName, eventTriggerType)
    return oValidatorBuilder
  }

  export function getKeyValuePairFor(propValidators) {
    let propValidatorsTypeKeyValue = null
    if(propValidators !== null) {
      propValidatorsTypeKeyValue = propValidators.reduce((acc, cur) => {
        acc[cur.key] = cur.obj
        return acc
      }, {})      
    }
    return propValidatorsTypeKeyValue
  }

  export function buildPropValidationKeyValueFor(validators) {    
    let validationEntries = []   
    for (let validator of validators) {
      // console.log(validator)
      var oValidatorBuilder = new RequiredValidatorBuilder(validator["propName"],
        validator["eventTriggerType"])
        const ovalidationEntry = oValidatorBuilder.build()
        validationEntries.push(ovalidationEntry)      
    }
    // console.log("validationEntries")
    // console.log(validationEntries.length)
    return getKeyValuePairFor(validationEntries)
  }


  export default { RequiredFieldValidator }