import reduxToolkit from "../../core/reduxToolkit";
import productApi from "../../service/productApi";

let initialState = {
  list: [],
  key: ""
};

export function fetchSearch(keyword) {
  return dispatch => {
    productApi.search(keyword).then(res => {
      dispatch(action.search(res.data));
    });
  };
}

let { reducer, action, TYPE } = reduxToolkit({
  name: "search",
  initialState,
  reducers: {
    search: (state, action) => {
      state.list = action.payload;
    }
  }
});

export default reducer;

export { action };

export { TYPE };
