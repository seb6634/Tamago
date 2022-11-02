import React, {useEffect, useState} from "react";

import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import PageTitle from "../../parts/layout/PageTitle";
import {User} from "../../../types";
import axios from "axios";
import ChangeNightTimeForm from "./ChangeNightTimeForm";
import DeleteAccount from "./DeleteAccount";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const Account = () => {
  const [user, setUser] = useState({} as User);

  const navigate = useNavigate();

  const getUser = () => {
    axios.get(
      `${APIBaseUrl}/user`,
      {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
    ).then((response) => {
      setUser(response.data);
    })
      .catch((er) => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("firstLogin");
        navigate("/login");
        toast.info("Vous avez été déconnecté!");
      });
  };

  useEffect(
    () => {
      getUser();
    },
    []
  );

  const formatTime = (date: string) => {
    // Const newDate = new Date(date);

    const newDate = new Date(date).toLocaleTimeString()
      .slice(
        0,
        5
      );

    /*
     * Const hours = newDate.setHours(newDate.getHours() - 1);
     * const minutes = `${newDate.getMinutes()}`.slice(-2);
     */

    /*
     * Const hours = `${newDate.getHours()}`.slice(-2);
     * const minutes = `${newDate.getMinutes()}`.slice(-2);
     */

    // Const formatedTime = `${hours}:${minutes}`;
    return newDate;
    // Return formatedTime;
  };


  return (
    <section className="my-10 py-8 px-6 sm:px-12 mx-auto flex flex-col w-11/12 sm:w-4/5 md:w-2/3 lg:w-2/3 space-y-4 bg-white rounded-xl shadow-xl max-w-3xl">
      <PageTitle title="Mon compte" />
      <p>Pseudo : {user.pseudo}</p>
      <ChangeEmailForm user={user} />
      <ChangePasswordForm user={user} />
      <p>Début de la nuit : {formatTime(user.startnight)}</p>
      <p>Fin de la nuit : {formatTime(user.endnight)}</p>
      <p>Vous pouvez modifier l&apos;heure de début de nuit d&apos;un tamago. Un tamago dort 8h par nuit !</p>
      <ChangeNightTimeForm
        action={() => {
          getUser();
        }}
        user={user} />
      <DeleteAccount />

    </section>
  );
};

export default Account;
