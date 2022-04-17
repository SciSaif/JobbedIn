import React from "react";
import { useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import schoolLogo from "../assets/school.png";

export function Education({ school, editMode, editEducation }) {
  return (
    <div className="flex flex-row justify-between text-textBlack">
      <div className="flex flex-col">
        <div className="flex flex-row mb-4">
          <div className=" w-[50px] h-[50px]">
            <img src={schoolLogo} alt="school Logo" />
          </div>
          <div className="ml-3">
            <h3 className=" font-bold ">{school.name}</h3>
            <div className="font-semibold text-sm">
              {school.fieldOfStudy} · {school.degree}
            </div>
            <div className="mt-0">
              {" "}
              {school.startDate.month.substring(0, 3)} {school.startDate.year} -{" "}
              {school.endDate.present
                ? "Present"
                : school.endDate.month.substring(0, 3) +
                  " " +
                  school.endDate.year}
            </div>
          </div>
        </div>
      </div>

      {editMode && (
        <div onClick={() => editEducation(school)} className="cursor-pointer">
          <BiEditAlt size="25px" />
        </div>
      )}
    </div>
  );
}

export default Education;
