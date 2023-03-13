import React, { useState } from "react";
import { MdClose, MdDehaze } from "react-icons/md";
import { Link } from "react-router-dom";
import { menuItems } from "../../config";
import Logo from "../logo/logo.component";
import "./navbar.styles.css";

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
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
        {menuItems.length > 0 &&
          menuItems.map((menu, idx) => {
            return (
              <li key={idx}>
                <Link to={menu.path} className="nav-link">
                  {menu.IconFun()}
                  {menu.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Navbar;
