import React, {useEffect, useState} from "react";

import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import Button from "../../parts/Button/Button";
import Input from "../../parts/Form/Input";
import {User} from "../../../types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const ChangePasswordForm = ({...user}) => {
  const [userOldPassword, setUserOldPassword] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [userData, setUserData] = useState({} as User);

  const [errors, setErrors] = useState({
    apiPassword: "",
    confirmPassword: "",
    newPassword: "",
    oldPassword: ""
  });

  const navigate = useNavigate();

  const logout = () => {
    axios.post(
      `${APIBaseUrl}/logout`,
      {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
    ).then((res) => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("firstLogin");
      navigate("/login");
      toast.success("Votre mot de passe a été modifié");
    })
      .catch((err) => {
        setErrors((prevState) => ({
          ...prevState,
          apiPassword: "Une erreur est survenue"
        }));
      });
  };


  const modifyPassword = (evt:SubmitEvent) => {
    evt.preventDefault();

    // Vérifie que le nouveau mdp et sa confirmation soient les mêmes
    const checkNewPassword = () => {
      if (userNewPassword === userConfirmPassword) {
        setErrors((prevState) => ({
          ...prevState,
          confirmPassword: ""
        }));
        return true;
      }
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Vos mots de passe ne correspondent pas"
      }));
      return false;
    };

    // Vérifie que le mdp actuel ne soit pas vide
    const checkEmptyOldPassword = () => {
      if (userOldPassword !== "") {
        setErrors((prevState) => ({
          ...prevState,
          oldPassword: ""
        }));
        return true;
      // eslint-disable-next-line max-statements-per-line
      } setErrors((prevState) => ({
        ...prevState,
        oldPassword: "Veuillez renseigner votre mot de passe"
      }));
      return false;
    };

    // Vérifie que le nouveau mdp soit suffisament sécurisé
    const checkPassword = () => {
      if (userNewPassword.length >= 8 &&
        userNewPassword.match("[a-z]") &&
        userNewPassword.match("[A-Z]") &&
        userNewPassword.match("[0-9]")
      ) {
        setErrors((prevState) => ({
          ...prevState,
          newPassword: ""
        }));
        return true;
      }
      setErrors((prevState) => ({
        ...prevState,
        newPassword: "Le mot de passe doit faire au moins 8 caractères, et contenir au moins une minuscule, une majuscule et un chiffre"
      }));
      return false;
    };

    if (checkEmptyOldPassword() && checkPassword() && checkNewPassword()) {
      axios.put(
        `${APIBaseUrl}/user/`,
        {
          ...userData,
          newpassword: userNewPassword,
          password: userOldPassword
        },
        {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
      ).then((response) => {
        logout();
      })
        .catch((err) => {
          setErrors((prevState) => ({
            ...prevState,
            apiPassword: "Une erreur est survenue"
          }));
        });
    }
  };

  const cancelForm = () => {
    setDisplayForm(false);
    setUserOldPassword("");
    setUserNewPassword("");
    setUserConfirmPassword("");
    setErrors((prevState) => ({
      ...prevState,
      apiPassword: ""
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
      {errors.apiPassword !== "" && <p className="text-red text-center">{errors.apiPassword}</p>}
      {
        displayForm === false && (
          <div className="mr-auto">
            <Button
              action={() => setDisplayForm(true)}
              color="btn-orange btn-sm"
              text="Modifier votre mot de passe"
            />
          </div>
        )
      }
      {
        displayForm
          ? <form>
            <Input
              error={errors.oldPassword}
              id="oldPassword"
              label="Mot de passe actuel"
              type="password"
              updateValue={setUserOldPassword}
              value={userOldPassword}
            />
            <Input
              error={errors.newPassword}
              id="newPassword"
              label="Nouveau mot de passe"
              type="password"
              updateValue={setUserNewPassword}
              value={userNewPassword}
            />
            <Input
              error={errors.confirmPassword}
              id="confirmPassword"
              label="Confirmation du mot de passe"
              type="password"
              updateValue={setUserConfirmPassword}
              value={userConfirmPassword}
            />
            <div className="mt-2 flex">
              <Button
                action={(evt:any) => modifyPassword(
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
                /></div>
            </div>
          </form>
          : null
      }
    </>
  );
};

export default ChangePasswordForm;
