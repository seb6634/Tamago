import {useEffect, useState} from "react";

const getWindowDimensions = () => {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    height,
    width
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(
    () => {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener(
        "resize",
        handleResize
      );
      return () => window.removeEventListener(
        "resize",
        handleResize
      );
    },
    []
  );
  return windowDimensions;
};

const checkIfLoggedIn = () => {
  const isLoggedIn = Boolean(localStorage.getItem("jwt"));
  return isLoggedIn;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString().slice(
    0,
    10
  );
};

export const calculateAge = (birthdateString: string, endDateString: string) => {
  const birthdate = new Date(birthdateString);
  const endDate = new Date(endDateString);
  const datediff = endDate.getTime() - birthdate.getTime();
  return datediff / (24 * 60 * 60 * 1000);
};

export {checkIfLoggedIn, useWindowDimensions};
