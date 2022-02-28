import React from "react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiOfficeChair } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { reset, deleteJob, getJobs } from "../features/jobs/jobsSlice";
import logo from "../components/assets/amazonLogo.jfif";

function CompanyCard({ name, industry, address, id, isEmployer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dropdownContainerRef = useRef(null);

  const toggleDropdown = (e) => {
    dropdownRef.current.classList.toggle("hidden");
  };

  const onClick = () => {
    navigate(`/company/${id}`);
  };

  const onDelete = () => {
    dispatch(deleteJob(id));
  };
  const onEdit = () => {
    navigate(`/edit-job/${id}`);
  };

  return (
    <div
      className="border-l-2 border-secondaryD hover:border-accent border-b-2 border-b-black/75 pl-4 p-2   flex flex-row items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="min-w-[50px] ">
        <img src={logo} alt="logo" className="w-[50px]" />
      </div>
      <div className="text-black text-lg font-bold ml-3 ">
        {name}
        <p className="text-black/75  text-sm">
          {industry} | {address}
        </p>
      </div>
    </div>
  );
}

export default CompanyCard;
