
export class Risk {
  constructor(id, risktype, risk_type_name, risk_name, risk_description, riskfields) {
    this.id = id
    this.risktype = risktype
    this.risk_type_name = risk_type_name
    this.risk_name = risk_name
    this.risk_description = risk_description
    this.riskfields = []
  }
}
export default Risk
