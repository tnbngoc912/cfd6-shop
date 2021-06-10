import { LOGIN, LOGOUT, ERROR } from "../type";
import Auth from "../../service/auth";

export function loginAction(data) {
  return async dispatch => {
    let res = await Auth.login(data);
    if (res.data) {
      dispatch({
        type: LOGIN,
        payload: res.data
      });
      // success();
    } else if (res.error) {
      dispatch({
        type: ERROR,
        payload: res.error
      });
    }
  };
}
export function logoutAction() {
  return {
    type: LOGOUT
  };
}
