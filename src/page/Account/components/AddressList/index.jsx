import userApi from "../../../../service/userApi";
import { useTranslate } from "../../../../core/Translate";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import AddressItem from "./AddressItem";

export default function AddressList() {
  let [list, setList] = useState([]);

  useEffect(() => {
    userApi.getAddress().then(res => {
      setList(res.data);
    });
  }, []);
  let match = useRouteMatch();
  let { t } = useTranslate();

  function setDefaultAddress(e) {
    if (!e.default) {
      userApi.changeAddressDefault({
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
          <div className="col-12 col-lg-6" key={e.name}>
            <div className="card card-lg bg-light mb-8">
              <AddressItem
                {...e}
                setDefaultAddress={setDefaultAddress.bind(null, e)}
              />
            </div>
          </div>
        ))}

        <div className="col-12">
          {/* Button */}
          <Link
            className="btn btn-block btn-lg btn-outline-border"
            to={`${match.path}/create`}
          >
            {t("Add Address")} <i className="fe fe-plus" />
          </Link>
        </div>
      </div>
    </div>
  );
}
