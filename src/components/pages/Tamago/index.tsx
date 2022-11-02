/* eslint-disable sort-keys */
/* eslint-disable no-negated-condition */
/* eslint-disable max-lines */
import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Poops, Tamagotchi, StatButtonProperty} from "../../../types";
import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import StatButton from "../../parts/Button/StatButton";
import TamagoScreen from "./tamagoScreen";
import {toast} from "react-toastify";
import NotFound from "../NotFound";
import Status from "../../../enums/Status";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompress, faExpand, faSmile} from "@fortawesome/free-solid-svg-icons";
import {checkIfLoggedIn, useWindowDimensions} from "../../../utils";
import FoodModal from "../../parts/Modal/FoodModal";

interface TamagoProps {
  onOffFullScreen: Function,
    fullScreen: boolean,
  }


const Tamago = ({onOffFullScreen, fullScreen}:TamagoProps) => {
  const {width} = useWindowDimensions();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [tamago, setTamago] = useState({} as Tamagotchi);
  const [tamagoType, setTamagoType] = useState("" as unknown as string);
  const [emotion, setEmotion] = useState("idle");
  const [light, setLight] = useState(true);
  const tamagoEmotions = ["idle", "no", "sleep", "feed", "unhappy", "wash", "play", "care"];
  const [poops, setPoops] = useState<Poops[]>([]);
  const [foodIcon, setFoodIcon] = useState("lunch");
  const [freeMode, setFreeMode] = useState(false);
  const [lightClick, setLightClick] = useState(0);
  const toastId = useRef(null);
  const navigate = useNavigate();
  let runningAnimation = false;
  const poopsArr: Poops[] = [
    {
      locationX: 40,
      locationY: 80
    },
    {
      locationX: 30,
      locationY: 5
    },
    {
      locationX: 15,
      locationY: 25
    }
  ];

  const statButtonProperty: StatButtonProperty[] = [
    {
      action: "wash",
      icon: "shower",
      value: tamago.cleanliness
    },
    {
      action: "play",
      icon: "play",
      value: tamago.happiness
    },
    {
      action: "sleep",
      allTimeDisabled: true,
      icon: "energy",
      value: tamago.energy
    },
    {
      action: "care",
      icon: "medical",
      value: tamago.health
    },
    {
      action: "feed",
      icon: foodIcon,
      value: tamago.satiety
    }
  ];

  const updateTamago = async (property:string, feed?:string) => {
    if (freeMode) {
      return;
    }
    try {
      const response = await axios.put(
        `${APIBaseUrl}/tamagotchi/${tamago.id}`,
        feed
          ? {
            actions: property,
            food: feed
          }
          : {
            actions: property
          },
        {headers: {Authorization: `Bearer ${localStorage.jwt}`}}

      );
      const data = await response.data;
      setTamago(data);
      calculateStatus(data);
      launchAnimation(property);
    } catch (error) {
      toast.error(
        "Une erreur est survenue !",
        {
          toastId: toastId.current ?? ""
        }
      );
      toast.clearWaitingQueue();
    }
  };

  const getTamago = async () => {
    if (runningAnimation) {
      return;
    }

    try {
      const response = await axios.get(
        `${APIBaseUrl}${location.pathname}`,
        {headers: {Authorization: `Bearer ${localStorage.jwt}`}}

      );
      const data = await response.data;
      setTamago(data);
      setLight(data.light);
      setTamagoType(data.type.name);
      calculateStatus(data);
    } catch (error:any) {
      if (error.response.status === 401) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("firstLogin");
        navigate("/login");
        toast.info("Vous avez été déconnecté!");
      }
      toast.error(
        "Une erreur est survenue !"
      );
      toast.clearWaitingQueue();
      if (checkIfLoggedIn()) {
        setNotFound(true);
      } else {
        navigate("/");
      }
    }
  };


  const calculatePoops = (cleanliness:number) => {
    if (cleanliness < 20) {
      setPoops(poopsArr);
    } else if (cleanliness < 40) {
      setPoops([poopsArr[1], poopsArr[2]]);
    } else if (cleanliness < 60) {
      setPoops([poopsArr[0]]);
    } else {
      setPoops([]);
    }
  };

  const calculateStatus = (tamagoData : Tamagotchi) => {
    if (tamagoData.status === Status.DEAD) {
      navigate("/dashboard");
      return;
    }
    if (tamagoData.status === Status.ASLEEP) {
      setEmotion("sleep");
      return;
    }
    calculatePoops(tamagoData.cleanliness);
    if (tamagoData.cleanliness < 30 || tamagoData.energy < 30 || tamagoData.happiness < 30 || tamagoData.satiety < 30 || tamagoData.health < 30) {
      setEmotion("unhappy");
    } else {
      setEmotion("idle");
    }
  };

  const action = (data: number, actionType: string): void => {
    if (freeMode) {
      launchAnimation(actionType);
    }
    if (actionType === "feed" && !isOpen) {
      openFoodModal();
      return;
    }
    if (!freeMode && (data === 100 || tamago.status === Status.ASLEEP)) {
      launchAnimation("no");
    } else {
      updateTamago(actionType);
    }
  };

  const launchAnimation = (tamagoEmotion:string) => {
    setDisableBtn(true);
    setEmotion(tamagoEmotion);
    runningAnimation = true;
    setTimeout(
      () => {
        setDisableBtn(false);
        setFoodIcon("lunch");
        calculateStatus(tamago);
        runningAnimation = false;
      },
      5000
    );
  };

  const eating = (feed:string) => {
    if (!freeMode && tamago.status === Status.ASLEEP) {
      setEmotion("no");
      setIsOpen(false);
      return;
    }
    updateTamago(
      "feed",
      feed
    );
    setIsOpen(false);
    action(
      tamago.satiety,
      "feed"
    );


    switch (feed) {
    case "PIZZA":
      setFoodIcon("pizza");
      break;
    case "KEBAB":
      setFoodIcon("kebab");
      break;
    case "POMME":
      setFoodIcon("apple");
      break;
    case "TACOS":
      setFoodIcon("tacos");
      break;
    case "CHOCOLAT":
      setFoodIcon("chocolate");
      break;
    case "CAFE":
      setFoodIcon("coffee");
      break;
    case "THE":
      setFoodIcon("hotDrink");
      break;
    case "EAU":
      setFoodIcon("water");
      break;
    default:
      setFoodIcon("cutlery");
      break;
    }
  };

  const turnLight = async () => {
    try {
      const response = await axios.put(
        `${APIBaseUrl}/tamagotchi/${tamago.id}`,

        {
          light: !light
        },
        {headers: {Authorization: `Bearer ${localStorage.jwt}`}}

      );
      const data = await response.data;
      setTamago(data);
      setLight(data.light);
    } catch (error) {
      toast.error(
        "Une erreur est survenue !",
        {
          toastId: toastId.current ?? ""
        }
      );
      toast.clearWaitingQueue();
    }
  };

  const activeFreeMode = () => {
    if (freeMode) {
      return;
    }
    launchCount();
    setLightClick(lightClick + 1);
  };

  const disableFreeMode = () => {
    toast.success("Le mode libre est désactivé.");
    setFreeMode(false);
  };

  const launchCount = () => {
    if (lightClick === 4) {
      toast.success("Le mode libre est activé, vous pouvez le désactiver en cliquant sur le smiley en haut à gauche.");
      setFreeMode(true);
    }
    if (lightClick > 0) {
      return;
    }
    let timesRun = 0;
    const interval = setInterval(
      () => {
        timesRun += 1;
        if (timesRun === 5) {
          clearInterval(interval);
          setLightClick(0);
        }
      },
      1000
    );
    //
  };

  const openFoodModal = () => {
    if (freeMode || tamago.satiety !== 100) {
      setIsOpen(true);
    } else {
      launchAnimation("no");
    }
  };

  useEffect(
    () => {
      getTamago();
      const interval = setInterval(
        () => {
          getTamago();
        },
        15000
      );
      return () => {
        clearInterval(interval);
      };
    },
    []
  );

  return (
    <>
      { !notFound && tamago
        ? <div className="h-full w-full flex items-center justify-center" >
          <div>
            {isOpen
              ? <FoodModal
                action={eating}
                content="Sélectionner un type de nourriture"
                setIsOpen={setIsOpen}
              />
              : null}
          </div>
          <div className=" px-2 my-10  py-6 sm:px-10 bg-alice-blue max-w-3xl mx-auto rounded-xl shadow-xl">
            <div
              className="text-end "
            >
              { freeMode
                ? <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faSmile}
                  onClick={() => disableFreeMode()}
                  size={width > 500
                    ? "2x"
                    : "1x"}
                />
                : null }
              <FontAwesomeIcon
                className="cursor-pointer mx-5"
                icon={fullScreen
                  ? faCompress
                  : faExpand}
                onClick={() => onOffFullScreen()}
                size={width > 500
                  ? "2x"
                  : "1x"}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h2>{tamago.name}</h2>
              <div className="w-12 cursor-pointer" >
                <img
                  alt="Icone d'ampoule"
                  onClick={turnLight}
                  src={light
                    ? "/assets/images/light-bulb.png"
                    : "/assets/images/light-bulb-off.png"} />
              </div>
            </div>
            <div>
              <TamagoScreen
                action={activeFreeMode}
                emotion={emotion}
                light={light}
                poops={poops}
                tamagoEmotions={tamagoEmotions}
                type={tamagoType}
              />
              <div className="flex max-w-full items-center justify-center my-5 gap-1 sm:gap-4 ">
                {statButtonProperty.map((status) => (
                  <StatButton
                    allTimeDisabled={status.allTimeDisabled}
                    disabled={disableBtn}
                    icon={status.icon}
                    key={status.icon}
                    onClick={() => action(
                      status.value,
                      status.action
                    )}
                    value={status.value}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
        : <NotFound /> }
    </>
  );
};


export default Tamago;
