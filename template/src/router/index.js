/* eslint-disable react/no-children-prop */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import routerMap from './routerMap';
import Layout from 'component/Layout';

const defaultConfig = {
  exact: true, // 精确匹配
  auth: true // 是否使用路由守卫
};
let layoutRoutes = [];
let otherRoutes = [];
routerMap.forEach(item => {
  const newItem = { ...defaultConfig, ...item };
  if (item.noUseLayout) {
    otherRoutes.push(newItem);
  } else {
    layoutRoutes.push(newItem);
  }
});

export default function Routes() {
  return (
    <Router>
      <Switch>
        {otherRoutes.map(item => {
          return item.auth ? <PrivateRoute key={item.path} {...item} /> : <Route key={item.path} {...item} />;
        })}
        <Layout>
          <Switch>
            {layoutRoutes.map(item => {
              return item.auth ? <PrivateRoute key={item.path} {...item} /> : <Route key={item.path} {...item} />;
            })}
            <Route path="*" render={() => <Redirect to="404" />} />
          </Switch>
        </Layout>
      </Switch>
    </Router>
  );
}
