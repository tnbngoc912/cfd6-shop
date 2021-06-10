import useInputValidate from "../hook/useInputValidate";
import { useTranslate } from "../core/Translate";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ sizeChartRef }) {
  let { t } = useTranslate();
  let { Input, validate } = useInputValidate("", { pattern: "email" });
  function _submit() {
    let result = validate();
    if (result.value) {
      console.log(result.value);
    }
  }

  return (
    <footer
      className="bg-dark bg-cover @@classList"
      style={{ backgroundImage: "url(/img/patterns/pattern-2.svg)" }}
    >
      <div className="py-12 border-bottom border-gray-700">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6">
              {/* Heading */}
              <h5 className="mb-7 text-center text-white">
                {t("Want style Ideas and Treats?")}
              </h5>
              {/* Form */}
              <div className="mb-11">
                <div className="form-row align-items-start">
                  <div className="col">
                    <Input
                      type="email"
                      className="form-control form-control-gray-700 form-control-lg"
                      placeholder={t("Enter Email *")}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn btn-gray-500 btn-lg"
                      onClick={_submit}
                    >
                      {t("Subscribe")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-3">
              {/* Heading */}
              <h4 className="mb-6 text-white">Shopper.</h4>
              {/* Social */}
              <ul className="list-unstyled list-inline mb-7 mb-md-0">
                <li className="list-inline-item">
                  <Link to="#!" className="text-gray-350">
                    <i className="fab fa-facebook-f" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#!" className="text-gray-350">
                    <i className="fab fa-youtube" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#!" className="text-gray-350">
                    <i className="fab fa-twitter" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#!" className="text-gray-350">
                    <i className="fab fa-instagram" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#!" className="text-gray-350">
                    <i className="fab fa-medium" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white"> {t("Support")} </h6>
              {/* Links */}
              <ul className="list-unstyled mb-7 mb-sm-0">
                <li>
                  <Link className="text-gray-300" to="./contact-us.html">
                    {t("Contact Us")}
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300" to="/faq">
                    {t("FAQs")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300"
                    data-toggle="modal"
                    to="#modalSizeChart"
                    onClick={e => {
                      sizeChartRef.current.open();
                      e.preventDefault();
                    }}
                  >
                    {t("Size Guide")}
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300" to="/shipping-and-returns">
                    {t("Shipping & Returns")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white"> {t("Shop")} </h6>
              {/* Links */}
              <ul className="list-unstyled mb-7 mb-sm-0">
                <li>
                  <Link className="text-gray-300" to="./shop.html">
                    {t(`Men's Shopping`)}
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300" to="./shop.html">
                    {t(`Women's Shopping`)}
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300" to="./shop.html">
                    {t(`Kids' Shopping`)}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white"> {t("Company")} </h6>
              {/* Links */}
              <ul className="list-unstyled mb-0">
                <li>
                  <Link className="text-gray-300" to="./about.html">
                    {t("Our Story")}
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300" to="#!">
                    {t("Careers")}
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300" to="#!">
                    {t("Terms & Conditions")}
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300" to="#!">
                    {t("Privacy & Cookie policy")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white"> {t("Contact")} </h6>
              {/* Links */}
              <ul className="list-unstyled mb-0">
                <li>
                  <Link className="text-gray-300" to="#!">
                    1-202-555-0105
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300" to="#!">
                    1-202-555-0106
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300" to="#!">
                    help@shopper.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="container">
          <div className="row">
            <div className="col">
              {/* Copyright */}
              <p className="mb-3 mb-md-0 font-size-xxs text-muted">
                {" "}
                {t("© 2019 All rights reserved. Designed by Unvab.")}{" "}
              </p>
            </div>
            <div className="col-auto">
              {/* Payment methods */}
              <img
                className="footer-payment"
                src="/img/payment/mastercard.svg"
                alt="..."
              />
              <img
                className="footer-payment"
                src="/img/payment/visa.svg"
                alt="..."
              />
              <img
                className="footer-payment"
                src="/img/payment/amex.svg"
                alt="..."
              />
              <img
                className="footer-payment"
                src="/img/payment/paypal.svg"
                alt="..."
              />
              <img
                className="footer-payment"
                src="/img/payment/maestro.svg"
                alt="..."
              />
              <img
                className="footer-payment"
                src="/img/payment/klarna.svg"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
