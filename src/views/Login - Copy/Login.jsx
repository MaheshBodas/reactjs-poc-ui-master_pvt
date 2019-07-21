import React, { Component } from 'react';
import { Alert, Card, CardBody, CardGroup, Col, Container, Form, Row } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { authenticationActions } from '../../_actions';

class Login extends Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        // const { dispatch } = this.props;
        if (username && password) {
            // dispatch(userActions.login(username, password));
            this.props.login(username, password)
        }
    }

    render() {
      const { loggingIn } = this.props;
      const {type: alert_type , message} = this.props;
      const { username, password, submitted } = this.state;
      let parsedErrorMessage = ''
      console.log('alertType ' + alert_type) 
      console.log('message ' + message) 
      if(alert_type === 'alert-danger') {
        if(message != null) {
          console.log(message)
          try {
            const errorObj = JSON.parse(message)     
            if(errorObj)  {
              parsedErrorMessage = errorObj['non_field_errors'][0]          
            }
          }
          catch(err){
            parsedErrorMessage = message
          }                  
        }
        else {
          parsedErrorMessage = "Some unexpected error"
        }
      }      
      return (      
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="4">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>                          
                          <label htmlFor="username">Username</label>
                          <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />                          
                          {submitted && !username &&
                              <div className="help-block">Username is required</div>
                          }
                        </div>                        
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                          <table>
                            <tr>
                              <td>
                                <label htmlFor="password">Password</label>
                              </td>
                            </tr>
                            <tr>
                              <td>
                              <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />                              
                              </td>
                              <td>&nbsp;&nbsp;</td>
                              <td>
                              <i className="fa fa-key fa-lg mt-4"></i>
                              </td>
                            </tr>
                          </table>
                          {submitted && !password &&
                              <div className="help-block">Password is required</div>
                          }
                        </div>
                        <Row>
                          <Col xs="6">
                          <div className="form-group">
                            <button className="btn btn-primary">Login</button>
                            {loggingIn &&
                                <img alt="Loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }                        
                          </div>
                          </Col>                        
                        </Row>
                        <Row>
                          <Col xs="12">
                          { alert_type === 'alert-danger' && <Alert color="danger">
                            { parsedErrorMessage }
                          </Alert> }
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>                
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>      
      );
    }
}

function mapStateToProps(state) {
    // const { loggingIn } = state.authentication;    
    // return {
    //     loggingIn
    // };
    //TBD
    const { alert, authentication } = state;        
    const { loggingIn } = authentication;
    const {type, message} = alert;
    return {      
      loggingIn,
      type,
      message
    }
    //TBD 
}

function mapDispatchToProps(dispatch) {
    return {
        // dispatching plain actions
        login: (username, password) => dispatch( authenticationActions.login(username, password) ),
        logout: () => dispatch( authenticationActions.logout ),
    }
}

const connectedLoginPage = connect(mapStateToProps , mapDispatchToProps)(Login);
export { connectedLoginPage as Login }; 