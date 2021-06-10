import useFormValidate from "../../../core/useFormValidate";
import { useTranslate } from "../../../core/Translate";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../redux/reducer/authReducer";
import { useForm, ErrorMessage } from "../../../core/useForm";
const styles = {
  inputError: {
    color: "red",
    fontSize: 13,
    fontStyle: "italic"
  }
};
export default function Login() {
  let { t } = useTranslate();

  let { register, handleSubmit, error } = useForm(
    {
      username: "",
      password: ""
    },
    {
      message: {
        username: {
          required: "Username không được để trống",
          pattern: "Trường này không đúng định dạng vd: example@gmail.com"
        },
        password: {
          required: "Password không được để trống"
        }
      }
    }
  );

  const dispatch = useDispatch();

  function formSubmitValidateSuccess(form) {
    dispatch(loginAction(form));
  }

  const auth = useSelector(state => state.auth);
  console.log("render form");

  return (
    <div className="card-body">
      {/* Heading */}
      <h6 className="mb-7">{t("Returning Customer")}</h6>
      {auth.loginError && (
        <p className="error-notification" style={styles.inputError}>
          {auth.loginError}
        </p>
      )}
      {/* Form */}
      <form onSubmit={handleSubmit(formSubmitValidateSuccess)}>
        <div className="row">
          <div className="col-12">
            {/* Email */}
            <div className="form-group">
              <label className="sr-only" htmlFor="loginEmail">
                {t("Email Address *")}
              </label>
              <input
                className="form-control form-control-sm"
                id="loginEmail"
                type="text"
                placeholder={t("Email Address *")}
                {...register("username", { required: true, pattern: "email" })}
              />
              <ErrorMessage error={error.username} />
            </div>
          </div>
          <div className="col-12">
            {/* Password */}
            <div className="form-group">
              <label className="sr-only" htmlFor="loginPassword">
                {t("Password *")}
              </label>
              <input
                className="form-control form-control-sm"
                id="loginPassword"
                type="password"
                placeholder={t("Password *")}
                {...register("password", { required: true })}
              />
              <ErrorMessage error={error.password} />
            </div>
          </div>
          <div className="col-12 col-md">
            {/* Remember */}
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="loginRemember"
                  type="checkbox"
                />
                <label className="custom-control-label" htmlFor="loginRemember">
                  {t("Remember me")}
                </label>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-auto">
            {/* Link */}
            <div className="form-group">
              <a
                className="font-size-sm text-reset"
                data-toggle="modal"
                href="#modalPasswordReset"
              >
                {t("Forgot Password?")}
              </a>
            </div>
          </div>
          <div className="col-12">
            {/* Button */}
            <button className="btn btn-sm btn-dark" type="submit">
              {t("Sign In")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
