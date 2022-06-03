/**
 * 配置数据
 */
module.exports = {
  appName: 'erpweb',
  apiDomain: 'https://jsonplaceholder.typicode.com',
  pageSize: 10,
  timeout: 30000,
  apiSessionName: 'psyweb-sessionkey',
  userTokenKey: 'userToken',
  userInfoKey: 'userInfo',
  routerMap: [
    { path: '/test', component: 'Test' },
    { path: '/', component: 'Home' },
    { path: '/login', component: 'Login', auth: false, noUseLayout: true },
    { path: '/404', component: 'Error', auth: false, noUseLayout: true }
  ],
  isUseServerMenu: false,
  menu: [
    {
      Name: '用户管理',
      Icon: 'TeamOutlined',
      Url: '/test'
    }
    // {
    //   Name: '人员管理',
    //   Icon: 'TeamOutlined',
    //   Children: [
    //     {
    //       Name: '用户管理',
    //       Url: '/normalUser'
    //     },
    //     {
    //       Name: '后台用户',
    //       Url: '/user'
    //     },
    //     {
    //       Name: '后台角色',
    //       Url: '/role'
    //     }
    //   ]
    // },
    // {
    //   Name: '订单管理',
    //   Icon: 'TeamOutlined',
    //   Children: [
    //     {
    //       Name: '线上订单',
    //       Url: '/onlineOrder'
    //     },
    //     {
    //       Name: '线下订单',
    //       Url: '/offlineOrder'
    //     },
    //     {
    //       Name: '房间订单',
    //       Url: '/roomOrder'
    //     }
    //   ]
    // },
    // {
    //   Name: '房间管理',
    //   Icon: 'TeamOutlined',
    //   Children: [
    //     {
    //       Name: '房间管理',
    //       Url: '/roomManage'
    //     },
    //     {
    //       Name: '房间安排',
    //       Url: '/roomArrangement'
    //     }
    //   ]
    // },
    // {
    //   Name: '系统设置',
    //   Icon: 'SettingOutlined',
    //   Children: [
    //     {
    //       Name: '用户管理',
    //       Url: '/user_manage'
    //     },
    //     {
    //       Name: '页面管理',
    //       Url: '/page_manage'
    //     },
    //     {
    //       Name: '系统设置',
    //       Url: '/system_settings'
    //     }
    //   ]
    // }
  ]
};
