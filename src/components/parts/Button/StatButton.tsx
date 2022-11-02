import "react-circular-progressbar/dist/styles.css";

import {CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar";
import React from "react";

interface StatButtonProps {
  allTimeDisabled?: boolean,
    onClick: Function,
    value: number,
    backgroundColor?:string,
    disabled?: boolean,
    icon?: string,
  }


const StatButton = ({allTimeDisabled = false, onClick, value, backgroundColor = "white", icon, disabled}:StatButtonProps) => {
  let customIcon = "";
  switch (icon) {
  case "shower":
    customIcon = "shower";
    break;
  case "medical":
    customIcon = "medicine";
    break;
  case "play":
    customIcon = "play";
    break;
  case "energy":
    customIcon = "battery";
    break;
  case "lunch":
    customIcon = "cutlery";
    break;
  case "pizza":
    customIcon = "pizza";
    break;
  case "tacos":
    customIcon = "taco";
    break;
  case "apple":
    customIcon = "apple";
    break;
  case "chocolate":
    customIcon = "chocolate";
    break;
  case "coffee":
    customIcon = "coffee";
    break;
  case "water":
    customIcon = "water";
    break;
  default:
    customIcon = "cutlery";
    break;
  }

  const checkValueForPathColor = () => {
    if (value < 25) {
      return "red";
    }
    if (value < 40) {
      return "orange";
    }
    return "green";
  };

  return (
    <>
      <div
        className={` sm:w-16 md:w-24 ${disabled
          ? "opacity-60"
          : "cursor-pointer"}
          ${allTimeDisabled
      ? "cursor-not-allowed"
      : ""} `}
        onClick={() => !allTimeDisabled && !disabled && onClick()}
      >
        <CircularProgressbarWithChildren
          background
          styles={buildStyles({
            backgroundColor: backgroundColor,
            pathColor: checkValueForPathColor()
          })}
          value={value}
        >
          <img
            alt="Icone"
            className="w-2/5"
            src={`/assets/icons/${customIcon}.png`}
          />
        </CircularProgressbarWithChildren>
      </div>
    </>
  );
};


export default StatButton;
