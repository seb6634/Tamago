import React, {useState} from "react";
import {toast} from "react-toastify";

import {APIBaseUrl} from "../../../utils/APIBaseUrl";
import Button from "../../parts/Button/Button";
import {useNavigate} from "react-router-dom";
import Modal from "../../parts/Modal/Modal";
import axios from "axios";

const DeleteAccount = () => {
  const [errors, setErrors] = useState("");
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  const navigate = useNavigate();

  const deleteAccount = () => {
    axios.delete(
      `${APIBaseUrl}/user/`,
      {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
    ).then((response) => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("firstLogin");
      navigate("/");
      toast.success("Votre compte a été supprimé");
    })
      .catch((err) => {
        setErrors("Une erreur est survenue");
      });
  };

  return (

    <div>
      {displayDeleteModal
        ? <Modal
          action={() => deleteAccount()}
          confirmTerm="Confirmer"
          content="Êtes vous certain de vouloir supprimer votre compte?"
          setIsOpen={setDisplayDeleteModal}
          // eslint-disable-next-line react/jsx-closing-bracket-location
        />
        : null}
      {errors !== "" && <p className="text-red text-center">{errors}</p>}
      <div className="mt-4 mb-2 text-center">
        <Button
          action={() => {
            setDisplayDeleteModal(true);
          }}
          color="btn-red"
          text="Supprimer mon compte"
        />
      </div>
    </div>
  );
};

export default DeleteAccount;
