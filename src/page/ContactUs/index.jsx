import pageApi from "../../service/pageApi";
import InputGroup from "../../component/InputGroup";
import TextareaGroup from "../../component/TextareaGroup";
import useFormValidate from "../../core/useFormValidate";
import { useTranslate } from "../../core/Translate";
import React, { useState } from "react";

export default function ContactUs() {
  let { t } = useTranslate();
  let { form, check, inputChange, error } = useFormValidate(
    {
      name: "",
      email: "",
      title: "",
      message: ""
    },
    {
      rule: {
        name: { required: true },
        email: { required: true, pattern: "email" },
        title: { required: true },
        message: { required: true, min: 50 }
      },
      message: {}
    }
  );

  let [errorMessage, setErrorMessage] = useState("");
  let [message, setMessage] = useState("");

  function _submit() {
    let error = check();
    if (Object.keys(error).length === 0) {
      pageApi.contact(form).then(
        res => {
          if (res.success) {
            setMessage(
              "Gửi liên hệ thành công, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!"
            );
          }
        },
        res => {
          setErrorMessage(res.error);
        }
      );
    }
  }

  return (
    <section className="pt-7 pb-12 contact-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Heading */}
            <h3 className="mb-10 text-center">{t("Contact Us")}</h3>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-12 col-md-4 col-xl-3">
            <aside className="mb-9 mb-md-0">
              {/* Heading */}
              <h6 className="mb-6">
                <i className="fe fe-phone text-primary mr-4" />{" "}
                {t("Call to Us:")}
              </h6>
              {/* Text */}
              <p className="text-gray-500">
                {t(`We're available from 10 am - 10 pm EST, 7 days a week.`)}
              </p>
              <p>
                <strong>{t("Customer Service:")}</strong>
                <br />
                <a className="text-gray-500" href="tel:60146-389-574">
                  6-146-389-574
                </a>
              </p>
              <p className="mb-0">
                <strong>{t("Careers:")}</strong>
                <br />
                <a className="text-gray-500" href="tel:60146-389-574">
                  6-146-389-574
                </a>
              </p>
              {/* Divider */}
              <hr />
              {/* Heading */}
              <h6 className="mb-6">
                <i className="fe fe-mail text-primary mr-4" />{" "}
                {t("Write to Us:")}
              </h6>
              {/* Text */}
              <p className="text-gray-500">
                {t("Fill out our form and we will contact youwithin 24 hours.")}
              </p>
              <p>
                <strong>{t("Customer Service:")}</strong>
                <br />
                <a className="text-gray-500" href="mailto:customer@example.com">
                  customer@example.com
                </a>
              </p>
              <p className="mb-0">
                <strong>{t("Careers:")}</strong>
                <br />
                <a className="text-gray-500" href="mailto:careers@example.com">
                  careers@example.com
                </a>
              </p>
              {/* Divider */}
              <hr />
              {/* Heading */}
              <h6 className="mb-6">
                <i className="fe fe-mail text-primary mr-4" /> {t("Find Us:")}
              </h6>
              {/* Text */}
              <p className="mb-0 text-gray-500">
                {t("Want to visit our Offline Stores?")}
              </p>
              {/* Button */}
              <p className="mb-0">
                <a
                  className="btn btn-link px-0 text-body"
                  href="store-locator.html"
                >
                  {t("Go to Store Locator")}{" "}
                  <i className="fe fe-arrow-right ml-2" />
                </a>
              </p>
            </aside>
          </div>
          <div className="col-12 col-md-8">
            {message && <p className="message">{message}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {/* Form */}
            {/* Email */}
            <InputGroup
              inputChange={inputChange}
              title={t("Name*")}
              name="name"
              error={error}
              form={form}
            />
            {/* Email */}
            <InputGroup
              inputChange={inputChange}
              title={t("Email*")}
              name="email"
              error={error}
              form={form}
            />
            {/* Email */}
            <InputGroup
              inputChange={inputChange}
              title={t("Title*")}
              name="title"
              error={error}
              form={form}
            />
            {/* Email */}
            <TextareaGroup
              inputChange={inputChange}
              title={t("Message*")}
              name="message"
              error={error}
              form={form}
            />
            <p style={{ textAlign: "right" }}>{form.message.length}/ 50</p>
            {/* Button */}
            <button className="btn btn-dark" onClick={_submit}>
              {t("Send Message")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
