import { useTranslate } from "../../../../core/Translate";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function PaymentItem(props) {
  let {
    payment_card_number,
    payment_card_name,
    payment_card_month,
    payment_card_year,
    payment_card_cvv,
    payment_option,
    _id,
    setDefaultPayment
  } = props;
  let { path } = useRouteMatch();
  let { t } = useTranslate();

  return (
    <div
      className={`profile-payment card card-lg bg-light mb-8 ${
        props.default ? "profile-default" : ""
      }`}
    >
      <p className="item-default" onClick={setDefaultPayment}>
        {t("Default")}
      </p>
      <div className="card-body">
        {/* Heading */}
        <h6 className="mb-6">
          {payment_option === "credit_card" ? "Debit / Credit Card" : "Paypal"}
        </h6>
        {/* Text */}
        <p className="mb-5">
          <strong>{t("Card Number:")}</strong> <br />
          <span className="text-muted">{payment_card_number}</span>
        </p>
        {/* Text */}
        <p className="mb-5">
          <strong>{t("Expiry Date:")}</strong> <br />
          <span className="text-muted">
            {payment_card_month}/{payment_card_year}
          </span>
        </p>
        {/* Text */}
        <p className="mb-0">
          <strong>{t("Name on Card:")}</strong> <br />
          <span className="text-muted">{payment_card_name}</span>
        </p>
        {/* Action */}
        <div className="card-action card-action-right">
          {/* Button */}
          <Link
            className="btn btn-xs btn-circle btn-white-primary"
            to={`${path}/edit/${_id}`}
            style={{ marginRight: 10 }}
          >
            <i className="fe fe-edit-2" />
          </Link>
          {/* Button */}
          <button className="btn btn-xs btn-circle btn-white-primary">
            <i className="fe fe-x" />
          </button>
        </div>
      </div>
    </div>
  );
}
