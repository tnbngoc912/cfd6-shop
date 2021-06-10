import { useState } from "react";

export default function InputGroup({
  form,
  name,
  title,
  type = "text",
  placeholder,
  inputChange,
  error,
  className,
  disabled,
  inputClass
}) {
  if (!placeholder) placeholder = title;
  let [randomID, setRandomID] = useState(
    "id-" + Math.round(Math.random() * 100000)
  );

  return (
    <div className={`form-group ${className}`}>
      {title && <label htmlFor={randomID}>{title}</label>}

      <input
        disabled={disabled}
        className={`form-control form-control-sm ${inputClass}`}
        id={randomID}
        name={name}
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={inputChange}
      />
      {error[name] && <p className="error-text">{error[name]}</p>}
    </div>
  );
}
