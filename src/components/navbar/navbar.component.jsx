import React, { useState } from "react";
import { MdClose, MdDehaze } from "react-icons/md";
import { Link } from "react-router-dom";
import { navItems } from "../../config";
import Logo from "../logo/logo.component";
import "./navbar.styles.css";

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const handleToggle = () => {
    if (isToggle) setIsToggle(false);
  };
  return (
    <nav className="navbar card-container">
      <Link to={"/"}>
        <div className="logo_container">
          <Logo />
        </div>
      </Link>
      <div className="navbar__mobile pointer">
        <i
          className={isToggle ? "fas fa-times" : "fas fa-bars"}
          onClick={() => setIsToggle(!isToggle)}
        ></i>
        <span onClick={() => setIsToggle(!isToggle)}>
          {isToggle ? <MdClose size={25} /> : <MdDehaze size={25} />}
        </span>
      </div>
      <ul
        className={`font-general-montserrat ${
          isToggle ? "navbar__menu active" : "navbar__menu"
        }`}
      >
        <li>
          <Link
            to={navItems.HOME.path}
            className="nav-link"
            onClick={handleToggle}
          >
            {navItems.HOME.IconFun()}
            {navItems.HOME.name}
          </Link>
        </li>
        <li>
          <Link
            to={navItems.USERS.path}
            className="nav-link"
            onClick={handleToggle}
          >
            {navItems.USERS.IconFun()}
            {navItems.USERS.name}
          </Link>
        </li>
        <li>
          <Link
            to={navItems.GAMES.path}
            className="nav-link"
            onClick={handleToggle}
          >
            {navItems.GAMES.IconFun()}
            {navItems.GAMES.name}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
