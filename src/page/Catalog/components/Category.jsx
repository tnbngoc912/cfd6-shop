import { useTranslate } from "../../../core/Translate";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Catagory() {
  const { categories } = useSelector(state => state.product);
  let { t } = useTranslate();

  return (
    <li className="nav-item">
      {/* Toggle */}
      <a
        className="nav-link font-size-lg text-reset border-bottom mb-6"
        data-toggle="collapse"
        href="#categoryCollapse"
      >
        {t("Category")}
      </a>
      {/* Collapse */}
      <div className="form-group">
        <ul className="list-styled mb-0" id="productsNav">
          <li className="list-styled-item">
            <NavLink exact className="list-styled-link" to="/catalog">
              {t("All Product")}
            </NavLink>
          </li>
          {categories.map(e => (
            <li key={e._id} className="list-styled-item">
              <NavLink className="list-styled-link" to={`/catalog/${e.slug}`}>
                {e.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
