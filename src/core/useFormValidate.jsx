import { useState } from "react";

let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/i,
  urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i;

export default function useFormValidate(initialForm, validate) {
  let [form, setForm] = useState(initialForm);
  let [error, setError] = useState({});

  function inputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    form[name] = value;
    // setForm({
    //     ...form,
    //     [name]: value
    // })
  }

  function check() {
    let errorObj = {};
    let { rule, message } = validate;
    if (!message) {
      message = {};
    }

    for (let i in rule) {
      let r = rule[i];
      let m = message[i] || {};

      if (r.required && !form[i]?.trim()) {
        errorObj[i] = m?.required || "Trường này không được để trống";
        continue;
      }

      if (r.pattern && form[i]) {
        let { pattern } = r;
        if (pattern === "email") pattern = emailPattern;
        if (pattern === "phone") pattern = phonePattern;
        if (pattern === "url") pattern = urlPattern;

        if (!pattern?.test(form[i])) {
          errorObj[i] = m.pattern || "Trường này không đúng định dạng";
        }
      }

      if (r.min) {
        if (form[i].length < r.min) {
          errorObj[i] = m?.min || `Trường này không được ít hơn ${r.min} ký tự`;
        }
      }

      if (r.min) {
        if (form[i].length > r.max) {
          errorObj[i] =
            m?.max || `Trường này không được nhiều hơn ${r.max} ký tự`;
        }
      }

      if (r.match && form[r.match]) {
        if (form[i] !== form[r.match]) {
          errorObj[i] = m?.match || `Trường này không giống yêu cầu`;
        }
      }
    }

    setError(errorObj);

    return errorObj;
  }

  function register(name, rule) {
    if (rule) {
      if (!validate.rule) validate.rule = {};
      validate.rule[name] = rule;
    }
    return {
      name,
      onChange: inputChange,
      defaultValue: form[name]
    };
  }

  function handleSubmit(callback) {
    return e => {
      e.preventDefault();
      let error = check();
      if (Object.keys(error).length === 0) {
        callback();
      }
    };
  }

  return {
    form,
    error,
    inputChange,
    check,

    register,
    handleSubmit
  };
}

export function ErrorMessage({ error }) {
  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return null;
}
