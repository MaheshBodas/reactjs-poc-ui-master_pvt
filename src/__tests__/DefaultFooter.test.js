import React from 'react';
import ReactDOM from 'react-dom';
import DefaultFooter from '../containers/DefaultLayout/DefaultFooter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DefaultFooter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
