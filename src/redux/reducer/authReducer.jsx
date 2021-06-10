import cartApi from "../../service/cartApi";
import userApi from "../../service/userApi";
import reduxToolkit from "../../core/reduxToolkit";
import { CartAction } from "./cartReducer";

let user = JSON.parse(localStorage.getItem("login"));

let initialState = {
  login: !!user,
  user: user,
  error: null
};

export function loginAction(data) {
  return (dispatch, state) => {
    userApi.login(data).then(res => {
      if (res.error) {
        dispatch(action.error({ loginError: res.error }));
      } else {
        dispatch(action.login(res.data));
      }
    });
  };
}

export function registerAction(data) {
  return dispatch => {
    userApi.register(data).then(res => {
      if (res.error) {
        dispatch(action.error({ registerError: res.error }));
      } else {
        dispatch(action.register(res.data));
      }
    });
  };
}

export function updateInfoAction(data) {
  return dispatch => {
    userApi.update(data).then(res => {
      if (res.error) {
        dispatch(action.error({ updateError: res.error }));
      } else {
        dispatch(action.update(res.data));
      }
    });
  };
}

let { action, reducer, TYPE } = reduxToolkit({
  name: "auth",
  initialState,
  reducers: {
    login: function(state, action) {
      state.user = action.payload;
      let token = action.payload.token;

      localStorage.setItem("login", JSON.stringify(action.payload));
      localStorage.setItem("token", JSON.stringify(token));
      state.login = true;
    },
    logout: function(state, action) {
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      state.login = false;
      state.user = null;
    },
    error: function(state, action) {
      state.error = action.payload;
    },
    register: function(state, action) {
      state.user = action.payload;
      state.login = true;

      let token = action.payload.token;

      localStorage.setItem("login", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));

      return {
        ...state,
        login: true,
        user
      };
    },
    update: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
      localStorage.setItem("login", JSON.stringify(state.user));
    }
  }
});

export default reducer;

export const { logout, login, error, update } = action;

export const AUTH = TYPE;
