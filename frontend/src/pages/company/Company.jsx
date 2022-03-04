import React from "react";
import coverImg from "../../components/assets/cover.jpg";
import amazonLogo from "../../components/assets/amazonLogo.jfif";
import { useEffect } from "react";
import {
  reset,
  getCompany,
  emptyCompany,
} from "../../features/companies/companiesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Image } from "cloudinary-react";

import Spinner from "../../components/Spinner";
import JobCard from "../../components/JobCard";
import { getJobsByCompany } from "../../features/jobs/jobsSlice";
import { BsFillBriefcaseFill } from "react-icons/bs";

function Company() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { company, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.companies
  );
  const {
    jobs,
    isLoading: isLoadingJob,
    isSuccess: isSuccessJob,
    isError: isErrorJob,
    message: messageJob,
  } = useSelector((state) => state.jobs);

  const {
    name,
    website,
    industry,
    companySize,
    companyType,
    address,
    logo,
    tagline,
  } = company;

  useEffect(() => {
    if (isError) {
      dispatch(reset());
      enqueueSnackbar("Company not found", {
        variant: "error",
      });
      navigate("/");
    }

    if (isSuccess) {
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  useEffect(() => {
    dispatch(getCompany(id));
    dispatch(getJobsByCompany(id));

    return () => {
      dispatch(emptyCompany());
    };
  }, []);

  if (company.length === 0 || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-screen md:w-1/2 lg:w-3/4 max-w-[800px]  mx-auto">
      <section className="rounded w-full min-h-[250px]  bg-secondaryL mt-4 pb-0 ">
        <img src={coverImg} alt="" className="mt-0 rounded-t " />
        <div className="w-[100px] h-[100px]   absolute   translate-x-[20px] translate-y-[-50px] z-7 ">
          {logo && (
            <Image
              cloudName="duqfwygaf"
              publicId={logo}
              width="100"
              height="100"
              crop="fill"
            />
          )}
          {/* <img src={amazonLogo} alt="" /> */}
        </div>
        <div className="mx-5 pb-5">
          <h2 className="font-bold text-2xl mt-[58px] ">{name}</h2>
          <h5 className="text-black/75 ">
            {industry} | {address}
          </h5>
          <div className="mt-5 text-lg font-bold">Overview</div>
          {tagline ? <p>{tagline}</p> : <>:\</>}

          <div className="mt-2 text-lg font-bold">Website</div>
          {website ? (
            <a href={website} target="_blank" className="text-fourth">
              {website}
            </a>
          ) : (
            <>:\</>
          )}

          <div className="mt-2 text-lg font-bold">Company Size</div>
          <p>{companySize}</p>
          <div className="mt-2 text-lg font-bold">Headquarters</div>
          <p>{address}</p>
          <div className="mt-2 text-lg font-bold">Industry</div>
          <p>{industry}</p>
          <div className="mt-2 text-lg font-bold">Company Type</div>
          <p>{companyType}</p>
        </div>
      </section>
      <section className="mt-5 text-white px-2">
        <div className="flex flex-row items-center px-3 py-2 mb-2 border-b-2 border-b-accent ">
          <BsFillBriefcaseFill size="30px" color="white" />
          <p className="font-bold ml-5 text-xl ">Jobs </p>
        </div>
        <div className=" text-white">
          {isLoadingJob ? (
            <div className="text-white bg-primary w-full  p-2">
              ...Loading jobs{" "}
            </div>
          ) : (
            <>
              {jobs.length === 0 && (
                <div className="m-2 p-4 flex flex-row justify-center text-white font-bold rounded">
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
                isEmployer={false}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default Company;
