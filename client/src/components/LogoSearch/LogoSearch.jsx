import React from "react";
import Logo from "../../img/logo.png";
import './LogoSearch.css';

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" className="logoImage" />
      <div className="Webname">
        <h2>SpaceBook</h2>
      </div>
    </div>
  );
};

export default LogoSearch;
