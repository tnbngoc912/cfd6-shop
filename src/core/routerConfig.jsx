import { Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

export function RouteWithSubRoutes(route) {
  if (route.auth) {
    return (
      <PrivateRoute
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }

  return (
    <Route
      path={route.path}
      render={props => {
        // pass the sub-routes down to keep nesting
        return <route.component {...props} routes={route.routes} />;
      }}
    />
  );
}
