import React, {useState} from "react";
import Button from "../../parts/Button/Button";
import Input from "../../parts/Form/Input";
import PageTitle from "../../parts/layout/PageTitle";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    firstname: "",
    lastname: "",
    message: ""
  });

  /**
   * Send request to API to send message
   * @param evt SubmitEvent
   */
  const sendResetPasswordMail = (evt:SubmitEvent) => {
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
    const checkEmail = () => {
      if (email.match("^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$")) {
        setErrors((prevState) => ({
          ...prevState,
          email: ""
        }));
        return true;
      }
      setErrors((prevState) => ({
        ...prevState,
        email: "Votre email est invalide"
      }));
      return false;
    };

    return checkEmail();
  };

  return (
    <form className="mt-10 p-8 mx-auto flex flex-col sm:w-4/5 md:w-1/2 lg:w-1/3 space-y-4">
      <PageTitle title="Demande de réinitialisation du mot de passe" />
      <Input
        error={errors.email}
        id="email"
        label="Email"
        type="email"
        updateValue={setEmail}
        value={email}
      />
      <div className="self-center">
        <Button
          action={sendResetPasswordMail}
          color="btn-blue"
          text="Envoyer"
          type="submit"
        />
      </div>
    </form>
  );
};

export default ResetPassword;
