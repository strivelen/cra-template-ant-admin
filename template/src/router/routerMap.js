import * as Pages from 'page'
const Config = require("config/index");

/**
 * 路由配置参数：
 * @param {String} path  路由path
 * @param {ReactNode} component 页面组件
 * @param {Boolean} exact 精确匹配,默认：true
 * @param {Boolean} auth 页面是否需要身份验证，默认：true
 * @param {Boolean} noUseLayout 页面是否不需要渲染Layout，默认：false
 */
// export default [
//   { path: '/', component: Pages['Home'] },
//   { path: '/admin',  component: Admin },
//   { path: '/pages',  component: Pages },
//   { path: '/pages/:parentid?',  component: Pages },
//   { path: '/pages/action/:pageid',  component: Action },
//   { path: '/portal', component: Portal },
//   { path: '/login',  component: Login, auth: false, noUseLayout: true },
//   { path: '/404',  component: ErrorPage }
// ];
const routes = Config.routerMap.map(item => {
  return {
    ...item,
    component: Pages[item.component]
  }
});
export default [...routes];
