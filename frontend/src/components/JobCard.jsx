import React from "react";
import { GiOfficeChair } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";

function JobCard({ title, employmentType, workplaceType }) {
  return (
    <div className="border-l-2 border-secondary pl-4 mt-2 mb-1 cursor-pointer">
      <div>
        <h1 className="font-bold text-xl">{title}</h1>
        <div className="flex flex-row  items-center">
          <GiOfficeChair />
          <p className="ml-1 mr-4">{workplaceType}</p>
          <FaBusinessTime />
          <p className="ml-1 mr-4">{employmentType}</p>
        </div>
        <div className="flex flex-row  items-center"></div>
      </div>
    </div>
  );
}

export default JobCard;
