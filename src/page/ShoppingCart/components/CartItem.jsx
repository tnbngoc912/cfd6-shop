import { useTranslate } from "../../../core/Translate";
import React from "react";
import { useDispatch } from "react-redux";
import {
  cartDerement,
  cartIncrement,
  removeItemCart
} from "../../../redux/reducer/cartReducer";

export default function CartItem({
  name,
  real_price_text,
  images,
  _id,
  cartNum
}) {
  const dispatch = useDispatch();
  let { t } = useTranslate();
  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        <div className="col-3">
          {/* Image */}
          <a href="product.html">
            <img
              src={images?.[0]?.medium_url}
              alt="..."
              className="img-fluid"
            />
          </a>
        </div>
        <div className="col">
          {/* Title */}
          <div className="d-flex mb-2 font-weight-bold">
            <a className="text-body" href="product.html">
              {name}
            </a>{" "}
            <span className="ml-auto">{real_price_text} vnđ</span>
          </div>
          {/* Text */}

          {/*Footer */}
          <div className="d-flex align-items-center">
            {/* Select */}
            <button
              className="cartItem-button"
              onClick={() => dispatch(cartDerement(_id))}
            >
              -
            </button>
            <input type="text" className="cartItem-num" value={cartNum} />
            <button
              className="cartItem-button"
              onClick={() => dispatch(cartIncrement(_id))}
            >
              +
            </button>
            {/* Remove */}
            <div
              className="font-size-xs text-gray-400 ml-auto"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(removeItemCart(_id))}
            >
              <i className="fe fe-x" /> {t("Remove")}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
