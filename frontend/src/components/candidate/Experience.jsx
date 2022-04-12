import React from "react";
import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";

import companyLogo from "../assets/companyLogo.png";

function Experience({ company, editMode, editExperience }) {
  return (
    <div className="flex flex-row justify-between py-3 border-b text-textBlack  border-black/40 forLastChild">
      <div className="flex flex-row">
        <div className="w-[50px] h-[50px]">
          <img src={companyLogo} alt="profilepic" />
        </div>
        <div className="ml-3">
          <h3 className=" font-bold">{company.name}</h3>
          <p className="text-sm">
            {company.startDate.month.substring(0, 3)} {company.startDate.year} -{" "}
            {company.endDate.present
              ? "present"
              : company.endDate.month.substring(0, 3) +
                " " +
                company.endDate.year}
          </p>
          <p className="text-sm">{company.address}</p>
        </div>
      </div>
      {editMode && (
        <div onClick={() => editExperience(company)}>
          <BiEditAlt size="25px" />
        </div>
      )}
    </div>
  );
}

export default Experience;
