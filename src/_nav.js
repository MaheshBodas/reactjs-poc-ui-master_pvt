export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    {
      divider: true,
    },    
    
    {
      name: 'Create Risk',
      url: '/create',
      icon: 'icon-star',
      children: [        
        {
          name: 'Risk Type',
          url: '/create/createrisktypectrl',
          icon: 'icon-bell',
        },
        {
          name: 'Risk Instance',
          url: '/create/createriskctrl',
          icon: 'icon-bell',
        },
      ],
    },
    {
      divider: true,
    },    
    {
      name: 'View Risk',
      url: '/view',
      icon: 'icon-star',
      children: [
        {
          name: 'Single Risk',
          url: '/view/viewriskctrl',
          icon: 'icon-bell',
        },
        {
          name: 'All Risks',
          url: '/view/viewriskgrid',
          icon: 'icon-bell',
        },                            
      ],
    },       
    {
      name: 'About Me',
      url: '/aboutme',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },  
  ],
};
