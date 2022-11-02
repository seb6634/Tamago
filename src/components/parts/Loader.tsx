import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const Loader = () => (
  <FontAwesomeIcon
    className="text-red mr-4 font-bold fa-spin"
    icon={faSpinner}
    size="3x"
  />
);

export default Loader;
