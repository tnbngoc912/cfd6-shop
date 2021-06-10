import Api from "../core/Api";

export default {
  login: data => {
    return Api.post("login", data);
  },
  register: data => {
    return Api.post("register", data);
  },
  update: data => {
    return Api.token().post("update-profile", data);
  },
  getWishlist: data => {
    return Api.token().get("ecommerce/v1/profile/wishlist");
  },
  addWishlist: product => {
    return Api.token().post("ecommerce/v1/profile/wishlist", product);
  },
  removeWishlist: _id => {
    return Api.token().delete(`ecommerce/v1/profile/wishlist/${_id}`);
  },

  getAddress: _id => {
    return Api.token().get(
      `ecommerce/v1/profile/address${_id ? "/" + _id : ""}`
    );
  },
  changeAddressDefault: data => {
    return Api.token().post(`ecommerce/v1/profile/address-default`, data);
  },
  getAddressDefault: () => {
    return Api.token().get(`ecommerce/v1/profile/address-default`);
  },
  addAddress: data => {
    return Api.token().post("ecommerce/v1/profile/address", data);
  },
  removeAddress: _id => {
    return Api.token().delete(`ecommerce/v1/profile/address/${_id}`);
  },

  getPayment: _id => {
    return Api.token().get(
      `ecommerce/v1/profile/payment${_id ? "/" + _id : ""}`
    );
  },
  changePaymentDefault: data => {
    return Api.token().post(`ecommerce/v1/profile/payment-default`, data);
  },
  getPaymentDefault: _id => {
    return Api.token().get(`ecommerce/v1/profile/payment-default`);
  },
  addPayment: data => {
    return Api.token().post("ecommerce/v1/profile/payment", data);
  },
  removePayment: _id => {
    return Api.token().delete(`ecommerce/v1/profile/payment/${_id}`);
  }
};
