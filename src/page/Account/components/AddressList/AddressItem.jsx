import userApi from "../../../../service/userApi";
import { useTranslate } from "../../../../core/Translate";
import React from "react";
import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function AddressItem(props) {
  let {
    address_line1,
    address_line2,
    city,
    country,
    first_name,
    last_name,
    phone,
    _id,
    setDefaultAddress
  } = props;
  let { path } = useRouteMatch();
  let { t } = useTranslate();

  return (
    <div
      className={`profile-address card-body ${
        props.default ? "profile-default" : ""
      }`}
    >
      <p className="item-default" onClick={setDefaultAddress}>
        {t("Default")}
      </p>
      {/* Heading */}
      <h6 className="mb-6">
        {first_name} {last_name}
      </h6>
      {/* Text */}
      <p className="text-muted mb-0">
        {address_line1} {address_line2}
        <br />
        {city} - {country} <br />
        {phone}
      </p>
      {/* Action */}
      <div className="card-action card-action-right">
        {/* Button */}
        <Link
          style={{ marginRight: 10 }}
          className="btn btn-xs btn-circle btn-white-primary"
          to={`${path}/edit/${_id}`}
        >
          <i className="fe fe-edit-2" />
        </Link>
        {/* Button */}
        <button className="btn btn-xs btn-circle btn-white-primary">
          <i className="fe fe-x" />
        </button>
      </div>
    </div>
  );
}
