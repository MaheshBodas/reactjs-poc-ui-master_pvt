export class RiskFieldPostData {
    constructor(risktypefield, risk_field_value) {
      this.risktypefield = risktypefield
      this.risk_field_value = risk_field_value
    }
  }
  
  export class RiskPostData {
    constructor(risktype, risk_name, risk_description) {
      this.risktype = risktype
      this.risk_name = risk_name
      this.risk_description = risk_description
      this.risk_riskfields = []
    }
    resetRiskData() {
      this.risktype = ''
      this.risk_name = ''
      this.risk_description = ''
      this.risk_riskfields = []
    }
    addRiskField(risktypefield, risk_field_value) {
      var riskdataObj = new RiskFieldPostData(risktypefield, risk_field_value)
      this.risk_riskfields.push(riskdataObj)
    }
  }
  
  
  //

  export class RiskCtrlConst {
  }
  RiskCtrlConst.CarouselHelpText = [
    {
      'id': 1,
      'text': 'User can create Risk Instance based on Risk types.'
    },
    {
      'id': 2,
      'text': 'Select appropriate Risk Type from dropdown box.'
    },
    {
      'id': 3,
      'text': 'Fill up all Risk Instance fields and submit form.'
    },
    {
      'id': 4,
      'text': 'Admin user can define Risk Types. Contact admin in case of any issues.'
    }
  ]
  
  