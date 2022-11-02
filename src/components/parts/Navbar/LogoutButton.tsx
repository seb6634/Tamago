import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, {useState} from "react";
import {checkIfLoggedIn} from "../../../utils";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import Modal from "../Modal/Modal";
import axios from "axios";
import {APIBaseUrl} from "../../../utils/APIBaseUrl";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const login = () => {
    navigate("/login");
  };


  const logout = () => {
    axios.post(
      `${APIBaseUrl}/logout`,
      {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
    ).then((res) => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("sayHelloFirstConnection");
      setIsOpen(false);
      checkIfLoggedIn();
      navigate("/login");
      toast.info("Vous êtes maintenant déconnecté !");
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


  return (
    <span className="my-2">
      {isOpen
        ? <Modal
          action={() => logout()}
          confirmTerm="Confirmer"
          content="Voulez vous vraiment vous deconnecter ?"
          setIsOpen={setIsOpen}
        />
        : null}
      <button
        onClick={() => {
          checkIfLoggedIn()
            ? setIsOpen(true)
            : login();
        }}
      >{checkIfLoggedIn()
          ? <span className="text-green">
            <FontAwesomeIcon
              icon={faPowerOff}
              size="xl"
            />
          </span>
          : <span className="text-red">
            <FontAwesomeIcon
              icon={faPowerOff}
              size="xl"
            />
          </span>}
      </button>
    </span>
  );
};


export default LogoutButton;
