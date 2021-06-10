import cartApi from "../../service/cartApi";
import userApi from "../../service/userApi";
import reduxToolkit from "../../core/reduxToolkit";

let cart = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  list: cart?.list || [],
  num: cart?.num || 0,
  amount: cart?.amount || 0,
  tax: cart?.tax || 10,
  shipping_option: cart?.shipping_option || "free",
  shipping_price: cart?.shipping_price || 0,
  payment_option: cart?.payment_option || "paypal",
  error: ""
};

function returnCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

function calPrice(list) {
  let amount = list.reduce(
    (sum, currentItem) => sum + currentItem.real_price * currentItem.cartNum,
    0
  );
  let num = list.reduce((sum, currentItem) => sum + currentItem.cartNum, 0);

  return {
    amount,
    num
  };
}

export function placeOrder(data) {
  return () => {
    return cartApi.order(data);
  };
}

export function addWisthList(data) {
  return () => {
    userApi.addWishlist(data);
  };
}

let { reducer, action, TYPE } = reduxToolkit({
  name: "cart",
  initialState,
  reducers: {
    error: function(state, action) {
      state.error = action.payload;
    },
    addCart: function(state, action) {
      let { list, amount } = state;

      let f = list.findIndex(e => e._id === action.payload._id);

      let cartNum = action.payload.cartNum || 1;

      if (f !== -1) {
        list[f].cartNum += cartNum;

        amount += list[f].real_price;
      } else {
        let item = JSON.parse(JSON.stringify(action.payload));

        item.cartNum = cartNum;

        list.push(item);

        amount += item.real_price;
      }

      return returnCart({
        ...state,
        ...calPrice(list),
        list
      });
    },
    remove: function(state, action) {
      let { list, amount, num } = state;

      let f = list.findIndex(e => e._id === action.payload);
      if (f !== -1) {
        amount -= list[f].real_price * list[f].cartNum;
        num -= list[f].cartNum;
        list.splice(f, 1);
      }

      return returnCart({
        ...state,
        ...calPrice(list),
        list
      });
    },
    increment: function(state, action) {
      let { list, amount } = state;

      let f = list.findIndex(e => e._id === action.payload);
      if (f !== -1) {
        list[f].cartNum++;
        amount += list[f].real_price;
      }

      return returnCart({
        ...state,
        ...calPrice(list),
        list
      });
    },
    descrement: function(state, action) {
      let { list, amount } = state;

      let f = list.findIndex(e => e._id === action.payload);
      if (f !== -1) {
        amount -= list[f].real_price;
        if (list[f].cartNum > 1) {
          list[f].cartNum--;
        } else {
          list.splice(f, 1);
        }
      }

      return returnCart({
        ...state,
        ...calPrice(list),

        list
      });
    },

    cartUpdate: function(state, ation) {
      return returnCart({
        ...state,
        ...ation.payload
      });
    },
    clearCart: function(state, action) {
      return returnCart({
        list: [],
        num: 0,
        amount: 0,
        tax: 10,
        shipping_option: "free",
        shipping_price: 0,
        payment_option: "paypal",
        error: ""
      });
    },
    setCart: function(state, action) {
      return returnCart(action.payload);
    },
    order: (state, action) => {}
  }
});

export default reducer;

export const addCart = action.addCart;

export const removeItemCart = action.remove;

export const cartIncrement = action.increment;

export const cartDerement = action.descrement;

export const cartUpdate = action.cartUpdate;

export const CART = TYPE;

export const CartAction = action;
