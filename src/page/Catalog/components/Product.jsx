import React from "react";
import { useDispatch } from "react-redux";
import { addCart, addWisthList } from "../../../redux/reducer/cartReducer";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";
import { currency } from "../../../utils";

export default function Product(props) {
  let {
    name,
    images,
    real_price,
    rating_average,
    discount_rate,
    slug,
    loading
  } = props;

  let dispatch = useDispatch();

  let image1 = images?.[0]?.medium_url;
  let image2 = images?.[0]?.medium_url;

  return (
    <div className="card mb-7">
      {/* Badge */}
      {/* <div className="badge badge-white card-badge card-badge-left text-uppercase">
                    New
                    </div> */}

      {/* Image */}
      <div className="card-img">
        {/* Image */}
        <Link className="card-img-hover" to={`/product/${slug}`}>
          {loading ? (
            <Skeleton variant="rect" width="100%" height={250} />
          ) : (
            <>
              {image1 && (
                <img
                  className="card-img-top card-img-back"
                  src={image1}
                  alt="..."
                />
              )}
              {image2 ? (
                <img
                  className="card-img-top card-img-front"
                  src={image2}
                  alt="..."
                />
              ) : (
                <img
                  className="card-img-top card-img-back"
                  src={image1}
                  alt="..."
                />
              )}
            </>
          )}

          {discount_rate > 0 ? (
            <p className="discount_rate">{discount_rate}%</p>
          ) : null}
        </Link>
        {/* Actions */}
        <div className="card-actions">
          <span className="card-action">
            <button
              className="btn btn-xs btn-circle btn-white-primary"
              data-toggle="modal"
              data-target="#modalProduct"
            >
              <i className="fe fe-eye" />
            </button>
          </span>
          <span className="card-action">
            <button
              className="btn btn-xs btn-circle btn-white-primary"
              data-toggle="button"
              onClick={dispatch.bind(null, addCart(props))}
            >
              <i className="fe fe-shopping-cart" />
            </button>
          </span>
          <span className="card-action">
            <button
              className="btn btn-xs btn-circle btn-white-primary"
              onClick={dispatch.bind(null, addWisthList(props))}
              data-toggle="button"
            >
              <i className="fe fe-heart" />
            </button>
          </span>
        </div>
      </div>
      {/* Body */}
      <div className="card-body px-0">
        {/* Category */}
        {loading ? (
          <Skeleton height={60} />
        ) : (
          <>
            <div className="font-size-xs product-rating">
              {/* <a className="text-muted" href="shop.html">Shoes</a> */}
              <span>{rating_average} ⭐</span>
            </div>
            {/* Title */}
            <div className="font-weight-bold">
              <Link className="text-body" to={`/product/${slug}`}>
                {name}
              </Link>
            </div>
          </>
        )}

        {/* Price */}
        {loading ? (
          <Skeleton />
        ) : (
          <div className="font-weight-bold text-muted">
            {currency(real_price)}
          </div>
        )}
      </div>
    </div>
  );
}
