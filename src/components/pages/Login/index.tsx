import "./login.css";
import React, {useEffect, useState} from "react";
import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import Button from "../../parts/Button/Button";
import Input from "../../parts/Form/Input";
import PageTitle from "../../parts/layout/PageTitle";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
  const login = (evt:SubmitEvent) => {
    evt.preventDefault();
    axios.post(
      `${APIBaseUrl}/login_check`,
      {
        password,
        username: email
      }
    ).then((response) => {
      setError("");
      localStorage.setItem(
        "jwt",
        response.data.token
      );
      localStorage.setItem(
        "sayHelloFirstConnection",
        "true"
      );
      navigate("/dashboard");
    })
      .catch((er) => {
        er.response.status === 401
          ? setError("Identifiants invalides")
          : setError("Une erreur est survenue");
      });
  };

  return (
    <form className="mt-36 mb-14 p-4 md:p-8  mx-auto flex flex-col w-11/12 md:w-1/2 lg:w-1/3 space-y-4 bg-white relative rounded-xl shadow-xl">
      <img
        alt="Corgi"
        className="absolute happy-corgi"
        src="/assets/images/corgi-hi.png"
      />
      <PageTitle title="Connexion" />
      <Input
        id="email"
        label="Votre email"
        type="email"
        updateValue={setEmail}
        value={email}
      />
      <Input
        id="password"
        label="Votre mot de passe"
        type="password"
        updateValue={setPassword}
        value={password}
      />
      {error !== "" && <p className="text-red text-center text-sm">{error}</p>}
      <div className="self-center">
        <Button
          action={login}
          text="Me connecter"
          type="submit"
        />
      </div>
      <div className="self-center pt-2">
        <Link to="/signin">Pas encore de compte ? <span className="font-semibold">M&apos;inscrire</span></Link>
      </div>
    </form>
  );
};

export default Login;
