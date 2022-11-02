/* eslint-disable no-negated-condition */
import "./footer.css";

import {Link} from "react-router-dom";
import React from "react";

interface FooterProps {
    fullScreen: boolean,
  }

const Footer = ({fullScreen}:FooterProps) => (
  <>
    {!fullScreen
      ? (
        <footer className="py-8">
          <nav>
            <ul className="flex justify-center text-center space-x-8 ">
              <li> <Link to="/terms-and-condition">Mentions légales</Link></li>
              <li> <Link to="/terms-and-condition">CGU</Link></li>
              <li> <Link to="/contact-form">Nous contacter</Link></li>
            </ul>
          </nav>
        </footer>
      )
      : null}
  </>
);


export default Footer;
