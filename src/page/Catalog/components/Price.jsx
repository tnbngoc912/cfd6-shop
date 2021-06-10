import {
  serializeObjToQueryURL,
  convertQueryToObject
} from "../../../component/helper";
import React from "react";
import { useRef } from "react";
import { useHistory, useRouteMatch } from "react-router";

export default function Price() {
  let query = convertQueryToObject();
  let history = useHistory();
  let routeMatch = useRouteMatch();

  let minRef = useRef();
  let maxRef = useRef();

  function _apply() {
    if (minRef.current.value) {
      query.min = minRef.current.value.trim();
    } else {
      delete query.min;
    }

    if (maxRef.current.value) {
      query.max = maxRef.current.value.trim();
    } else {
      delete query.max;
    }

    let minValue = minRef.current.value,
      maxValue = maxRef.current.value;

    if (minValue || maxValue) {
      if (minValue) {
        query.min = minValue.trim();
      } else {
        delete query.min;
      }

      if (maxValue) {
        query.max = maxValue.trim();
      } else {
        delete query.max;
      }

      query.page = 1;
    }

    history.push(routeMatch.url + "?" + serializeObjToQueryURL(query));
  }

  return (
    <li className="nav-item">
      {/* Toggle */}
      <a
        className="nav-link  font-size-lg text-reset border-bottom mb-6"
        data-toggle="collapse"
        href="#priceCollapse"
      >
        Giá
      </a>
      {/* Collapse */}
      {/* <div className="form-group form-group-overflow mb-6" id="priceGroup">
                <div className="custom-control custom-checkbox mb-3">
                    <input className="custom-control-input" id="priceOne" type="checkbox" defaultChecked />
                    <label className="custom-control-label" htmlFor="priceOne">
                        $10.00 - $49.00
                          </label>
                </div>
                <div className="custom-control custom-checkbox mb-3">
                    <input className="custom-control-input" id="priceTwo" type="checkbox" defaultChecked />
                    <label className="custom-control-label" htmlFor="priceTwo">
                        $50.00 - $99.00
                          </label>
                </div>
                <div className="custom-control custom-checkbox mb-3">
                    <input className="custom-control-input" id="priceThree" type="checkbox" />
                    <label className="custom-control-label" htmlFor="priceThree">
                        $100.00 - $199.00
                          </label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input className="custom-control-input" id="priceFour" type="checkbox" />
                    <label className="custom-control-label" htmlFor="priceFour">
                        $200.00 and Up
                          </label>
                </div>
            </div> */}
      {/* Range */}
      <div className="d-flex align-items-center">
        {/* Input */}
        <input
          ref={minRef}
          defaultValue={query.min}
          type="number"
          className="form-control form-control-xs"
          placeholder="1000 vnđ"
        />
        {/* Divider */}
        <div className="text-gray-350 mx-2">‒</div>
        {/* Input */}
        <input
          ref={maxRef}
          defaultValue={query.max}
          type="number"
          className="form-control form-control-xs"
          placeholder="10000 vnđ"
        />
      </div>
      <button
        className="btn btn-light"
        onClick={_apply}
        style={{ marginTop: 10 }}
      >
        Áp dụng
      </button>
    </li>
  );
}
