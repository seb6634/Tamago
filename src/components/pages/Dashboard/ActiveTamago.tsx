import {
  faBolt,
  faCat,
  faFaceSmile,
  faHeartPulse,
  faKiwiBird,
  faPaw,
  faShower,
  faUtensils,
  faSuitcaseMedical,
  faFaceLaughBeam

} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import ProgressBar from "./ProgressBar";
import React, {useState} from "react";
import {Tamagotchi} from "../../../types";
import Button from "../../parts/Button/Button";
import axios from "axios";
import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import Modal from "../../parts/Modal/Modal";
import {toast} from "react-toastify";

interface ActiveTamagoProps {
  tamago: Tamagotchi;
}

const ActiveTamago = ({tamago}: ActiveTamagoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const abandonedTamago = () => {
    axios.put(
      `${APIBaseUrl}/tamagotchi/${tamago.id}`,
      {
        status: 1
      },
      {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
    ).then((response) => {
      setIsOpen(false);
      window.location.reload();
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

  let animalIcon = "";
  switch (tamago.type.name) {
  case "cat":
    animalIcon = "cat";
    break;
  case "duck":
    animalIcon = "rubber-duck";
    break;
  case "rabbit":
    animalIcon = "rabbit";
    break;
  default:
    animalIcon = "cat";
    break;
  }


  return (
    <section
      className="bg-alice-blue flex px-4 py-4 sm:px-6 sm:py-8 mb-6 flex-col items-center w-full md:w-3/5 max-w-sm mx-auto rounded-lg border-solid border-2 shadow-xl m-2"
    >
      <div className="grid grid-cols-12 gap-3">
        {isOpen
          ? <Modal
            action={() => abandonedTamago()}
            confirmTerm="Confirmer"
            content="Voulez vous vraiment abandonner votre tamagotchi ?"
            setIsOpen={setIsOpen}

          // eslint-disable-next-line react/jsx-closing-bracket-location
          />
          : null}
        {/* Name */}
        <img
          alt="Icone animal "
          className="col-span-2"
          src={`/assets/icons/${animalIcon}.png`} />
        <p className="col-span-10 ml-2 text-left">{tamago.name}</p>
        {/* Health */}
        <FontAwesomeIcon
          className="text-marine-dark mr-4 col-span-2"
          icon={faSuitcaseMedical}
          size="lg"
        />
        <ProgressBar
          className="col-span-10"
          progress={`w-[${tamago.health}%]`}
          value={tamago.health}
        />
        {/* Satiety */}
        <FontAwesomeIcon
          className="text-marine-dark mr-4 col-span-2"
          icon={faUtensils}
          size="lg"
        />
        <ProgressBar
          className="col-span-10"
          progress={`w-[${tamago.satiety}%]`}
          value={tamago.satiety} />
        {/* Energy */}
        <FontAwesomeIcon
          className="text-marine-dark mr-4 col-span-2"
          icon={faBolt}
          size="lg"
        />
        <ProgressBar
          className="col-span-10"
          progress={`w-[${tamago.energy}%]`}
          value={tamago.energy} />
        {/* Cleanliness */}
        <FontAwesomeIcon
          className="text-marine-dark mr-4 col-span-2"
          icon={faShower}
          size="lg"
        />
        <ProgressBar
          className="col-span-10"
          progress={`w-[${tamago.cleanliness}%]`}
          value={tamago.cleanliness} />
        {/* Happiness */}
        <FontAwesomeIcon
          className="text-marine-dark mr-4 col-span-2"
          icon={faFaceLaughBeam}
          size="lg"
        />
        <ProgressBar
          className="col-span-10"
          progress={`w-[${tamago.happiness}%]`}
          value={tamago.happiness} />
      </div>
      <div className="flex flex-wrap gap-2 mt-5 my-4 justify-center">
        <Link
          className="btn btn-orange btn-sm"
          to={`/tamagotchi/${tamago.id}`}
        >
          Jouer
        </Link>
        <Button
          action={() => setIsOpen(true)}
          color="btn-red btn-sm"
          text="Abandonner" />
      </div>
    </section>
  );
};

export default ActiveTamago;
