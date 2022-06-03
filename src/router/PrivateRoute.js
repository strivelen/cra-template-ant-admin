import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'utils/interceptor';

export default function ProvideAuth({ component: Component, ...rest }) {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await axios.get('/users/1');
      setIsLogin(res.Code !== 401);
      setLoading(false);
    })();
  }, []);
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (loading) {
          return 'loading...';
        }
        if (isLogin) {
          return <Component {...routeProps} />;
        }
        return (
          <Redirect
            to={{
              pathname: `/login`,
              state: { from: routeProps.location }
            }}
          />
        );
      }}
    />
  );
}
