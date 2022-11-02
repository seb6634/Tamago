import "./form.css";
import React from "react";

interface TextAreaProps {
  id: string,
  label?: string,
  placeholder?: string,
}

const TextArea = ({
  id,
  label = "Label",
  placeholder = "Message"
}: TextAreaProps) => (
  <>
    <label
      className="tracking-wide font-bold mb-2"
      htmlFor={id}
    >
      {label}
    </label>
    <textarea
      className="textarea"
      id={id}
      placeholder={placeholder}
      rows={5}
    />
  </>
);


export default TextArea;
