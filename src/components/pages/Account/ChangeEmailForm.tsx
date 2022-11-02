import React, {useEffect, useState} from "react";
import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import Button from "../../parts/Button/Button";
import Input from "../../parts/Form/Input";
import {User} from "../../../types";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";


const ChangeEmailForm = ({...user}) => {
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [userData, setUserData] = useState({} as User);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    apiEmail: "",
    email: "",
    password: ""
  });

  const logout = () => {
    axios.post(
      `${APIBaseUrl}/logout`,
      {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
    ).then((res) => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("sayHelloFirstConnection");
      navigate("/login");
      toast.success("Votre email a été modifié");
    })
      .catch((err) => {
        toast.error(
          "Une erreur est survenue !",
          {
            toastId: err.id
          }
        );
        toast.clearWaitingQueue();
      });
  };

  const modifyEmail = (evt:SubmitEvent) => {
    evt.preventDefault();
    // Vérifie que le format de l'email soit valide
    const checkEmail = () => {
      if (userNewEmail.match("^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$")) {
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

    // Vérifie que le mdp soit renseigné
    const checkEmptyPassword = () => {
      if (userPassword !== "") {
        setErrors((prevState) => ({
          ...prevState,
          password: ""
        }));
        return true;
      // eslint-disable-next-line max-statements-per-line
      } setErrors((prevState) => ({
        ...prevState,
        password: "Veuillez renseigner votre mot de passe"
      }));
      return false;
    };


    if (checkEmail() && checkEmptyPassword()) {
      axios.put(
        `${APIBaseUrl}/user/`,
        {
          ...userData,
          email: userNewEmail,
          password: userPassword
        },
        {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
      ).then((response) => {
        logout();
      })
        .catch((err) => {
          setErrors((prevState) => ({
            ...prevState,
            apiEmail: "Une erreur est survenue"
          }));
        });
    }
    return false;
  };

  const cancelForm = () => {
    setDisplayForm(false);
    setUserNewEmail(userNewEmail);
    setUserPassword("");
    setErrors((prevState) => ({
      ...prevState,
      apiEmail: ""
    }));
  };

  useEffect(
    () => {
      setUserData(user.user);
    },
    [user]
  );


  return (
    <>

      <p className="mr-8">Email : {userData.email}</p>
      {
        displayForm === false && (
          <div className="mr-auto">
            <Button
              action={() => setDisplayForm(true)}
              color="btn-orange btn-sm"
              text="Modifier votre email"
            />
          </div>
        )
      }
      {errors.apiEmail !== "" && <p className="text-red">{errors.apiEmail}</p>}
      {
        displayForm === true && (
          <form>
            <Input
              error={errors.email}
              id="email"
              label="Votre nouvel email"
              type="email"
              updateValue={setUserNewEmail}
              value={userNewEmail}
            />
            <Input
              error={errors.password}
              id="password"
              label="Mot de passe"
              type="password"
              updateValue={setUserPassword}
              value={userPassword}
            />
            <div className="mt-2 flex">
              <Button
                action={(evt:any) => modifyEmail(
                  evt
                )}
                color="btn-blue btn-sm"
                text="Valider"
                type="submit"
              />
              <div className="ml-1">
                <Button
                  action={() => cancelForm()}
                  color="btn-red btn-sm"
                  text="Annuler"
                  type="reset"
                />
              </div>
            </div>
          </form>
        )
      }
    </>
  );
};


export default ChangeEmailForm;
