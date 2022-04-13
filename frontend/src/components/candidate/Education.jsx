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
            <p className="timeline-address text-sm">{school.address}</p>
            {school.field.length === 1 && (
              <>
                <div className="font-bold">
                  {school.field[0].title}
                  {/* Bachelor Of Technology - B.Tech */}
                </div>
                <p className="mt-0">
                  {" "}
                  {school.field[0].startDate} - {school.field[0].endDate}
                </p>
              </>
            )}
          </div>
        </div>

        {school?.field?.length !== 1 &&
          school.field?.map((f) => (
            <div className="timeline-section" key={f.title}>
              <div className="font-bold">{f.title} </div>
              <p className="timeline-address text-sm">
                {f.startDate} - {f.endDate}
              </p>
            </div>
          ))}
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
