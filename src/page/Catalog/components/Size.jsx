import React from "react";

export default function Size() {
  return (
    <li className="nav-item">
      {/* Toggle */}
      <a
        className="nav-link dropdown-toggle font-size-lg text-reset border-bottom mb-6"
        data-toggle="collapse"
        href="#sizeCollapse"
      >
        Size
      </a>
      {/* Collapse */}
      <div
        className="collapse"
        id="sizeCollapse"
        data-toggle="simplebar"
        data-target="#sizeGroup"
      >
        <div className="form-group form-group-overlow mb-6" id="sizeGroup">
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeOne"
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="sizeOne">
              3XS
            </label>
          </div>
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeTwo"
              type="checkbox"
              disabled
            />
            <label className="custom-control-label" htmlFor="sizeTwo">
              2XS
            </label>
          </div>
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeThree"
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="sizeThree">
              XS
            </label>
          </div>
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeFour"
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="sizeFour">
              S
            </label>
          </div>
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeFive"
              type="checkbox"
              defaultChecked
            />
            <label className="custom-control-label" htmlFor="sizeFive">
              M
            </label>
          </div>
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeSix"
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="sizeSix">
              L
            </label>
          </div>
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeSeven"
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="sizeSeven">
              XL
            </label>
          </div>
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeEight"
              type="checkbox"
              disabled
            />
            <label className="custom-control-label" htmlFor="sizeEight">
              2XL
            </label>
          </div>
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeNine"
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="sizeNine">
              3XL
            </label>
          </div>
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeTen"
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="sizeTen">
              4XL
            </label>
          </div>
          <div className="custom-control custom-control-inline custom-control-size mb-2">
            <input
              className="custom-control-input"
              id="sizeEleven"
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="sizeEleven">
              One Size
            </label>
          </div>
        </div>
      </div>
    </li>
  );
}
