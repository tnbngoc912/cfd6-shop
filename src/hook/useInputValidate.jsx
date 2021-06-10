import { useCallback } from "react";
import { forwardRef } from "react";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";

let patternEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
let patternURL = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
let patternPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export default function useInputValidate(initialValue, rule, message) {
  let [value, setValue] = useState({ val: initialValue });

  let [error, setError] = useState();

  let inputRef = useRef();

  useEffect(() => {
    inputRef.current.onchange = inputChange;
  }, [inputRef]);

  function inputChange(event) {
    value.val = event.target.value;
  }

  function validate() {
    $(inputRef.current).removeClass("error-input");
    $(inputRef.current)
      .next(".error-text")
      .remove();

    let errorT;

    if (rule.required) {
      if (!value.val) {
        errorT = message?.required || "Trường này không được để trống";
      }
    }

    if (rule.pattern) {
      let pattern = rule.pattern;
      if (pattern === "email") pattern = patternEmail;
      if (pattern === "phone") pattern = patternPhone;
      if (pattern === "url") pattern = patternURL;

      if (!pattern.test(value.val)) {
        errorT = message?.pattern || "Trường này không đúng định dạng yêu cầu";
      }
    }

    if (rule.min && value.val?.length < rule.min) {
      errorT = message?.min || `Trường này phải dài hơn ${rule.min} kí tự`;
    }

    if (rule.max && value.val?.length > rule.max) {
      errorT =
        message?.max || `Trường này không được dài hơn ${rule.max} kí tự`;
    }

    if (errorT) {
      $(inputRef.current).addClass("error-input");
      $(inputRef.current).after(`<p class="error-text">${errorT}</p>`);
      return { error: errorT };
    }

    return { value: value.val };
  }

  let Input = useCallback(
    props => (
      <input type="text" {...props} ref={inputRef} defaultValue={value.val} />
    ),
    []
  );

  return {
    Input: Input,
    validate,
    value
  };
}
