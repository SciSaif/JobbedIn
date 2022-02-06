import React from "react";
import { useRef, useEffect } from "react";
import { GiOfficeChair } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

function JobCard({ title, employmentType, workplaceType }) {
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    dropdownRef.current.classList.toggle("hidden");
  };

  return (
    <div className="border-l-2 border-secondary pl-4 mt-2 mb-1 flex flex-row justify-between relative">
      <div className=" cursor-pointer ">
        <h1 className="font-bold text-xl mb-1">{title}</h1>
        <div className="flex flex-row  items-center">
          <GiOfficeChair />
          <p className="ml-1 mr-4">{workplaceType}</p>
          <FaBusinessTime />
          <p className="ml-1 mr-4">{employmentType}</p>
        </div>
        <div className="flex flex-row  items-center"></div>
      </div>

      {/* Dropdown menu */}
      <div
        className="mx-2 mt-1 p-1  cursor-pointer hover:rounded-full hover:bg-black/50 h-fit  "
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
        type="button"
        onClick={toggleDropdown}
      >
        <BsThreeDotsVertical />
      </div>
      <div
        className="hidden w-[100px] bg-black/50 text-[#DCEBFF] rounded-xl  absolute right-8 top-1 flex flex-col  p-1  select-none"
        ref={dropdownRef}
      >
        <button className="px-3 py-1 hover:bg-black/25 rounded-t-xl border-b-2 border-black/25">
          Delete
        </button>
        <button className="px-3 py-1 hover:bg-black/25 rounded-b-xl">
          Edit
        </button>
      </div>
    </div>
  );
}

export default JobCard;
