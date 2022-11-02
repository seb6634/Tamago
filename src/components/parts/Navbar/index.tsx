/* eslint-disable no-negated-condition */
import "./navbar.css";

import React, {useEffect, useState} from "react";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ItemMenu from "./ItemMenu";
import LogoutButton from "./LogoutButton";
import {useLocation} from "react-router-dom";

interface navProps {
  offFullScreenOnLocationChange: Function,
  fullScreen: boolean,
}

const Navbar = ({fullScreen, offFullScreenOnLocationChange}:navProps) => {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const itemsMenu = [
    {
      displayIfNotconnected: true,
      link: "/",
      name: "Accueil"
    },
    {
      displayIfNotconnected: false,
      link: "/account",
      name: "Mon compte"
    },
    {
      displayIfNotconnected: false,
      link: "/dashboard",
      name: "Dashboard"
    },
    {
      displayIfNotconnected: true,
      link: "/contact-form",
      name: "Nous contacter"
    }
  ];

  useEffect(
    () => {
      setIsNavOpen(false);
      offFullScreenOnLocationChange();
    },
    [location]
  );

  return (
    <>
      {!fullScreen
        ? (
          <nav className="border-b border-blue-light p-8 bg-white">
            <section className="flex justify-between lg:hidden">
              <div onClick={() => setIsNavOpen(true)}>
                <FontAwesomeIcon
                  icon={faBars}
                  size="lg"
                />
              </div>
              <span className="uppercase">{itemsMenu.find((item) => item.link === window.location.pathname)?.name}</span>
              {isNavOpen
                ? (
                  <div className="bg-white absolute top-0 w-full z-20 border-b border-blue-light flex justify-between -ml-8 p-8">
                    <div onClick={() => setIsNavOpen(false)}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        size="lg"
                      />

                    </div>
                    {/*  Mobile */}
                    <ul className="flex flex-col items-center
                justify-between space-y-4"
                    >
                      {itemsMenu.map((item) => (
                        <ItemMenu
                          display={item.displayIfNotconnected}
                          handleClick={() => setIsNavOpen(false)}
                          key={item.name}
                          link={item.link}
                          title={item.name}
                        />
                      ))}
                    </ul>
                    <div>
                      <LogoutButton />
                    </div>
                  </div>
                )
                : null}
              <div>
                <LogoutButton />
              </div>
            </section>
            {/*  Desktop */}
            <ul className="hidden lg:flex space-x-8 justify-center items-center">
              {itemsMenu.map((item) => (
                <ItemMenu
                  display={item.displayIfNotconnected}
                  handleClick={() => setIsNavOpen(false)}
                  key={item.name}
                  link={item.link}
                  title={item.name}
                />
              ))}
              <li className="">
                <LogoutButton />
              </li>
            </ul>
          </nav>
        )
        : null}
    </>
  );
};


export default Navbar;
