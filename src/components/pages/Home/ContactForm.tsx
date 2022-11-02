import React, {useState} from "react";
import Button from "../../parts/Button/Button";
import Input from "../../parts/Form/Input";
import PageTitle from "../../parts/layout/PageTitle";
import Textarea from "../../parts/Form/TextArea";
import axios from "axios";
import {APIUrl} from "../../../utils/APIBaseUrl";
import {toast} from "react-toastify";

const Form = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    firstname: "",
    lastname: "",
    message: ""
  });

  /**
   * Send request to API to send message
   * @param evt SubmitEvent
   */
  const sendContactMail = (evt:SubmitEvent) => {
    evt.preventDefault();
    if (checkForm()) {
      axios.post(
        `${APIUrl}contact/`,
        {
          email: email,
          firstname: firstname,
          lastname: lastname,
          message: message,
          subject: ""
        },
        {headers: {Authorization: `Bearer ${localStorage.jwt}`}}
      ).then((response) => {
        toast.success("Email bien envoyé !");
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
    }
  };

  /**
   * Check all fields and set errors if needed
   * @returns bool
   */
  const checkForm = () => {
    const checkLastname = () => {
      if (lastname.length < 3) {
        setErrors((prevState) => ({
          ...prevState,
          lastname: "Le prénom doit faire au moins 3 caractères"
        }));
        return false;
      }
      setErrors((prevState) => ({
        ...prevState,
        lastname: ""
      }));
      return true;
    };

    const checkFirstname = () => {
      if (firstname.length < 3) {
        setErrors((prevState) => ({
          ...prevState,
          firstname: "Le prénom doit faire au moins 3 caractères"
        }));
        return false;
      }
      setErrors((prevState) => ({
        ...prevState,
        firstname: ""
      }));
      return true;
    };

    const checkEmail = () => {
      if (email.match("^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$")) {
        setErrors((prevState) => ({
          ...prevState,
          email: ""
        }));
        return true;
      }
      setErrors((prevState) => ({
        ...prevState,
        email: "Votre email est invalide"
      }));
      return false;
    };

    const checkMessage = () => {
      if (message.length < 10 || message.length > 500) {
        setErrors((prevState) => ({
          ...prevState,
          message: "Le message doit faire entre 10 et 500 caractères caractères"
        }));
        return false;
      }
      setErrors((prevState) => ({
        ...prevState,
        message: ""
      }));
      return true;
    };

    checkLastname();
    checkFirstname();
    checkEmail();
    checkMessage();
    return checkLastname() && checkFirstname() && checkEmail() && checkMessage();
  };

  return (
    <div className="py-20">
      <form
        className="w-11/12 max-w-xl mt-12 m-auto bg-white py-6 px-4 sm:px-7 rounded-xl shadow-xl relative"
        id="contactForm"
      >
        <img
          alt="Corgi"
          className="absolute corgi-contact-form"
          src="/assets/images/corgi.png"
        />
        <div className="text-center mb-2 text-marine-dark">
          <PageTitle title="Contact" />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <Input
            error={errors.lastname}
            id="lastname"
            label="Nom"
            updateValue={setLastname}
            value={lastname}
          />
          <Input
            error={errors.firstname}
            id="firstname"
            label="Prénom"
            updateValue={setFirstname}
            value={firstname}
          />
        </div>
        <Input
          error={errors.email}
          id="email"
          label="Email"
          type="email"
          updateValue={setEmail}
          value={email}
        />
        <Textarea
          error={errors.message}
          id="message"
          label="Message"
          updateValue={setMessage}
          value={message}
        />
        <div className="text-center mt-6">
          <Button
            action={sendContactMail}
            color="btn-blue"
            text="Envoyer"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
