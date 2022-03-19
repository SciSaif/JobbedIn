import React from "react";

import companyLogo from "../assets/companyLogo.png";

function Experience({ company }) {
  return (
    <div className="flex flex-row">
      <div className="w-[50px] h-[50px]">
        <img src={companyLogo} alt="profilepic" />
      </div>
      <div className="ml-3">
        <h3 className=" font-semibold text-xl">{company.name}</h3>
        <p>1 yr 4 mos</p>
        <p>{company.address}</p>
      </div>
    </div>
  );
}

export default Experience;
