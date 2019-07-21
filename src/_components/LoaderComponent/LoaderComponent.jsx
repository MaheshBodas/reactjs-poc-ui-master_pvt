import React from "react"
import logo from './../../_images/ListLoading.gif'
import { Col, Container, Row } from 'reactstrap';
// var splitterStyle = {
//  height: 100,
//  width: 100
// }
// const divStyle = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//     // display: 'flex', 
//     justifyContent: 'center', 
//     alignItems: 'center',
//     // backgroundColor: rgba(0, 0, 0, 0),
//     backgroundRepeat: 'no-repeat',
//     // paddingTop: 257,
//     // backgroundSize: {'height': `${500}px`, 'width': `${500}px` },
//     backgroundImage: `url(${logo})`,
//     backgroundSize: 'contain'   
//   };

 
const divStyle = {
    opacity:0.5
}
export const LoaderComponent = (scope) => (    
    // <div className="cComponent" style={divStyle} >        
    // </div>
    <div className="app flex-row align-items-top"style={divStyle}>
          <Container>
            <Row className="justify-content-center">
              <Col md="4">
                <img alt="Loading" src={logo } />              
              </Col>
            </Row>
          </Container>
        </div>      
    // <div style={divStyle}>
    //     {/* <img alt="Loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> */}
    //     <img alt="Loading" src={logo } />
    //     {/* <img alt="Loading" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></img> */}
    // </div>
)