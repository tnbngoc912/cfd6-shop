import userApi from "../../../../service/userApi";
import InputGroup from "../../../../component/InputGroup";
import useFormValidate from "../../../../hook/useFormValidate";
import { useTranslate } from "../../../../core/Translate";
import React from "react";
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";

export default function Address() {
  let { _id } = useRouteMatch().params;
  let { t } = useTranslate();
  let history = useHistory();
  useEffect(async () => {
    if (_id) {
      let address = await userApi.getAddress(_id);
      if (address.data) {
        setForm(address.data);
      }
    }
  }, []);

  let { form, error, check, inputChange, setForm } = useFormValidate(
    {
      _id,
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      country: "",
      address_line1: "",
      address_line2: "",
      city: "",
      postcode: "",
      phone: "",
      default: false
    },
    {
      rule: {
        first_name: { required: true },
        last_name: { required: true },
        email: { pattern: "email" },
        country: { required: true },
        address_line1: { required: true },
        city: { required: true },
        postcode: { required: true },
        phone: { pattern: "phone" }
      }
    }
  );

  function _submit() {
    let error = check();
    if (Object.keys(error).length === 0) {
      userApi.addAddress(form).then(res => {
        history.push("/account/address");
      });
    }
  }

  return (
    <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
      {/* Heading */}
      <h6 className="mb-7">{t("Add Address")}</h6>
      {/* Form */}
      <div className="row">
        <div className="col-12 col-md-6">
          <InputGroup
            inputChange={inputChange}
            form={form}
            name="first_name"
            error={error}
            title="First Name *"
          />
        </div>
        <div className="col-12 col-md-6">
          <InputGroup
            inputChange={inputChange}
            form={form}
            name="last_name"
            error={error}
            title="Last Name *"
          />
        </div>
        <div className="col-12">
          <InputGroup
            inputChange={inputChange}
            form={form}
            name="email"
            error={error}
            title="Email Address *"
          />
        </div>
        <div className="col-12">
          <InputGroup
            inputChange={inputChange}
            form={form}
            name="company"
            error={error}
            title="Company Name"
          />
        </div>
        <div className="col-12">
          <InputGroup
            inputChange={inputChange}
            form={form}
            name="country"
            error={error}
            title="Country *"
          />
        </div>
        <div className="col-12">
          <InputGroup
            inputChange={inputChange}
            form={form}
            name="address_line1"
            error={error}
            title="Address Line 1 *"
          />
        </div>
        <div className="col-12">
          <InputGroup
            inputChange={inputChange}
            form={form}
            name="address_line2"
            error={error}
            title="Address Line 2"
          />
        </div>
        <div className="col-12 col-md-6">
          <InputGroup
            inputChange={inputChange}
            form={form}
            name="city"
            error={error}
            title="Town / City *"
          />
        </div>
        <div className="col-12 col-md-6">
          <InputGroup
            inputChange={inputChange}
            form={form}
            name="postcode"
            error={error}
            title="ZIP / Postcode *"
          />
        </div>
        <div className="col-12">
          <InputGroup
            inputChange={inputChange}
            form={form}
            name="phone"
            error={error}
            title="Mobile Phone *"
          />
        </div>
        <div className="col-12">
          <div className="form-group">
            <div className="custom-control custom-checkbox mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="defaultDeliveryAddress"
                checked={form.default}
                onChange={inputChange}
                name="default"
              />
              <label
                className="custom-control-label"
                htmlFor="defaultDeliveryAddress"
              >
                {t("Default delivery address")}
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Button */}
      <button className="btn btn-dark" type="submit" onClick={_submit}>
        {t("Add Address")}
      </button>
    </div>
  );
}
