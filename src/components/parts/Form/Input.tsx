import "./form.css";
import React, {useState} from "react";
import Button from "../Button/Button";

interface InputProps {
  error?: string,
  id: string,
  isDisabled?: boolean,
  isUpdatable?: boolean,
  type?: "text" | "email" | "password" | "time",
  label?: string,
  placeholder?: string,
  updateValue?: Function,
  validateUpdates?: Function
  value: string,
}

const Input = ({
  error,
  id,
  isDisabled = false,
  isUpdatable = false,
  type = "text",
  label = "",
  placeholder = "",
  value,
  updateValue = () => null,
  validateUpdates = () => null
}:InputProps) => {
  const [editing, setEditing] = useState(false);
  const [disabled, setDisabled] = useState(isDisabled);
  const [inputValue, setInputValue] = useState(value);

  /**
   * Toggle input for edition
   * @param evt Event
   */
  const toggleEdit = () => {
    setDisabled((prevState) => !prevState);
    setEditing((prevState) => !prevState);
  };

  /**
   * Change input value and send value to parent component if it is a basic input
   * @param evt any
   */
  const handleChange = (evt:any) => {
    setInputValue(evt.target.value);
    !isDisabled && !isUpdatable && updateValue(evt.target.value);
  };

  /**
   * Toggle edit and send input value for validation action
   */
  const validate = () => {
    if (validateUpdates(inputValue)) {
      toggleEdit();
      updateValue(inputValue);
    }
  };

  /**
   * Toggle edit and reset input value at original value
   */
  const cancel = () => {
    toggleEdit();
    setInputValue(value);
  };

  return (
    <div>
      {label !== "" &&
        <label
          className="tracking-wide font-bold"
          htmlFor={id}
        >
          {label}
        </label>}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
        <input
          className="input"
          disabled={disabled}
          id={id}
          onChange={handleChange}
          placeholder={placeholder}
          type={type}
          value={inputValue}
        />
        {isUpdatable === true && editing === true &&
          <>
            <Button
              action={validate}
              color="btn-blue"
              text="Valider"
            />
            <Button
              action={cancel}
              color="btn-orange"
              text="Annuler"
            />
          </>}
        {isUpdatable === true && editing === false &&
          <Button
            action={toggleEdit}
            color="btn-orange"
            text="Modifier"
          />}
      </div>
      {error !== "" && <p className="text-red text-sm pb-2">{error}</p>}
    </div>
  );
};

export default Input;
