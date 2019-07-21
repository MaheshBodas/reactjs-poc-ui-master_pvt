import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                     onClick={() => {
                       this.toggle('1');
                     }}>
              <i className="icon-list"></i>
            </NavLink>
          </NavItem>          
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1" className="p-3">
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">ReactJS Paramount</small>                
                </div>
              <div className="text-truncate font-weight-bold">Powered by ReactJS & Redux</div>
              <small className=" text-muted"><p>An application to Create and View user defined entities. Implement dynamic forms with validations for entity creation.</p>
              </small>
            </div>            
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>   
              <div>
                <small className="text-muted">Development</small>                
              </div>           
              <div className="text-truncate font-weight-bold">Technology used</div>
              <small className="text-muted"><p>Developed using ReactJS, ES6, Element UI
															library, Node JS, Express server. Redux and Redux-Thunk as a middleware. </p>
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>              
              <div>
                <small className="text-muted">Unit testing</small>                
              </div>           
              <div className="text-truncate font-weight-bold">Tools used</div>
              <small className="text-muted"><p>Used Jest, Enzyme and Redux Mock Store for Unit testing of React Components, Redux actions, Redux reducers. </p>
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>              
              <div>
                <small className="text-muted">Authentication</small>
              </div>
              <div className="text-truncate font-weight-bold">Role based authorization</div>
              <small className="text-muted"><p>Allows only admin user to access all pages in application. Role based authorization further limits access to certain pages.</p>
              </small>
            </div>                        
          </TabPane>          
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
