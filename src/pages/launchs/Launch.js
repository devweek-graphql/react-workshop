import React from 'react';
import { Switch } from "react-router-dom";
import { RouteWithSubRoutes } from 'router/Router';

export default function Launch(props) {
  return (
    <Switch>
      {props.routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
}
