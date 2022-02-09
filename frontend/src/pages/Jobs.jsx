import React from "react";
import { useEffect, useState } from "react";
import { GiOfficeChair } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import { HiCurrencyRupee } from "react-icons/hi";
import { HiExternalLink } from "react-icons/hi";
import { reset, getAllJobs } from "../features/jobs/jobsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import JobCard from "../components/JobCard";

function Jobs() {
  const [inputMessage, setInputMessage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const { jobs, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.jobs
  );

  //   useEffect(() => {
  //     if (isError) {
  //       setInputMessage(message);
  //     }

  //     dispatch(reset());
  //   }, [isError, isSuccess, jobs, message, isLoading]);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center align-bottom text-white min-w-screen min-h-screen shadow-lg">
      <main className=" sprinkles flex flex-col sprinkle w-full h-screen overflow-hidden text-black flex flex-row items-center">
        <section className="w-full md:w-1/2 lg:w-1/3 bg-secondaryL">
          <div className="w-full p-3 font-bold text-4xl shadow-lg mb-5 bg-primary text-white">
            All Jobs
          </div>
          {jobs &&
            jobs.map((job) => {
              return (
                <JobCard
                  key={job._id}
                  title={job.title}
                  employmentType={job.employmentType}
                  workplaceType={job.workplaceType}
                  id={job._id}
                  isEmployer={false}
                />
              );
            })}
        </section>
      </main>
    </div>
  );
}

export default Jobs;
