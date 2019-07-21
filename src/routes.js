import React from 'react';

const Dashboard = React.lazy(() =>
  // import('./views/Dashboard/Dashboard').then(module => ({ default: module.Dashboard }))
  import('./views/Dashboard/Dashboard')
);

// const TestRiskInput = React.lazy(() => import('./_components/TestRiskInput'));

const ViewRiskCtrl = React.lazy(() =>
  // import('./_components/ViewRiskCtrl/ViewRiskCtrl').then(module => ({ default: module.ViewRiskCtrl }))
  import('./_components/ViewRiskCtrl/ViewRiskCtrl')
);

const CreateRiskCtrl = React.lazy(() =>
  import('./_components/CreateRiskCtrl/CreateRiskCtrl').then(module => ({ default: module.CreateRiskCtrl }))
);

const ViewRiskGrid = React.lazy(() =>
  import('./_components/ViewRiskGrid/ViewRiskGrid').then(module => ({ default: module.ViewRiskGrid }))
);

const CreateRiskTypeCtrl = React.lazy(() =>
  import('./_components/CreateRiskTypeCtrl/CreateRiskTypeCtrl').then(module => ({ default: module.CreateRiskTypeCtrl }))
);

const AboutMe = React.lazy(() =>
  import('./views/AboutMe/AboutMe')
);


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [  
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/create', exact: true, name: 'CreateRiskTypeCtrl', component: CreateRiskTypeCtrl },
  { path: '/create/createrisktypectrl', name: 'CreateRiskTypeCtrl', component: CreateRiskTypeCtrl },    
  { path: '/create/createriskctrl', name: 'CreateRiskCtrl', component: CreateRiskCtrl },    
  { path: '/view', exact: true, name: 'ViewRiskCtrl', component: ViewRiskCtrl },
  { path: '/view/viewriskctrl', name: 'ViewRiskCtrl', component: ViewRiskCtrl },    
  { path: '/view/viewriskgrid', name: 'ViewRiskGrid', component: ViewRiskGrid },  
  { path: '/aboutme', name: 'AboutMe', component: AboutMe },  
  
];

export default routes;
