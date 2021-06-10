import userApi from "../../../../service/userApi";
import { useTranslate } from "../../../../core/Translate";
import React from "react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import PaymentItem from "./PaymentItem";

export default function PaymentList() {
  let match = useRouteMatch();
  let { t } = useTranslate();
  let [list, setList] = useState([]);

  useEffect(() => {
    userApi.getPayment().then(res => {
      setList(res.data);
    });
  }, []);

  function setDefaultPayment(e) {
    if (!e.default) {
      userApi.changePaymentDefault({
        _id: e._id
      });

      list.forEach(e1 => {
        if (e1._id === e._id) {
          e1.default = true;
        } else {
          e1.default = false;
        }
      });

      setList([...list]);
    }
  }
  return (
    <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
      <div className="row">
        {list.map(e => (
          <div className="col-12 col-lg-6" key={e.id}>
            {/* Card */}
            <PaymentItem
              setDefaultPayment={setDefaultPayment.bind(null, e)}
              {...e}
            />
          </div>
        ))}
        <div className="col-12">
          {/* Button */}
          <Link
            className="btn btn-block btn-lg btn-outline-border"
            to={`${match.path}/create`}
          >
            {t("Add Payment Method")} <i className="fe fe-plus" />
          </Link>
        </div>
      </div>
    </div>
  );
}
