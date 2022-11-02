import {calculateAge, formatDate} from "../../../utils";
import {faCat, faClock, faHeart, faKiwiBird, faPaw, faStarOfLife, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Tamagotchi} from "../../../types";

interface UnactiveTamagoProps {
  tamago: Tamagotchi
}

const UnactiveTamago = ({tamago}: UnactiveTamagoProps) => {
  const displayStatus = () => {
    switch (tamago.status) {
    case 0:
      return "Mort";
    case 1:
      return "Abandonné";
    default:
      return "Mort";
    }
  };

  const displayAge = () => {
    const days = calculateAge(
      tamago.createdAt,
      tamago.updatedAt
    );
    return `${days} jour${days > 1
      ? "s"
      : ""}`;
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
    <section className="flex bg-alice-blue flex-col items-center w-4/5 md:w-2/5 lg:w-1/5 mx-auto mb-4 p-3 rounded-lg border-solid border-2 shadow-xl m-2" >
      <div className="grid grid-cols-12 gap-2">
        {/* Name */}
        <img
          alt="Icone animal "
          className="col-span-2"
          src={`/assets/icons/${animalIcon}.png`} />
        <p className="col-span-10 mx-1">{tamago.name}</p>
        {/* Reason of death/abandoned */}
        <FontAwesomeIcon
          className="text-red col-span-2 "
          icon={faStarOfLife}
          size="lg"
        />
        <p className="col-span-10">{displayStatus()}</p>
        {/* Dates */}
        <FontAwesomeIcon
          className="text-blue-dark  col-span-2 "
          icon={faHeart}
          size="lg"
        />
        <p className="col-span-10">{formatDate(tamago.createdAt)} - {formatDate(tamago.updatedAt)}</p>
        {/* Age */}
        <FontAwesomeIcon
          className=" col-span-2"
          icon={faClock}
          size="lg"
        />
        <p className="col-span-10 ">{displayAge()}</p>
      </div>
    </section>
  );
};


export default UnactiveTamago;
