import useInputValidate from "../../hook/useInputValidate";
import withPriceFormat from "../../hoc/withPriceFormat";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./components/CartItem";
import cartApi from "../../service/cartApi";
import { useTranslate } from "../../core/Translate";

export default function ShoppingCart() {
  let { t } = useTranslate();
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();

  let { Input: InputCouponCode, validate } = useInputValidate("", { min: 6 });
  let [codeMessage, setCodeMessage] = useState();

  let amount = new Intl.NumberFormat("vn").format(cart.amount);
  let tax = new Intl.NumberFormat("vn").format((cart.tax * cart.amount) / 100);
  let total = new Intl.NumberFormat("vn").format(
    cart.amount + (cart.tax * cart.amount) / 100
  );

  function applyCouponCode() {
    let result = validate();
    console.log(result.value);
    if (result.value) {
      cartApi.applyCode(result.value).then(
        res => {
          setCodeMessage("Bạn đã thêm Coupon Code thành công");
        },
        error => {}
      );
    }
  }

  return (
    <section
      className="pt
        
        const dispatch = useDispatch()-7 pb-12"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Heading */}
            <h3 className="mb-10 text-center">{t("Shopping Cart")}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-7">
            {/* List group */}
            <ul className="list-group list-group-lg list-group-flush-x mb-6">
              {cart.list.map(e => (
                <React.Fragment key={e._id}>
                  {withPriceFormat(CartItem, e)}
                </React.Fragment>
              ))}
            </ul>
            {/* Footer */}
            <div className="row align-items-end justify-content-between mb-10 mb-md-0 shopping-coupon-code">
              <div className="col-12 col-md-7">
                {/* Coupon */}
                <label
                  className="font-size-sm font-weight-bold"
                  htmlFor="cartCouponCode"
                >
                  {t(" Coupon code:")}
                </label>
                <div className="row form-row">
                  <div className="col">
                    {/* Input */}
                    {
                      <InputCouponCode
                        placeholder="Enter coupon code*"
                        className="form-control"
                      />
                    }
                    {codeMessage && (
                      <div className="green-message">{codeMessage}</div>
                    )}
                  </div>
                  <div className="col-auto">
                    {/* Button */}
                    <button
                      className="btn btn-sm btn-dark"
                      type="submit"
                      onClick={applyCouponCode}
                    >
                      {t("Apply")}
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="col-12 col-md-auto" style={{ marginTop: 30 }}>
                                <button className="btn btn-sm btn-outline-dark">Update Cart</button>
                            </div> */}
            </div>
          </div>
          <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
            {/* Total */}
            <div className="card mb-7 bg-light">
              <div className="card-body">
                <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                  <li className="list-group-item d-flex">
                    <span>{t("Subtotal")}</span>{" "}
                    <span className="ml-auto font-size-sm">{amount} vnđ</span>
                  </li>
                  <li className="list-group-item d-flex">
                    <span>{t("Tax")}</span>{" "}
                    <span className="ml-auto font-size-sm">{tax} vnđ</span>
                  </li>
                  <li className="list-group-item d-flex font-size-lg font-weight-bold">
                    <span>{t("Total")}</span>{" "}
                    <span className="ml-auto font-size-sm">{total} vnđ</span>
                  </li>
                  <li className="list-group-item font-size-sm text-center text-gray-500">
                    {t("Shipping cost calculated at Checkout *")}
                  </li>
                </ul>
              </div>
            </div>
            {/* Button */}
            <Link className="btn btn-block btn-dark mb-2" to="checkout">
              {t("Proceed to Checkout")}
            </Link>
            {/* Link */}
            <Link className="btn btn-link btn-sm px-0 text-body" to="/catalog">
              <i className="fe fe-arrow-left mr-2" /> {t("Continue Shopping")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
