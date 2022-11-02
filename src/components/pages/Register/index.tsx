import "./register.css";
import React, {useEffect, useState} from "react";
import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import Button from "../../parts/Button/Button";
import Input from "../../parts/Form/Input";
import PageTitle from "../../parts/layout/PageTitle";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    confirmPassword: "",
    email: "",
    password: "",
    pseudo: ""
  });
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  /**
   * Redirects to Dashboard if user is connected
   */
  useEffect(
    () => {
      localStorage.getItem("jwt") && navigate("/dashboard");
    },
    []
  );

  /**
   * Send request to API to register user
   * @param evt SubmitEvent
   */
  const register = (evt:SubmitEvent) => {
    evt.preventDefault();
    if (checkForm()) {
      axios.post(
        `${APIBaseUrl}/user/`,
        {
          email,
          password,
          pseudo
        }
      ).then((response) => {
        navigate("/login");
      })
        .catch((er) => setRegistrationError("Une erreur est survenue"));
    }
  };

  /**
   * Check all fields and set errors if needed
   * @returns bool
   */
  const checkForm = () => {
    const checkPseudo = () => {
      if (pseudo.length < 3) {
        setErrors((prevState) => ({
          ...prevState,
          pseudo: "Le pseudo doit faire au moins 3 caractères"
        }));
        return false;
      }
      setErrors((prevState) => ({
        ...prevState,
        pseudo: ""
      }));
      return true;
    };

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

    checkPseudo();
    checkEmail();
    checkPassword();
    checkConfirmPassword();
    return checkPseudo() && checkEmail() && checkPassword() && checkConfirmPassword();
  };

  return (

    <form className="mt-40 p-4 pb-8 sm:px-8 mx-auto mb-8 flex flex-col w-11/12  lg: space-y-4 bg-white relative rounded-xl shadow-xl max-w-xl">
      <img
        alt="Corgi"
        className="absolute happy-corgi"
        src="/assets/images/happy-corgi.png"
      />
      <PageTitle title="Inscription" />
      <Input
        error={errors.pseudo}
        id="pseudo"
        label="Votre pseudo"
        updateValue={setPseudo}
        value={pseudo}
      />
      <Input
        error={errors.email}
        id="email"
        label="Votre email"
        type="email"
        updateValue={setEmail}
        value={email}
      />
      <Input
        error={errors.password}
        id="password"
        label="Votre mot de passe"
        type="password"
        updateValue={setPassword}
        value={password}
      />
      <Input
        error={errors.confirmPassword}
        id="confirmPassword"
        label="Confirmez votre mot de passe"
        type="password"
        updateValue={setConfirmPassword}
        value={confirmPassword}
      />
      {registrationError !== "" && <p className="text-red text-center text-sm">{registrationError}</p>}
      <div className="self-center">
        <Button
          action={register}
          text="M'inscrire"
          type="submit"
        />
      </div>
      <Link
        className="text-center"
        to="/login">Déja un compte ? <span className="font-semibold">Me connecter</span></Link>
    </form>
  );
};

export default Register;
