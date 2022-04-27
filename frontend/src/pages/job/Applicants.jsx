import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { GiOfficeChair } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import { HiCurrencyRupee } from "react-icons/hi";
import { HiExternalLink } from "react-icons/hi";
import { TiTickOutline } from "react-icons/ti";
import { BsArrowBarRight } from "react-icons/bs";

import { Image, Transformation } from "cloudinary-react";
import profileImg from "../../components/assets/userPic.jpg";

import {
  reset,
  getJobWithApplicants,
  emptyJob,
} from "../../features/jobs/jobsSlice";

export const Applicants = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { job, isLoading, isSuccess, isError, message, onAction } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    dispatch(getJobWithApplicants(id));
    return () => {
      dispatch(emptyJob());
      dispatch(reset());
    };
  }, []);

  return (
    <div className="stripes max-w-screen  min-h-screen shadow-lg text-white flex flex-col  lg:w-1/2 lg:m-auto ">
      <section className="w-full   rounded-t-xl md:rounded-xl border-t-2 border-white mt-7  relative bg-secondaryL text-black py-4 pb-5 px-5">
        <div className="font-bold text-xl">{job.title}</div>

        <div className="text-black/75 mt-2">
          <div className="flex flex-row  items-center ">
            <FaBusinessTime /> <p className="ml-2">{job.employmentType}</p>
          </div>
          <div className="flex flex-row  items-center mt-1 ">
            <GiOfficeChair /> <p className="ml-2">{job.workplaceType}</p>
          </div>
          {job.location ? (
            <>
              <div className="flex flex-row  items-center mt-1 ">
                <MdLocationOn /> <p className="ml-2">{job.location}</p>
              </div>
            </>
          ) : null}

          <div className="flex flex-row  items-center mt-1 ">
            <FcOk />{" "}
            <p className="ml-2">
              {job.status === "open" ? "Actively recruiting" : "closed"}
            </p>
          </div>
          <div className="flex flex-col  mt-1  ">
            <div className="flex flex-row items-center">
              <HiCurrencyRupee size="17px" /> <p className="ml-2">Pay Range</p>
            </div>
            {job.payRange ? (
              <>
                <p className="text-blue font-bold ml-6 ">
                  {job.payRange.low && job.payRange.low.toLocaleString()} -{" "}
                  {job.payRange.high && job.payRange.high.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-blue font-bold ml-6 ">Not Available</p>
            )}
          </div>
        </div>
      </section>
      <section className="w-full  min-h-[200px]  md:rounded-xl border-t-2 border-white mt-2  relative bg-secondaryL text-black py-4 pb-5 px-5">
        <div className="font-bold text-lg mb-4">
          {job?.numberOfApplicants} Applicant
          {job?.numberOfApplicants > 1 && "s"}
        </div>
        {job?.applicants?.length > 0 ? (
          job.applicants.map((applicant) => (
            <div className=" flex flex-row mb-3 border-b border-black/20 forLastChild">
              <Link
                to={`/candidate/${applicant._id}`}
                className="min-w-[56px] h-[56px] border-white border-2 rounded-full md:cursor-pointer overflow-hidden"
              >
                {applicant?.profilePic ? (
                  <Image cloudName="duqfwygaf" publicId={applicant?.profilePic}>
                    <Transformation
                      gravity="face"
                      height="56"
                      width="56"
                      crop="fill"
                    />
                  </Image>
                ) : (
                  <img src={profileImg} alt="profilepic" />
                )}
              </Link>
              <section className="px-1">
                <Link
                  to={`/candidate/${applicant._id}`}
                  className="font-semibold md:hover:underline md:hover:text-secondaryD"
                >
                  {applicant.name}
                </Link>
                <div className="mb-1">{applicant.candidate.bio}</div>
                <div className="mb-1">
                  <span className="font-semibold"> Mobile Number: </span>
                  {applicant.candidate.mobileNumber}
                </div>
                <div className="mb-3">
                  <span className="font-semibold"> Email: </span>
                  {applicant.candidate.email}
                </div>
              </section>
            </div>
          ))
        ) : (
          <div>No Applicants </div>
        )}
      </section>
    </div>
  );
};
