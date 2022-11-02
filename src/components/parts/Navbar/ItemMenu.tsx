import {NavLink} from "react-router-dom";
import React from "react";
import {checkIfLoggedIn} from "../../../utils";
interface ItemMenuProps {
  display:boolean
  title:string,
  link:string,
  handleClick:Function
}

const ItemMenu = ({display, title, link, handleClick}:ItemMenuProps) => (
  <>
    { display || checkIfLoggedIn()
      ? <li
        className="uppercase"
        onClick={() => handleClick()}
      >
        <NavLink
          className="block"
          end
          to={link}
        >{title}</NavLink>
      </li>
      : null}
  </>
);


export default ItemMenu;
