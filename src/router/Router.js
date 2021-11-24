import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CompanyInfo from 'pages/CompanyInfo';
import {Launch, LaunchList, LaunchDetails, LaunchComments} from 'pages/launchs';

const aRoutes = [
  {
    path: "/launchs",
    component: Launch,
    routes: [
      {
        path: "/launchs",
        exact: true,
        component: LaunchList
      },
      {
        path: "/launchs/:sLaunchId",
        exact: true,
        component: LaunchDetails
      },
      {
        path: "/launchs/comments/:sLaunchId",
        exact: true,
        component: LaunchComments
      }
    ]
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