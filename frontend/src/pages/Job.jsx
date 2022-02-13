import React from "react";
import { useEffect, useState } from "react";
import { GiOfficeChair } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import { HiCurrencyRupee } from "react-icons/hi";
import { HiExternalLink } from "react-icons/hi";
import { reset, getJob, resetJob } from "../features/jobs/jobsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Job() {
  const [inputMessage, setInputMessage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const { job, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.jobs
  );

  const {
    employer,
    title,
    employmentType,
    workplaceType,
    location,
    status,
    payRange,
    applicants,
    description,
  } = job;
  let companyName, address;

  if (employer) {
    companyName = employer.companyName;
    address = employer.address;
  }

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      console.log("reset in job");
      dispatch(reset());
    }

    if (isSuccess) {
      console.log("reset in job");
      dispatch(reset());
    }
  }, [dispatch, isError, isSuccess, message, isLoading]);

  useEffect(() => {
    dispatch(getJob(id));

    return () => {
      dispatch(resetJob());
    };
  }, []);

  if (job.length === 0 || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center align-bottom text-white min-w-screen min-h-screen shadow-lg">
      <main className=" sprinkles flex flex-col sprinkle w-full h-screen overflow-hidden text-textBlack">
        <section className="block mx-3 bg-secondaryL rounded-3xl my-3 mt-8 p-4">
          <div className="font-bold text-2xl">{title}</div>
          <div className="text-black/75 mt-2">
            {companyName ? companyName : ""} | {(address ? address : "") + " "}{" "}
            ({workplaceType}){"   "}
            <span className="text-black/25">
              {" "}
              2 days ago | {applicants} applicants
            </span>
          </div>

          <div className="text-black/75 mt-2">
            <div className="flex flex-row  items-center ">
              <FaBusinessTime /> <p className="ml-2">{employmentType}</p>
            </div>
            <div className="flex flex-row  items-center mt-1 ">
              <GiOfficeChair /> <p className="ml-2">{workplaceType}</p>
            </div>
            {location ? (
              <>
                <div className="flex flex-row  items-center mt-1 ">
                  <MdLocationOn /> <p className="ml-2">{location}</p>
                </div>
              </>
            ) : null}

            <div className="flex flex-row  items-center mt-1 ">
              <FcOk />{" "}
              <p className="ml-2">
                {status === "open" ? "Actively recruiting" : "closed"}
              </p>
            </div>
            <div className="flex flex-col  mt-1  ">
              <div className="flex flex-row items-center">
                <HiCurrencyRupee size="17px" />{" "}
                <p className="ml-2">Pay Range</p>
              </div>
              {payRange ? (
                <>
                  <p className="text-blue font-bold ml-6 ">
                    {payRange.low} - {payRange.high}
                  </p>
                </>
              ) : (
                <p className="text-blue font-bold ml-6 ">Not Available</p>
              )}
            </div>
            <button className="p-2 px-4 rounded-full bg-[#0a66c2] hover:bg-[#03396f] text-white  mt-3 flex flex-row items-center">
              <p className="mr-1">Apply</p> <HiExternalLink />
            </button>
          </div>
        </section>
        <section className="block mx-3 bg-white rounded-3xl my-3 p-4">
          <div className="font-bold text-lg">About the job</div>
          <div className="font-bold text-textBlack/75 my-2">
            Job description
          </div>
          <p>{description}</p>
        </section>
      </main>
    </div>
  );
}

export default Job;
