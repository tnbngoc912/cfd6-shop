import useInputValidate from "../../hook/useInputValidate";
import { useTranslate } from "../../core/Translate";
import React from "react";
import useCountDown from "../../hook/useCountDown";

export default function CommingSoon() {
  let { t } = useTranslate();
  let { day, hours, minute, seconds } = useCountDown(
    (1 * 24 + 5) * 60 * 60 + 1800
  );
  let { Input, validate } = useInputValidate("", { pattern: "email" });
  function _submit() {
    let result = validate();
    if (result.value) {
      console.log(result.value);
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark @@classList">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand" href="./overview.html">
            Shopper.
          </a>
          {/* Nav */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#!">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li className="nav-item ml-n4">
              <a className="nav-link" href="#!">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li className="nav-item ml-n4">
              <a className="nav-link" href="#!">
                <i className="fab fa-instagram" />
              </a>
            </li>
            <li className="nav-item ml-n4">
              <a className="nav-link" href="#!">
                <i className="fab fa-medium" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <section
        className="bg-cover"
        style={{
          marginTop: "-90px",
          backgroundImage: "url(/img/covers/cover-22.jpg)"
        }}
      >
        <div className="container d-flex flex-column">
          <div className="row align-items-center justify-content-center min-vh-100 pt-13 pb-12">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center text-white">
              {/* Heading */}
              <h1>{t("We are Coming Soon")}</h1>
              {/* Text */}
              <p className="mb-9 font-size-lg">
                {t("Our team have been working on somesing amazing.")}
              </p>
              {/* Counter */}
              <div
                className="d-flex justify-content-center mb-10"
                data-countdown
                data-date="Jan 5, 2021 15:37:25"
              >
                <div className="text-center">
                  <div className="font-size-h1 font-weight-bolder" data-days>
                    {day}
                  </div>
                  <div className="heading-xxs">{t("Days")}</div>
                </div>
                <div className="px-1 px-md-4">
                  <div className="font-size-h2 font-weight-bolder">:</div>
                </div>
                <div className="text-center">
                  <div className="font-size-h1 font-weight-bolder" data-hours>
                    {hours.toString().padStart(2, 0)}
                  </div>
                  <div className="heading-xxs">{t("Hours")}</div>
                </div>
                <div className="px-1 px-md-4">
                  <div className="font-size-h2 font-weight-bolder">:</div>
                </div>
                <div className="text-center">
                  <div className="font-size-h1 font-weight-bolder" data-minutes>
                    {minute.toString().padStart(2, 0)}
                  </div>
                  <div className="heading-xxs">{t("Minutes")}</div>
                </div>
                <div className="px-1 px-md-4">
                  <div className="font-size-h2 font-weight-bolder">:</div>
                </div>
                <div className="text-center">
                  <div className="font-size-h1 font-weight-bolder" data-seconds>
                    {seconds.toString().padStart(2, 0)}
                  </div>
                  <div className="heading-xxs">{t("Seconds")}</div>
                </div>
              </div>
              {/* Form */}
              <div className="form-row">
                <div className="col-12 col-md">
                  {/* Input */}
                  <div className="form-group mb-md-0">
                    <label className="sr-only" htmlFor="comingSoonEmail" />
                    <Input
                      className="form-control form-control-dark"
                      id="comingSoonEmail"
                      type="email"
                      placeholder="Enter Email *"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-auto">
                  {/* Button */}
                  <button
                    className="btn btn-dark"
                    type="submit"
                    onClick={_submit}
                  >
                    {t("Notify me!")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
