import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CompanyInfo from 'pages/CompanyInfo';
import RocketList from 'pages/RocketList';
import LaunchList from 'pages/LaunchList';

const aRoutes = [
  {
    path: "/rockets",
    exact: true,
    component: RocketList
  },
  {
    path: "/launchs",
    exact: true,
    component: LaunchList
  },
  {
    path: "/",
    exact: true,
    component: CompanyInfo
  },
];

export function RouteConfig() {
  return (
    <Switch>
      {aRoutes.map((oRoute, nIndex) => (
        <RouteWithSubRoutes key={nIndex} {...oRoute} />
      ))}
    </Switch>
  );
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export function RouteWithSubRoutes(oRoute) {
  return (
    <Route
      path={oRoute.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <oRoute.component {...props} routes={oRoute.routes} />
      )}
    />
  );
}