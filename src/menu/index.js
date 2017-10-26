export default [
  {
    name: '首页',
    route: 'index',
    icon: 'ios-home'
  },
  {
    name: '测试页面0',
    route: 'Page0',
    icon: 'cube',
    children: [
      {
        name: '测试页面0-0',
        route: 'Page0-0'
      },
      {
        name: '测试页面0-1',
        route: 'Page0-1'
      },
      {
        name: '测试页面0-2',
        route: 'Page0-2'
      }
    ]
  },
  {
    name: '测试页面1',
    route: 'Page1',
    icon: 'leaf'
  },
  {
    name: '测试页面2',
    route: 'Page2',
    icon: 'magnet',
    children: [
      {
        name: '测试页面2-0',
        route: 'Page2-0'
      },
      {
        name: '测试页面2-1',
        route: 'Page2-1',
        children: [
          {
            name: '测试页面2-1-0',
            route: 'Page2-1-0'
          },
          {
            name: '测试页面2-1-1',
            route: 'Page2-1-1'
          }
        ]
      },
      {
        name: '测试页面2-2',
        route: 'Page2-2'
      }
    ]
  },
  {
    name: '测试页面3',
    route: 'Page3',
    icon: 'magnet'
  }
]
