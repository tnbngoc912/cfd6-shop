import React from "react";

export default function Brand() {
  return (
    <li className="nav-item">
      {/* Toggle */}
      <a
        className="nav-link dropdown-toggle font-size-lg text-reset border-bottom mb-6"
        data-toggle="collapse"
        href="#brandCollapse"
      >
        Brand
      </a>
      {/* Collapse */}
      <div
        className="collapse"
        id="brandCollapse"
        data-toggle="simplebar"
        data-target="#brandGroup"
      >
        {/* Search */}
        <div data-toggle="lists" data-options='{"valueNames": ["name"]}'>
          {/* Input group */}
          <div className="input-group input-group-merge mb-6">
            <input
              className="form-control form-control-xs search"
              type="search"
              placeholder="Search Brand"
            />
            {/* Button */}
            <div className="input-group-append">
              <button className="btn btn-outline-border btn-xs">
                <i className="fe fe-search" />
              </button>
            </div>
          </div>
          {/* Form group */}
          <div className="form-group form-group-overflow mb-6" id="brandGroup">
            <div className="list">
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="brandOne"
                  type="checkbox"
                />
                <label className="custom-control-label name" htmlFor="brandOne">
                  Dsquared2
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="brandTwo"
                  type="checkbox"
                  disabled
                />
                <label className="custom-control-label name" htmlFor="brandTwo">
                  Alexander McQueen
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="brandThree"
                  type="checkbox"
                />
                <label
                  className="custom-control-label name"
                  htmlFor="brandThree"
                >
                  Balenciaga
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="brandFour"
                  type="checkbox"
                  defaultChecked
                />
                <label
                  className="custom-control-label name"
                  htmlFor="brandFour"
                >
                  Adidas
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="brandFive"
                  type="checkbox"
                />
                <label
                  className="custom-control-label name"
                  htmlFor="brandFive"
                >
                  Balmain
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="brandSix"
                  type="checkbox"
                />
                <label className="custom-control-label name" htmlFor="brandSix">
                  Burberry
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="brandSeven"
                  type="checkbox"
                />
                <label
                  className="custom-control-label name"
                  htmlFor="brandSeven"
                >
                  Chloé
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="brandEight"
                  type="checkbox"
                />
                <label
                  className="custom-control-label name"
                  htmlFor="brandEight"
                >
                  Kenzo
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="brandNine"
                  type="checkbox"
                />
                <label
                  className="custom-control-label name"
                  htmlFor="brandNine"
                >
                  Givenchy
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
