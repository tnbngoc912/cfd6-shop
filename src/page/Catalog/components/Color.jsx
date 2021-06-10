import React from "react";

export default function Color() {
  return (
    <li className="nav-item">
      {/* Toggle */}
      <a
        className="nav-link dropdown-toggle font-size-lg text-reset border-bottom mb-6"
        data-toggle="collapse"
        href="#colorCollapse"
      >
        Color
      </a>
      {/* Collapse */}
      <div
        className="collapse"
        id="colorCollapse"
        data-toggle="simplebar"
        data-target="#colorGroup"
      >
        <div className="form-group form-group-overflow mb-6" id="colorGroup">
          <div className="custom-control custom-control-color mb-3">
            <input
              className="custom-control-input"
              id="colorOne"
              type="checkbox"
            />
            <label
              className="custom-control-label text-dark"
              htmlFor="colorOne"
            >
              <span className="text-body">Black</span>
            </label>
          </div>
          <div className="custom-control custom-control-color mb-3">
            <input
              className="custom-control-input"
              id="colorTwo"
              type="checkbox"
              defaultChecked
            />
            <label
              className="custom-control-label"
              style={{ color: "#f9f9f9" }}
              htmlFor="colorTwo"
            >
              <span className="text-body">White</span>
            </label>
          </div>
          <div className="custom-control custom-control-color mb-3">
            <input
              className="custom-control-input"
              id="colorThree"
              type="checkbox"
            />
            <label
              className="custom-control-label text-info"
              htmlFor="colorThree"
            >
              <span className="text-body">Blue</span>
            </label>
          </div>
          <div className="custom-control custom-control-color mb-3">
            <input
              className="custom-control-input"
              id="colorFour"
              type="checkbox"
            />
            <label
              className="custom-control-label text-primary"
              htmlFor="colorFour"
            >
              <span className="text-body">Red</span>
            </label>
          </div>
          <div className="custom-control custom-control-color mb-3">
            <input
              className="custom-control-input"
              id="colorFive"
              type="checkbox"
              disabled
            />
            <label
              className="custom-control-label"
              htmlFor="colorFive"
              style={{ color: "#795548" }}
            >
              <span className="text-body">Brown</span>
            </label>
          </div>
          <div className="custom-control custom-control-color mb-3">
            <input
              className="custom-control-input"
              id="colorSix"
              type="checkbox"
            />
            <label
              className="custom-control-label text-gray-300"
              htmlFor="colorSix"
            >
              <span className="text-body">Gray</span>
            </label>
          </div>
          <div className="custom-control custom-control-color mb-3">
            <input
              className="custom-control-input"
              id="colorSeven"
              type="checkbox"
            />
            <label
              className="custom-control-label"
              htmlFor="colorSeven"
              style={{ color: "#17a2b8" }}
            >
              <span className="text-body">Cyan</span>
            </label>
          </div>
          <div className="custom-control custom-control-color">
            <input
              className="custom-control-input"
              id="colorEight"
              type="checkbox"
            />
            <label
              className="custom-control-label"
              htmlFor="colorEight"
              style={{ color: "#e83e8c" }}
            >
              <span className="text-body">Pink</span>
            </label>
          </div>
        </div>
      </div>
    </li>
  );
}
