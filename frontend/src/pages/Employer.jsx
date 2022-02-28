import React from "react";
import { useEffect, useState } from "react";
import { BsBuilding } from "react-icons/bs";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { reset, getJobs } from "../features/jobs/jobsSlice";
import {
  reset as resetUser,
  emptyUser,
  getUserById,
} from "../features/user/userSlice";
import {
  reset as resetCompany,
  getCompanies,
} from "../features/companies/companiesSlice";
import { useSelector, useDispatch } from "react-redux";
import JobCard from "../components/JobCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useSnackbar } from "notistack";
import profileImg from "../components/assets/profileImg.png";

import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardArrowRight,
} from "react-icons/md";
import CompanyCard from "../components/CompanyCard";

function Employer() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEmployer, setisEmployer] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [companiesShow, setCompaniesShow] = useState(false);
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const {
    user,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
  } = useSelector((state) => state.user);
  const { name, email, mobileNumber } = user;

  const { jobs, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.jobs
  );
  const {
    companies,
    isLoading: isLoadingCompany,
    isSuccess: isSuccessCompany,
    isError: isErrorCompany,
    message: messageCompany,
  } = useSelector((state) => state.companies);

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(reset());
    }

    if (isSuccess) {
      dispatch(reset());
    }

    if (isErrorUser) {
      dispatch(resetUser());
      enqueueSnackbar("User not found", {
        variant: "error",
      });
      navigate("/");
    }

    if (isSuccessUser) {
      dispatch(resetUser());
    }

    if (isErrorCompany) {
      dispatch(resetCompany());
    }

    if (isSuccessCompany) {
      dispatch(resetCompany());
    }
  }, [
    isSuccess,
    isError,
    isSuccessUser,
    isErrorUser,
    isSuccessCompany,
    isErrorCompany,
    messageCompany,
  ]);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getJobs(id));
    dispatch(getCompanies(id));
    if (loggedInUser && loggedInUser._id === id) {
      setisEmployer(true);
    }

    return () => {
      setisEmployer(false);
      dispatch(resetUser());
      dispatch(emptyUser());
    };
  }, [setisEmployer, dispatch, resetUser]);

  const toggleCompany = () => {
    setCompaniesShow(!companiesShow);
  };

  return (
    <div className="stripes max-w-screen  min-h-screen shadow-lg text-white flex flex-col md:flex-row lg:w-1/2 lg:m-auto ">
      <div className="w-full md:w-1/2 min-h-[200px] ">
        <div className="w-full  min-h-[200px] rounded-t-3xl border-t-2 border-white mt-[100px] relative bg-black/25 pt-[60px] px-3">
          <div className="w-[100px] h-[100px] border-white border-2 rounded-full absolute top-[-50px] left-1/2 translate-x-[-50px] z-7 ">
            <img src={profileImg} alt="profile"></img>
          </div>
          <div className="mx-auto text-center font-bold mb-4 text-xl">
            {name}
          </div>
          <div>
            <p>
              <span className="font-bold">Email:</span> {email}
            </p>
            <p>
              <span className="font-bold">Mobile number:</span> {mobileNumber}
            </p>
          </div>
        </div>
        <div
          className="py-3 px-3 mt-3 w-full bg-[#6be3f8] text-black font-bold  rounded md:hover:bg-[#45dffa] cursor-pointer"
          onClick={toggleCompany}
        >
          <div className="flex flex-row justify-between items-center">
            {isEmployer && "Your"} Companies
            {!companiesShow && <MdKeyboardArrowDown size="35px" />}
            {companiesShow && <MdKeyboardArrowUp size="35px" />}
          </div>
        </div>

        <div className={`bg-secondaryL ${companiesShow ? "" : "hidden"}`}>
          {isEmployer && (
            <Link
              to="/add-company"
              className="text-black pl-4 p-2 w-full flex justify-end md:hover:text-accentD "
            >
              <div className="w-full border-b-2 border-secondaryD pr-4 pb-1 pt-2 flex flex-row  items-center cursor-pointer ">
                {" "}
                Add a company
                <div className="text-secondaryD">
                  <MdKeyboardArrowRight size="25px" />
                </div>
              </div>
            </Link>
          )}

          {isErrorCompany ? (
            <div className="text-white bg-accent w-full  p-2">
              Sorry Could not fetch Companies{" "}
            </div>
          ) : null}

          {isLoadingCompany ? (
            <div className="text-white bg-primary w-full  p-2">
              ...Loading Companies{" "}
            </div>
          ) : (
            <>
              {companies.length === 0 && (
                <div className="m-2 p-4 flex flex-row justify-center text-white font-bold rounded">
                  its Empty :(
                </div>
              )}
            </>
          )}

          {companies &&
            companies.map((company) => (
              <CompanyCard
                key={company._id}
                id={company._id}
                name={company.name}
                address={company.address}
                industry={company.industry}
                isEmployer={isEmployer}
              />
            ))}
        </div>
      </div>

      <div className="mx-2 pb-5 md:w-1/2 md:mt-12 md:ml-3">
        <div className="mt-12 pb-2  flex flex-row items-center justify-between  box-1 border-b-2 border-accent">
          <div className="flex flex-row items-center">
            <BsFillBriefcaseFill size="30px" color="white" />
            <p className="font-bold text-lg ml-5">
              {isEmployer ? <>Your Jobs</> : <>Jobs</>}{" "}
            </p>
          </div>
          {isEmployer && (
            <Link
              to="/add-job"
              className="text-accent flex flex-row items-center"
            >
              Post a new Job
              <MdOutlineNavigateNext size="25px" />
            </Link>
          )}
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
              isEmployer={isEmployer}
            />
          ))}
      </div>
    </div>
  );
}

export default Employer;
