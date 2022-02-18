import React from "react";
import { useEffect, useState } from "react";
import { BsBuilding } from "react-icons/bs";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { reset, getJobs } from "../features/jobs/jobsSlice";
import {
  reset as resetEmployer,
  emptyEmployer,
  getEmployerById,
} from "../features/employer/employerSlice";
import { useSelector, useDispatch } from "react-redux";
import JobCard from "../components/JobCard";
import { Link, useParams } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import profileImg from "../components/assets/profileImg.png";

function Employer() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isEmployer, setisEmployer] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const { employer: loggedInEmployer } = useSelector((state) => state.auth);
  const {
    employer,
    isSuccess: isSuccessEmployer,
    isError: isErrorEmployer,
  } = useSelector((state) => state.employer);
  const { name, email, mobileNumber, companyName, address, description } =
    employer;

  const { jobs, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(reset());
    }

    if (isSuccess) {
      dispatch(reset());
    }

    if (isErrorEmployer) {
      setInputMessage(message);
      dispatch(resetEmployer());
    }

    if (isSuccessEmployer) {
      dispatch(resetEmployer());
    }
  }, [isSuccess, isError, isSuccessEmployer, isErrorEmployer]);

  useEffect(() => {
    dispatch(getEmployerById(id));
    dispatch(getJobs(id));
    if (loggedInEmployer && loggedInEmployer._id === id) {
      setisEmployer(true);
    }

    return () => {
      setisEmployer(false);
      dispatch(resetEmployer());
      dispatch(emptyEmployer());
    };
  }, [setisEmployer, dispatch, resetEmployer]);

  return (
    <div className="stripes max-w-screen  min-h-screen shadow-lg text-white flex flex-col md:flex-row  ">
      <div className="w-full md:w-1/2 min-h-[200px] rounded-t-3xl border-t-2 border-white mt-[100px] relative bg-black/25 pt-[60px] px-3">
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

      <div className="mx-2 pb-5 md:w-1/2 md:mt-12 md:ml-3">
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
        ) : (
          <>
            {jobs.length === 0 && (
              <div className="m-2 p-4 bg-secondary text-black font-bold rounded">
                Its Empty :(
              </div>
            )}
          </>
        )}

        {jobs &&
          jobs.map((job) => (
            <JobCard
              key={job._id}
              title={job.title}
              employmentType={job.employmentType}
              workplaceType={job.workplaceType}
              id={job._id}
              isEmployer={isEmployer}
            />
          ))}
      </div>
    </div>
  );
}

export default Employer;
