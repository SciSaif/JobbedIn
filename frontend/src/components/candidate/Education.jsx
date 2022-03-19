import React from "react";
import { useEffect } from "react";
import schoolLogo from "../assets/school.png";

export function Education({ school }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mb-4">
        <div className=" w-[50px] h-[50px]">
          <img src={schoolLogo} alt="school Logo" />
        </div>
        <div className="ml-3">
          <h3 className=" font-semibold text-xl">{school.name}</h3>
          <p className="timeline-address">{school.address}</p>
          {school.field.length === 1 && (
            <>
              <div className="font-semibold text-lg">
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
          <div className="timeline-section">
            <div className="font-semibold text-lg ">{f.title} </div>
            <p className="timeline-address">
              {f.startDate} - {f.endDate}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Education;
