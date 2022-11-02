import React, {useEffect, useState} from "react";
import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import ActiveTamago from "./ActiveTamago";
import Button from "../../parts/Button/Button";
import Input from "../../parts/Form/Input";
import Loader from "../../parts/Loader";
import PageTitle from "../../parts/layout/PageTitle";
import Status from "../../../enums/Status";
import {Tamagotchi} from "../../../types";
import UnactiveTamago from "./UnactiveTamago";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const Dashboard = () => {
  const [activeTamago, setActiveTamago] = useState<Tamagotchi|null>(null);
  const [unactiveTamagos, setUnactiveTamagos] = useState<Array<Tamagotchi>>([]);
  const [loading, setLoading] = useState(true);
  const [tamagoCreation, setTamagoCreation] = useState(false);
  const [newTamagoName, setNewTamagoName] = useState("");
  const [error, setError] = useState({
    newTamagoName: ""
  });
  const navigate = useNavigate();

  const createTamago = () => {
    if (newTamagoName.length > 3) {
      setError((prevState) => ({
        ...prevState,
        newTamagoName: ""
      }));
      setLoading(true);
      setTamagoCreation(true);

      axios.post(
        `${APIBaseUrl}/tamagotchi`,
        {
          light: true,
          name: newTamagoName
        },
        {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
      ).then((response) => {
        setTimeout(
          () => navigate(`/tamagotchi/${response.data.id}`),
          5000
        );
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
    } else {
      setError((prevState) => ({
        ...prevState,
        newTamagoName: "Le nom doit faire plus de 3 caractères"
      }));
    }
  };

  const getTamago = () => {
    axios.get(
      `${APIBaseUrl}/user/tamagotchi/`,
      {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
    ).then((response) => {
      const tamagos: Tamagotchi[] = [];
      response.data.forEach((tamago:Tamagotchi) => {
        if (tamago.status === Status.AWAKE || tamago.status === Status.ASLEEP) {
          setActiveTamago(tamago);
        } else {
          tamagos.push(tamago);
          setUnactiveTamagos(tamagos);
        }
      });
    })
      .catch((err) => {
        toast.error(
          "Une erreur est survenue !",
          {
            toastId: err.id
          }
        );
        toast.clearWaitingQueue();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUser = () => {
    axios.get(
      `${APIBaseUrl}/user/`,
      {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
    ).then((response) => {
      if (localStorage.getItem("sayHelloFirstConnection")) {
        toast(
          `Bienvenue ${response.data.pseudo}`
        );
        localStorage.removeItem("sayHelloFirstConnection");
      }
    })
      .catch((er) => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("firstLogin");
        navigate("/login");
        toast.info("Vous avez été déconnecté!");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  useEffect(
    () => {
      getTamago();
      getUser();
    },
    []
  );
  const style = {
    backgroundImage: "url(\"./assets/images/stars.png\")",
    backgroundPosition: "center"
  };
  return (
    <div className="my-10 py-8 px-3 mx-auto flex flex-col w-11/12 sm:w-4/5 bg-white rounded-lg">
      <div
        className="text-center"
        style={style}>
        <PageTitle title="Mon tamago" />
        {loading === true && <Loader />}
        {activeTamago === null
          ? (
            <div
              className="text-center"
            >
              {tamagoCreation === true
                ? (
                  <>
                    <p className="mb-4">Création de votre Tamago en cours...</p>
                  </>
                )
                : (
                  <>
                    <p className="mb-4">Vous n&#39;avez pas de Tamago actif</p>
                    <div className="mx-auto max-w-md">
                      <Input
                        error={error.newTamagoName}
                        id="name"
                        label="Choisissez un nom"
                        updateValue={setNewTamagoName}
                        value={newTamagoName}
                      />
                    </div>
                    <Button
                      action={createTamago}
                      color="btn-orange"
                      isDisabled={loading}
                      text="Créer un Tamago"
                    />
                  </>
                )}
            </div>)
          : <ActiveTamago
            tamago={activeTamago}
          />}
      </div>
      <hr className="my-8 border-orange-light border-2 bg-orange-light mx-4" />
      {unactiveTamagos.length
        ? (
          <>
            <PageTitle title="Historique des tamagos" />
            <div className="md:flex md:flex-wrap md:max-w-fit mb-4 md:mx-auto gap-1">
              {unactiveTamagos.map((unactiveTamago) => (
                <UnactiveTamago
                  key={unactiveTamago.id}
                  tamago={unactiveTamago}
                />
              ))}
            </div>
          </>
        )
        : null}
    </div>
  );
};

export default Dashboard;
