import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

function EmployerDashboard() {
  const { employer, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const { name, email, mobileNumber, companyName, address, description } =
    employer;

  return (
    <div className="bg-[#c5f5f5] dashboard min-w-screen min-h-screen shadow-lg text-white flex flex-col ">
      <div className=" card mt-10 mx-3 max-w-[700px] px-3  shadow-xl rounded-3xl flex flex-row">
        <div className="border-r-2  pr-2 mr-2 border-accent box-2 flex flex-col items-center justify-center">
          <FaRegUserCircle size="60px" color="white" />
        </div>
        <div className="py-3">
          <h1 className="font-bold text-lg">Employer Dashboard</h1>
          <h1 className="font-bold text-4xl">{name}</h1>
          <h1 className=" text-4 mt-2">
            <span className="font-bold">Email:</span> {email}
          </h1>
          <h1 className=" text-4 mt-2">
            <span className="font-bold">Mobile number:</span> {mobileNumber}
          </h1>
        </div>
      </div>
      <div className=" card mt-4 mx-3 max-w-[700px] px-3  shadow-xl rounded-3xl flex flex-row">
        <div className="border-r-2  pr-2 mr-2 border-secondary box-2 flex flex-col items-center justify-center">
          <BsBuilding size="60px" color="white" />
        </div>
        <div className="py-3">
          <h1 className="font-bold text-lg">Company</h1>
          <h1 className="font-bold text-4xl">{companyName}</h1>
          <h1 className=" text-4 mt-2 italic">
            <span className="font-bold not-italic">Address:</span> {address}
          </h1>
          <h1 className=" text-4 mt-2">
            <p>{description}</p>
          </h1>
        </div>
      </div>
      <div className=" card mt-4 mx-3 max-w-[700px]   shadow-xl rounded-3xl flex flex-col">
        <div className="mt-4 flex flex-col items-center justify-center  box-1 border-b-2 border-accent">
          <BsFillBriefcaseFill size="60px" color="white" />
          <p className="font-bold text-lg">Your Jobs</p>
        </div>
        <div className="py-3 px-2">
          <h1 className="font-bold text-lg">Company</h1>
          <h1 className="font-bold text-4xl">Sci Tech Enterprises</h1>
          <h1 className=" text-4 mt-2 italic">
            <span className="font-bold not-italic">Address:</span> Zakir Nager,
            New Delhi -110025
          </h1>
          <h1 className=" text-4 mt-2">
            <p>
              A company devoted to serving the community and stuff like that, i
              just need to put something here. So great place actually{" "}
            </p>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;
