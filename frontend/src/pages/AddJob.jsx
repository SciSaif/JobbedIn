import React from "react";
import { useState, useEffect } from "react";
import { CgArrowLongRight } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createJob, reset } from "../features/jobs/jobsSlice";
import InputError from "../components/InputError";
import { GrLogin } from "react-icons/gr";
import Spinner from "../components/Spinner";
import { MdPostAdd } from "react-icons/md";

function AddJob() {
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState(null);
  const [providePayRange, setProvidePayRange] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    workplaceType: "On-Site",
    location: "",
    employmentType: "Full Time",
    description: "",
    low: 0,
    high: 0,
  });

  const {
    title,
    workplaceType,
    location,
    employmentType,
    description,
    low,
    high,
  } = formData;

  const dispatch = useDispatch();

  const { jobs, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
    }

    // Redirect when logged in
    if (isSuccess) {
      navigate("/employer-dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(employmentType);
    const jobData = {
      title,
      workplaceType,
      location,
      employmentType,
      description,
      payRange: {
        low,
        high,
      },
    };

    dispatch(createJob(jobData));
  };

  const handleCheckbox = (e) => {
    setProvidePayRange(!providePayRange);
  };

  return (
    <div className="flex justify-center items-center align-bottom text-white min-w-screen min-h-screen shadow-lg ">
      {isLoading ? <Spinner /> : ""}
      <main className="flex flex-col shapesd w-full h-screen overflow-hidden">
        <div className="w-full pl-4 py-2 mb-2  bg-primary">
          <h4>Find a great hire, fast </h4>
        </div>
        <div className="w-full pl-4 ">
          <h1 className="text-2xl font-bold mb-5">
            <div className="flex flex-row items-center ">
              <MdPostAdd size="35px" />
              <p className="ml-3">Post a new Job</p>
            </div>
          </h1>
        </div>

        {inputMessage ? <InputError message={inputMessage} /> : ""}
        <div className="p-4">
          <form onSubmit={onSubmit}>
            <label htmlFor="title" className="required">
              Job title
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="title"
                id="title"
                placeholder="title"
                className="px-3 py-1 text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={title}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="workplaceType" className="required">
              Workplace Type
            </label>

            <select
              name="workplaceType"
              id="workplaceType"
              required
              className="text-black px-3 py-1 mb-3 text-sm rounded border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
              value={workplaceType}
              onChange={onChange}
            >
              <option value="On-Site">
                On-site | Employees come to work in-person
              </option>
              <option value="Remote">Remote | Employees Work off-site</option>
              <option value="Hybrid">
                Hybrid | Employees work on-site and off-site
              </option>
            </select>

            {workplaceType === "On-Site" ? (
              <>
                <label htmlFor="location" className="required">
                  Job location
                </label>
                <div className="flex w-full flex-wrap items-stretch mb-3">
                  <input
                    type="location"
                    id="location"
                    placeholder="location"
                    className="px-3 py-1 text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                    value={location}
                    onChange={onChange}
                    required
                  />
                </div>
              </>
            ) : null}

            <label htmlFor="employmentType" className="required">
              Employment Type
            </label>

            <select
              name="employmentType"
              id="employmentType"
              required
              className="text-black px-3 py-1 mb-3 text-sm rounded border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
              value={employmentType}
              onChange={onChange}
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Internship">Internship</option>
            </select>

            <label htmlFor="description" className="required">
              Job Description
            </label>

            <textarea
              name="description"
              id="description"
              required
              className="px-3 py-1 text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
              placeholder="Job description"
              value={description}
              onChange={onChange}
            />

            <div className="flex flex-row items-center my-2">
              <input
                type="checkbox"
                name="providePayRange"
                id="providePayRange"
                className="w-5 h-5 mr-2"
                checked={providePayRange}
                onChange={handleCheckbox}
              />

              <label htmlFor="providePayRange">Provide Pay Range?</label>
            </div>

            {providePayRange ? (
              <>
                <p>Pay Range: </p>
                <div className="my-2 w-[220px] flex flex-row justify-between">
                  <input
                    type="number"
                    name="low"
                    id="low"
                    value={low}
                    className="w-[100px] rounded text-black"
                    onChange={onChange}
                    min="0"
                  />
                  -
                  <input
                    type="number"
                    name="high"
                    id="high"
                    value={high}
                    className="w-[100px] rounded text-black"
                    placeholder="to"
                    onChange={onChange}
                    min="0"
                  />
                </div>
              </>
            ) : null}

            <button
              type="submit"
              className=" w-full text-xl shadow bg-secondary rounded py-2 hover:bg-secondaryD focus:ring-4 focus:ring-secondary"
            >
              Submit
            </button>
          </form>

          <p className="mt-3">
            Don't have an account?{" "}
            <Link to="/register-employer" className="underline text-accent">
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default AddJob;
