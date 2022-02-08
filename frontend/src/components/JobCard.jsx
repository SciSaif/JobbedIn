import React from "react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiOfficeChair } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

// const useClickOutside = (ref, callback) => {
//   const handleClick = (e) => {
//     console.log("a");
//     if (ref.current && !ref.current.contains(e.target)) {
//       callback();
//     }
//   };
//   React.useEffect(() => {
//     document.addEventListener("click", handleClick);
//     return () => {
//       document.removeEventListener("click", handleClick);
//     };
//   });
// };

function JobCard({ title, employmentType, workplaceType, id }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dropdownContainerRef = useRef(null);

  // useClickOutside(dropdownContainerRef, () => {
  //   dropdownRef.current.classList.add("hidden");
  // });

  const toggleDropdown = (e) => {
    dropdownRef.current.classList.toggle("hidden");
  };

  const onClick = () => {
    console.log(id);
    navigate(`/job/${id}`);
  };

  return (
    <div className="border-l-2 border-secondary hover:border-accent pl-4 mt-2 mb-1 flex flex-row justify-between relative">
      <div className=" cursor-pointer " onClick={onClick}>
        <h1 className="font-bold text-xl mb-1">{title}</h1>
        <div className="flex flex-row  items-center">
          <GiOfficeChair color="cyan" />
          <p className="ml-1 mr-4">{workplaceType}</p>
          <FaBusinessTime color="#78ffd6" />
          <p className="ml-1 mr-4">{employmentType}</p>
        </div>
        <div className="flex flex-row  items-center"></div>
      </div>

      {/* Dropdown menu */}
      <div onClick={toggleDropdown} ref={dropdownContainerRef}>
        <div
          className="mx-2 mt-1 p-1  cursor-pointer hover:rounded-full hover:bg-black/50 h-fit  "
          id="dropdownInformationButton"
          data-dropdown-toggle="dropdownInformation"
          type="button"
          // onClick={toggleDropdown}
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
    </div>
  );
}

export default JobCard;
