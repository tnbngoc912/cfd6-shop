import { useState } from "react";

let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
  phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/i,
  urlPattern = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/i;

export default function useFormValidate(initialForm, validate) {
  let [form, setForm] = useState(initialForm);
  let [error, setError] = useState({});

  function inputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setForm({
      ...form,
      [name]: value
    });
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
      if (r.required && !form[i]) {
        errorObj[i] = m?.required || "This field is required";
        continue;
      }
      if (r.pattern && form[i]) {
        let { pattern } = r;
        if (pattern === "email") {
          pattern = emailPattern;
        }
        if (pattern === "phone") {
          pattern = phonePattern;
        }
        if (pattern === "url") {
          pattern = urlPattern;
        }

        if (!pattern?.test(form[i])) {
          errorObj[i] = m?.pattern || "Incorrect format";
        }
      }

      if (r.min) {
        if (form[i].length < r.min) {
          errorObj[i] = m?.min || `Must be more than ${r.min} characters`;
        }
      }
      if (r.min) {
        if (form[i].length > r.max) {
          errorObj[i] = m?.max || `Must be more than ${r.max} characters`;
        }
      }
    }
    setError(errorObj);
    return errorObj;
  }

  return { form, error, inputChange, check };
}
