import reduxToolkit from "../../core/reduxToolkit";
import productApi from "../../service/productApi";
import { convertQueryToObject } from "../../component/helper";
const initialState = {
  products: [],
  paginate: null,
  categories: [],
  loadingCategories: true,
  loading: true
};

export function getProduct(queryString) {
  return dispatch => {
    dispatch(action.loading());
    productApi.catalog(queryString).then(res => {
      // sessionStorage.setItem(`catalog_${query.page || 1}`, JSON.stringify(res))
      dispatch(action.catalog(res));
    });
  };
}

export function getcategories() {
  return async (dispatch, state) => {
    if (state.product.loadingCategories) {
      dispatch(action.categories(await productApi.category()));
    }
  };
}

let { reducer, action, TYPE } = reduxToolkit({
  name: "product",
  initialState,
  reducers: {
    loading: state => {
      state.loading = true;
    },
    catalog: function(state, action) {
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        paginate: action.payload.paginate
      };
    },
    categories: (state, action) => {
      state.categories = action.payload;
      state.loadingCategories = false;
    }
  }
});

export default reducer;
export const PRODUCT = TYPE;
export const productAction = action;
