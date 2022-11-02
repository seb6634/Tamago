import "./tamagoScreen.css";
import React from "react";
import {TamagoScreenType} from "../../../types";


const TamagoScreen = ({emotion, light = true, tamagoEmotions, type, poops, action}: TamagoScreenType) => (
  <div
    className={`tamago-screen tamago-screen-${light
      ? "light"
      : "dark"} mx-auto  `}
    onClick={action}>
    <div
      id="tamago"
      style={{
        backgroundImage: `url("/assets/images/tamago/${type}.png")`,
        backgroundPositionY: `${-192 * tamagoEmotions.indexOf(emotion)}px`
      }}
    />
    {poops.length
      ? poops.map((poop) => (
        <div
          className="poop-element"
          key={`poop${poop.locationX}${poop.locationY}`}
          style={{
            bottom: `${poop.locationX}%`,
            left: `${poop.locationY}%`
          }}
        >
          <img
            alt="poop"
            src="/assets/images/tamago/poop.png"
          />
        </div>
      ))
      : null}
  </div>
);


export default TamagoScreen;
