import React from "react";
import { useEffect, useState } from "react";
import { GiOfficeChair } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import { HiCurrencyRupee } from "react-icons/hi";
import { HiExternalLink } from "react-icons/hi";
import { reset, getJob, emptyJob } from "../../features/jobs/jobsSlice";
import {
  reset as resetCompany,
  getCompany,
} from "../../features/companies/companiesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import formatDistance from "date-fns/formatDistance";

function Job() {
  const [timestamp, setTimestamp] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const { job, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.jobs
  );
  const {
    company,
    isError: isErrorCompany,
    isSuccess: isSuccessCompany,
  } = useSelector((state) => state.companies);

  const {
    user,
    title,
    employmentType,
    workplaceType,
    location,
    status,
    payRange,
    applicants,
    description,
    createdAt,
    companyID,
  } = job;

  useEffect(() => {
    if (createdAt) {
      const dateStr = createdAt;
      const str = formatDistance(new Date(dateStr), new Date());
      setTimestamp(str + " ago");
    }
  }, [createdAt]);

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(reset());
    }

    if (isSuccess) {
      dispatch(reset());
      dispatch(getCompany(job.companyID));
    }

    if (isErrorCompany) {
      dispatch(reset());
    }

    if (isSuccessCompany) {
      dispatch(resetCompany());
    }
  }, [
    dispatch,
    isError,
    isSuccess,
    message,
    isLoading,
    isErrorCompany,
    isSuccessCompany,
  ]);

  useEffect(() => {
    dispatch(getJob(id));

    return () => {
      dispatch(emptyJob());
    };
  }, []);

  if (job.length === 0 || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center align-bottom text-white min-w-screen min-h-screen shadow-lg">
      <main className=" sprinkles flex flex-col sprinkle w-full h-screen  text-textBlack">
        <section className="block mx-3 bg-secondaryL rounded-3xl my-3 mt-8 p-4">
          <div className="font-bold text-2xl">{title}</div>
          <div className="text-black/75 mt-2">
            {company ? (
              <Link
                to={`/company/${companyID}`}
                className="hover:text-bermuda hover:underline"
              >
                {company.name}
              </Link>
            ) : (
              ""
            )}{" "}
            | {(company ? company.address : "") + " "} ({workplaceType}){"   "}
            <span className="text-black/25">
              {" "}
              {timestamp ? timestamp : ""} | {applicants} applicants
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
                    {payRange.low && payRange.low.toLocaleString()} -{" "}
                    {payRange.high && payRange.high.toLocaleString()}
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
        <section className="block mx-3 bg-white rounded-3xl my-3 p-4">
          <div className="font-bold text-lg">About Employer</div>
          <div className="font-bold text-textBlack/75 my-2">{user.name}</div>
          <p>
            <b>Email:</b> {user.email}
          </p>
          {user.mobileNumber && (
            <p className="mb-4">
              <b>Mobile number:</b> {user.mobileNumber}
            </p>
          )}

          <div className="flex flex-col">
            <Link
              to={`/user/${user._id}`}
              className="p-2 px-4 w-fit bg-tertiary hover:bg-[#ecc27a]  rounded-full mb-2"
            >
              Go to Employer's Profile
            </Link>
            <Link
              to={`/company/${companyID}`}
              className="p-2 px-4 w-fit bg-accent hover:bg-accentD  rounded-full "
            >
              Go to Company Page
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Job;
