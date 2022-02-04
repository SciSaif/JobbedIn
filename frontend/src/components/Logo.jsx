import React from "react";
import logo from "./assets/logo2.png";

function Logo({ width }) {
  return (
    <img src={logo} alt="logo" className="text-center mx-auto" width={width} />
  );
}

export default Logo;
