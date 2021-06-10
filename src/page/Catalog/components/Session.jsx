import React from "react";

export default function Session() {
  return (
    <li className="nav-item">
      {/* Toggle */}
      <a
        className="nav-link dropdown-toggle font-size-lg text-reset border-bottom mb-6"
        data-toggle="collapse"
        href="#seasonCollapse"
      >
        Season
      </a>
      {/* Collapse */}
      <div
        className="collapse"
        id="seasonCollapse"
        data-toggle="simplebar"
        data-target="#seasonGroup"
      >
        <div className="form-group form-group-overflow mb-6" id="seasonGroup">
          <div className="custom-control custom-checkbox mb-3">
            <input
              className="custom-control-input"
              id="seasonOne"
              type="checkbox"
              defaultChecked
            />
            <label className="custom-control-label" htmlFor="seasonOne">
              Summer
            </label>
          </div>
          <div className="custom-control custom-checkbox mb-3">
            <input
              className="custom-control-input"
              id="seasonTwo"
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="seasonTwo">
              Winter
            </label>
          </div>
          <div className="custom-control custom-checkbox">
            <input
              className="custom-control-input"
              id="seasonThree"
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="seasonThree">
              Spring &amp; Autumn
            </label>
          </div>
        </div>
      </div>
    </li>
  );
}
