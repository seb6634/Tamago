import React, {useState} from "react";
import Button from "../../parts/Button/Button";
import Input from "../../parts/Form/Input";
import PageTitle from "../../parts/layout/PageTitle";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    confirmPassword: "",
    password: ""
  });

  /**
   * Send request to API to change user password
   * @param evt SubmitEvent
   */
  const updatePassword = (evt:SubmitEvent) => {
    evt.preventDefault();
    if (checkForm()) {
      // If form is validated, send it TODO
    }
  };

  /**
   * Check all fields and set errors if needed
   * @returns bool
   */
  const checkForm = () => {
    const checkPassword = () => {
      if (password.length >= 8 &&
        password.match("[a-z]") &&
        password.match("[A-Z]") &&
        password.match("[0-9]")
      ) {
        setErrors((prevState) => ({
          ...prevState,
          password: ""
        }));
        return true;
      }
      setErrors((prevState) => ({
        ...prevState,
        password: "Le mot de passe doit faire au moins 8 caractères, et contenir au moins une minuscule, une majuscule et un chiffre"
      }));
      return false;
    };

    const checkConfirmPassword = () => {
      if (password === confirmPassword) {
        setErrors((prevState) => ({
          ...prevState,
          pseudo: ""
        }));
        return true;
      }
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Le mot de passe et sa confirmation ne sont pas identiques"
      }));
      return false;
    };

    checkPassword();
    checkConfirmPassword();
    return checkPassword() && checkConfirmPassword();
  };

  return (
    <form className="mt-10 p-8 mx-auto flex flex-col sm:w-4/5 md:w-1/2 lg:w-1/3 space-y-4">
      <PageTitle title="Changer mon mot de passe" />
      <Input
        error={errors.password}
        id="new-password"
        label="Nouveau mot de passe"
        type="password"
        updateValue={setPassword}
        value={password}
      />
      <Input
        error={errors.confirmPassword}
        id="new-password-confirm"
        label="Confirmation du nouveau mot de passe"
        type="password"
        updateValue={setConfirmPassword}
        value={confirmPassword}
      />
      <div className="self-center">
        <Button
          action={updatePassword}
          color="btn-blue"
          text="Envoyer"
          type="submit"
        />
      </div>
    </form>
  );
};

export default ChangePassword;
