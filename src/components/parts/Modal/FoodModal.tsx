
import "./modal.css";

import React, {useEffect, useState} from "react";
import {Food} from "../../../types";
import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import axios from "axios";
import Button from "../Button/Button";
import {toast} from "react-toastify";

interface FoodModalProps {
  action: Function,
  confirmTerm?:string
  setIsOpen: Function,
  content: string
}

const FoodModal = ({action, confirmTerm = "Valider", setIsOpen, content}:FoodModalProps) => {
  const [food, setFood] = useState([] as Food[]);
  const [currentFood, setCurrentFood] = useState("PIZZA");
  const toastId = React.useRef(null);

  const fetchFood = async () => {
    try {
      const response = await axios.get(
        `${APIBaseUrl}/food/`,
        {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
      );
      const data = await response.data;
      setFood(data);
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
  useEffect(
    () => {
      fetchFood();
    },
    []
  );

  const handleChange = (event:any) => {
    setCurrentFood(event.target.value);
  };

  const normalizeString = (string:string) => string.toUpperCase().normalize("NFD")
    .replace(
      // eslint-disable-next-line require-unicode-regexp
      /[\u0300-\u036f]/g,
      ""
    );

  const validate = () => {
    action(normalizeString(currentFood));
  };


  return (
    <>
      <div
        className="darkBG"
        onClick={() => setIsOpen(false)}
      />
      <div className="centered">
        <div className="modal w-80 h-64">
          <div className="modalContent">
            <label className="block my-5">{content}</label>
            <select
              aria-label="Default select example"
              className="form-select appearance-none
              block
              w-full
              px-3
              py-1.5
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              onChange={handleChange}
              value={currentFood}
            >
              { food
                ? food.map((feed:Food) => <option key={feed.id}>{feed.name}</option>)
                : null}
            </select>
          </div>
          <div className="modalActions">
            <div
              className="actionsContainer"
            >
              <Button
                action={validate}
                color="btn-blue btn-sm"
                text={confirmTerm}
              />
              <Button
                action={() => setIsOpen(false)}
                color="btn-orange btn-sm"
                text="Annuler"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodModal;
