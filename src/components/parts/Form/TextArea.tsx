import "./form.css";
import React from "react";

interface TextAreaProps {
  error?: string,
  id: string,
  label?: string,
  placeholder?: string,
  updateValue: Function,
  value: string,
}

const TextArea = ({
  error,
  id,
  label = "",
  placeholder = "",
  value,
  updateValue
}: TextAreaProps) => (
  <div>
    {label !== "" &&
      <label
        className="tracking-wide font-bold"
        htmlFor={id}
      >
        {label}
      </label>}
    <textarea
      className="input"
      defaultValue={value}
      id={id}
      onChange={(evt) => updateValue(evt.target.value)}
      placeholder={placeholder}
      rows={5}
    />
    {error !== "" && <p className="text-red text-sm pb-4">{error}</p>}
  </div>
);

export default TextArea;
