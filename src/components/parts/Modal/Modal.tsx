
import "./modal.css";

import React from "react";
import Button from "../Button/Button";

interface ModalProps {
  action: Function,
  confirmTerm?:string
  setIsOpen: Function,
  content: string
}

const Modal = ({action, confirmTerm = "Valider", setIsOpen, content}:ModalProps) => {
  const validate = () => {
    action();
  };

  return (
    <>
      <div
        className="darkBG"
        onClick={() => setIsOpen(false)}
      />
      <div className="centered">
        <div className="modal w-80 h-40">
          <div className="modalContent "><span className="text-base">{content} </span></div>
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

export default Modal;
