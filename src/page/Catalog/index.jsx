import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/reducer/productReducer";
import Product from "./components/Product";
import Pagination from "../../component/Pagination";
import withPriceFormat from "../../hoc/withPriceFormat";
import { useHistory, useRouteMatch } from "react-router";
import {
  convertQueryToObject,
  serializeObjToQueryURL
} from "../../component/helper";
import Category from "./components/Category";
import Size from "./components/Size";
import Color from "./components/Color";
import Price from "./components/Price";
import Slider from "./components/Slider";
import Brand from "./components/Brand";
import Breadcrumb from "../../component/Breadcrumb";
import { getcategories } from "../../redux/reducer/productReducer";
import { useTranslate } from "../../core/Translate";

export default function Catalog() {
  let dispatch = useDispatch();
  const { categories } = useSelector(state => state.product);
  let { t } = useTranslate();
  let routeMatch = useRouteMatch();
  let history = useHistory();

  let product = useSelector(state => state.product);
  let queryURL = convertQueryToObject();
  let queryString = serializeObjToQueryURL(queryURL);

  let category = {
    title: t("All Product"),
    link: "/catalog"
  };
  let { slug } = routeMatch.params;
  if (slug) {
    slug = slug.replace(/.*id/g, "");
    let f = categories.find(e => e.id == slug);
    if (f) {
      category = {
        title: f.title,
        link: `/catalog/${f.slug}`
      };
    }
  }
  queryString += slug ? `&categories=${slug}` : "";
  console.log(queryString);
  useEffect(() => {
    dispatch(getcategories());

    dispatch(getProduct(queryString + (slug ? `&categories=${slug}` : "")));
  }, [queryString]);

  function sortChange(e) {
    let queryObj = convertQueryToObject();
    queryObj.sort = e.target.value;
    queryObj.page = 1;
    let queryURL = serializeObjToQueryURL(queryObj);
    history.push(`${routeMatch.url}?${queryURL}`);
  }

  return (
    <section className="py-11">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            {/* Filters */}
            <ul className="nav nav-vertical" id="filterNav">
              <Category />
              {/* <Size />
                                <Color />
                                <Brand /> */}
              <Price />
            </ul>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            {/* Slider */}
            <Slider />
            {/* Header */}
            <div className="row align-items-center mb-7">
              <div className="col-12 col-md">
                {/* Heading */}
                <h3 className="mb-1">{category.title}</h3>
                {/* Breadcrumb */}
                <Breadcrumb
                  list={[
                    {
                      title: t("Home"),
                      link: ""
                    },
                    category
                  ]}
                />
              </div>
              <div className="col-12 col-md-auto">
                {/* Select */}
                <select
                  className="custom-select custom-select-xs"
                  onChange={sortChange}
                >
                  <option selected={queryURL.sort === ""} value="">
                    --{t("Sort")}--
                  </option>
                  <option
                    selected={queryURL.sort === "real_price.1"}
                    value="real_price.1"
                  >
                    {t("Low Price")}
                  </option>
                  <option
                    selected={queryURL.sort === "real_price.-1"}
                    value="real_price.-1"
                  >
                    {t("Higher price")}
                  </option>
                  <option
                    selected={queryURL.sort === "rating_average.-1"}
                    value="rating_average.-1"
                  >
                    {t("Higher Rating")}
                  </option>
                  <option
                    selected={queryURL.sort === "discount_rate.-1"}
                    value="discount_rate.-1"
                  >
                    {t("Discount")}
                  </option>
                </select>
              </div>
            </div>
            {/* Tags */}
            {/* <div className="row mb-7">
                            <div className="col-12">
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    Shift dresses <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    Summer <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    M <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    White <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    Red <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    Adidas <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    $10.00 - $49.00 <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    $50.00 - $99.00 <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                            </div>
                        </div> */}
            {/* Products */}
            <div className="row">
              {product.loading &&
                [...Array(15)].map((e, i) => (
                  <div className="col-6 col-md-4" key={i}>
                    <Product loading={true} />
                  </div>
                ))}
              {!product.loading &&
                product.products.map(e => (
                  <div className="col-6 col-md-4" key={e._id}>
                    {withPriceFormat(Product, e)}
                  </div>
                ))}
            </div>
            {/* Pagination */}
            <Pagination {...product.paginate} />
          </div>
        </div>
      </div>
    </section>
  );
}
