import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
export function PrivateRoute(prop) {
  let { login } = useSelector(store => store.auth);
  if (!login) {
    return (
      <Route>
        <Redirect to="/auth" />
      </Route>
    );
  }

  return <Route {...prop} />;
}
