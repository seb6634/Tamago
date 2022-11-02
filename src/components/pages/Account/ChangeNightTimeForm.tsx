import React, {useEffect, useState} from "react";

import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import Button from "../../parts/Button/Button";
import Input from "../../parts/Form/Input";
import {User} from "../../../types";
import axios from "axios";

const ChangeNightTimeForm = ({action, ...user}:any) => {
  const [userNewStartNight, setUserNewStartNight] = useState("");
  const [errors, setErrors] = useState({
    apiNightTime: "",
    startNight: ""
  });
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState({} as User);
  const [displayForm, setDisplayForm] = useState(false);


  const updateNightHours = (evt:SubmitEvent) => {
    evt.preventDefault();

    if (userNewStartNight === "") {
      setErrors((prevState) => ({
        ...prevState,
        startNight: "Veuillez remplir ce champ"
      }));
    } else {
      const newStartNightTime = `${userNewStartNight}:00`;

      axios.put(
        `${APIBaseUrl}/user/`,
        {
          ...userData,
          startnight: newStartNightTime
        },
        {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
      ).then((res) => {
        setSuccess("L'heure de nuit a bien été modifiée !");
        cancelForm();
        action();
      })
        .catch((err) => {
          setErrors((prevState) => ({
            ...prevState,
            apiNightTime: "Une erreur est survenue"
          }));
        });
    }
  };

  const cancelForm = () => {
    setDisplayForm(false);
    setUserNewStartNight("");
    setErrors({
      apiNightTime: "",
      startNight: ""
    });
  };


  useEffect(
    () => {
      setUserData(user.user);
    },
    [user]
  );

  return (
    <>
      {success !== "" && <p className="text-green">{success}</p>}
      {
        displayForm === false && (
          <div className="mr-auto">
            <Button
              action={() => setDisplayForm(true)}
              color="btn-orange btn-sm"
              text="Modifier les heures de nuit"
            />
          </div>
        )
      }
      {
        displayForm
          ? <form >
            <Input
              error={errors.startNight}
              id="startNight"
              label="Début de la nuit"
              type="time"
              updateValue={setUserNewStartNight}
              value={userNewStartNight}
            />
            <div className="mt-2 flex">
              <Button
                action={(evt:any) => updateNightHours(
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
          : null
      }

    </>
  );
};

export default ChangeNightTimeForm;
