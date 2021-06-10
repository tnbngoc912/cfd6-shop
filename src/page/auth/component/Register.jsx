import InputGroup from "../../../component/InputGroup";
import useFormValidate from "../../../core/useFormValidate";
import { useTranslate } from "../../../core/Translate";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../../redux/reducer/authReducer";
import { ErrorMessage } from "../../../core/useFormValidate";
const styles = {
  inputError: {
    color: "red",
    fontSize: 13,
    fontStyle: "italic"
  }
};
export default function Register() {
  let { t } = useTranslate();
  let { error, form, inputChange, register, handleSubmit } = useFormValidate(
    {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      confirm_password: ""
    },
    {
      message: {
        first_name: {
          required: "Họ không được để trống"
        },
        last_name: {
          required: "Tên không được để trống"
        },
        username: {
          required: "Email không được để trống",
          pattern: "Email không đúng định dạng"
        },
        confirm_password: {
          required: "Vui lòng xác nhận mật khẩu",
          match: "Vui lòng điền giống password"
        }
      }
    },
    { className: "form-register" }
  );

  const dispatch = useDispatch();

  function submit() {
    alert("thanh cong");
  }

  const auth = useSelector(state => state.auth);
  console.log("re render");

  return (
    <div className="card-body form-register">
      {/* Heading */}
      <h6 className="mb-7">{t("New Customer")}</h6>
      {auth.registerError && (
        <p className="error-notification" style={styles.inputError}>
          {auth.registerError}
        </p>
      )}
      {/* Form */}
      <form onSubmit={handleSubmit(submit)}>
        <div className="row">
          <div className="col-12">
            {/* Email */}
            <div className={`form-group `}>
              <label>Email</label>

              <input
                className={`form-control form-control-sm`}
                {...register("email", { required: true, pattern: "email" })}
              />
              <ErrorMessage error={error.email} />
            </div>
          </div>
          <div className="col-12">
            {/* Email */}
            <div className={`form-group `}>
              <label>Last Name</label>

              <input
                className={`form-control form-control-sm`}
                {...register("last_name", { required: true })}
              />
              <ErrorMessage error={error.last_name} />
            </div>
          </div>
          <div className="col-12">
            {/* Email */}
            <div className={`form-group `}>
              <label>First Name</label>

              <input
                className={`form-control form-control-sm`}
                {...register("first_name", { required: true })}
              />
              <ErrorMessage error={error.first_name} />
            </div>
          </div>
          <div className="col-12">
            {/* Email */}
            <div className={`form-group `}>
              <label>Username</label>

              <input
                className={`form-control form-control-sm`}
                {...register("username", { rqeuried: true })}
              />

              <ErrorMessage error={error.username} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            {/* Password */}
            <div className={`form-group `}>
              <label>Password</label>

              <input
                className={`form-control form-control-sm`}
                type="password"
                {...register("password", { required: true })}
              />
              <ErrorMessage error={error.password} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            {/* Password */}
            <div className={`form-group `}>
              <label>Confirm Password</label>

              <input
                className={`form-control form-control-sm`}
                {...register("confirm_password", {
                  required: true,
                  match: "password"
                })}
              />
              <ErrorMessage error={error.confirm_password} />
            </div>
          </div>
          <div className="col-12 col-md-auto">
            {/* Link */}
            <div className="form-group font-size-sm text-muted">
              {t(
                "By registering your details, you agree with our Terms & Conditions, and Privacy and Cookie Policy."
              )}
            </div>
          </div>
          <div className="col-12 col-md">
            {/* Newsletter */}
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="registerNewsletter"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="registerNewsletter"
                >
                  {t("Sign me up for the Newsletter!")}
                </label>
              </div>
            </div>
          </div>
          <div className="col-12">
            {/* Button */}
            <button className="btn btn-sm btn-dark" type="submit">
              {t("Register")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
