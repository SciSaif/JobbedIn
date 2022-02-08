import React from "react";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { reset, getJobs } from "../features/jobs/jobsSlice";
import { useSelector, useDispatch } from "react-redux";
import JobCard from "../components/JobCard";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import profileImg from "../components/assets/profileImg.png";

function EmployerDashboard() {
  const [inputMessage, setInputMessage] = useState("");
  const { employer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { name, email, mobileNumber, companyName, address, description } =
    employer;

  const { jobs, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
    }

    dispatch(reset());
  }, [isError, isSuccess, employer, message, dispatch, isLoading]);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <div className="stripes max-w-screen min-h-screen shadow-lg text-white flex flex-col md:flex-row  ">
      <div className="w-full min-h-[200px] rounded-t-3xl border-t-2 border-white mt-[100px] relative bg-black/25 pt-[60px] px-3">
        <div className="w-[100px] h-[100px] border-white border-2 rounded-full absolute top-[-50px] left-1/2 translate-x-[-50px] z-7 ">
          <img src={profileImg} alt="profile"></img>
        </div>
        <div className="mx-auto text-center font-bold mb-4 text-xl">{name}</div>
        <div>
          <p>
            <span className="font-bold">Email:</span> {email}
          </p>
          <p>
            <span className="font-bold">Mobile number:</span> {mobileNumber}
          </p>
        </div>
        <div className="  mt-4  max-w-[700px] px-3 text-white bg-white/25 rounded-3xl flex flex-row">
          <div className="  pr-2 mr-2 mt-2  flex flex-col  ">
            <BsBuilding size="30px" color="white" />
          </div>
          <div className="py-3">
            <h1 className="font-bold text">Company</h1>
            <h1 className="font-bold text-2xl text-secondary">{companyName}</h1>
            <h1 className=" text-4 mt-2 italic">
              <span className="font-bold not-italic">Address:</span> {address}
            </h1>
            <h1 className=" text-4 mt-2">
              <p>{description}</p>
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-2 pb-5">
        <div className="mt-12 pb-2  flex flex-row items-center justify-between  box-1 border-b-2 border-accent">
          <div className="flex flex-row items-center">
            <BsFillBriefcaseFill size="30px" color="white" />
            <p className="font-bold text-lg ml-5">Your Jobs</p>
          </div>
          <Link
            to="/add-job"
            className="text-accent flex flex-row items-center"
          >
            Post a new Job
            <MdOutlineNavigateNext size="25px" />
          </Link>
        </div>

        {inputMessage ? (
          <div className="text-white bg-accent w-full  p-2">
            Sorry Could not fetch jobs{" "}
          </div>
        ) : null}

        {isLoading ? (
          <div className="text-white bg-primary w-full  p-2">
            ...Loading jobs{" "}
          </div>
        ) : null}

        {jobs &&
          jobs.map((job) => (
            <JobCard
              key={job._id}
              title={job.title}
              employmentType={job.employmentType}
              workplaceType={job.workplaceType}
              id={job._id}
            />
          ))}
      </div>
    </div>
  );
}

export default EmployerDashboard;
