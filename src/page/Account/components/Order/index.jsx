import { List } from "@material-ui/core";
import cartApi from "../../../../service/cartApi";
import { currency } from "../../../../utils";
import { useTranslate } from "../../../../core/Translate";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import OrderItem from "./OrderItem";

export default function Order() {
  let { _id } = useRouteMatch().params;
  let [order, setOrder] = useState();
  let { t } = useTranslate();
  useEffect(() => {
    cartApi.getOrder(_id).then(res => {
      if (res.data) {
        setOrder(res.data);
      }
    });
  }, []);

  if (!order) return null;

  let {
    list,
    amount,
    tax,
    shippingFee,
    first_name,
    last_name,
    country,
    city,
    ship_post_code,
    address1,
    address2,
    phone
  } = order;

  return (
    <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
      {/* Order */}
      <div className="card card-lg mb-5 border">
        <div className="card-body pb-0">
          {/* Info */}
          <div className="card card-sm">
            <div className="card-body bg-light">
              <div className="row">
                <div className="col-6 col-lg-3">
                  {/* Heading */}
                  <h6 className="heading-xxxs text-muted">{t("Order No:")}</h6>
                  {/* Text */}
                  <p className="mb-lg-0 font-size-sm font-weight-bold">{_id}</p>
                </div>
                <div className="col-6 col-lg-3">
                  {/* Heading */}
                  <h6 className="heading-xxxs text-muted">
                    {t("Shipped date:")}
                  </h6>
                  {/* Text */}
                  <p className="mb-lg-0 font-size-sm font-weight-bold">
                    <time dateTime="2019-10-01">01 Oct, 2019</time>
                  </p>
                </div>
                <div className="col-6 col-lg-3">
                  {/* Heading */}
                  <h6 className="heading-xxxs text-muted">{t("Status:")}</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm font-weight-bold">
                    {t("Awating Delivery")}
                  </p>
                </div>
                <div className="col-6 col-lg-3">
                  {/* Heading */}
                  <h6 className="heading-xxxs text-muted">
                    {t("Order Amount:")}
                  </h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm font-weight-bold">
                    {currency(amount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          {/* Heading */}
          <h6 className="mb-7">{t("Order Items")} (3)</h6>
          {/* Divider */}
          <hr className="my-5" />
          {/* List group */}
          <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x">
            {list.map(e => (
              <OrderItem key={e._id} {...e} />
            ))}
          </ul>
        </div>
      </div>
      {/* Total */}
      <div className="card card-lg mb-5 border">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">{t("Order Total")}</h6>
          {/* List group */}
          <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
            <li className="list-group-item d-flex">
              <span>{t("Subtotal")}</span>
              <span className="ml-auto">{currency(amount)}</span>
            </li>
            <li className="list-group-item d-flex">
              <span>{t("Tax")}</span>
              <span className="ml-auto">{currency((tax * amount) / 100)}</span>
            </li>
            <li className="list-group-item d-flex">
              <span>{t("Shipping")}</span>
              <span className="ml-auto">{currency(shippingFee)}</span>
            </li>
            <li className="list-group-item d-flex font-size-lg font-weight-bold">
              <span>{t("Total")}</span>
              <span className="ml-auto">
                {currency(amount + (tax * amount) / 100 + shippingFee)}
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* Details */}
      <div className="card card-lg border">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">{t("Billing & Shipping Details")}</h6>
          {/* Content */}
          <div className="row">
            <div className="col-12 col-md-4">
              {/* Heading */}
              <p className="mb-4 font-weight-bold">{t("Billing Address:")}</p>
              <p className="mb-7 mb-md-0 text-gray-500">
                {first_name} {last_name}, <br />
                {address1} {address2} <br />
                {country}, {ship_post_code}, <br />
                {city}, <br />
                {phone}
              </p>
            </div>
            <div className="col-12 col-md-4">
              {/* Heading */}
              <p className="mb-4 font-weight-bold">{t("Shipping Address:")}</p>
              <p className="mb-7 mb-md-0 text-gray-500">
                Daniel Robinson, <br />
                3997 Raccoon Run, <br />
                Kingston, 45644, <br />
                United States, <br />
                6146389574
              </p>
            </div>
            <div className="col-12 col-md-4">
              {/* Heading */}
              <p className="mb-4 font-weight-bold">{t("Shipping Method:")}</p>
              <p className="mb-7 text-gray-500">
                Standart Shipping <br />
                (5 - 7 days)
              </p>
              {/* Heading */}
              <p className="mb-4 font-weight-bold">{t("Payment Method:")}</p>
              <p className="mb-0 text-gray-500">Debit Mastercard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
