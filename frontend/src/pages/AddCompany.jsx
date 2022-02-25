import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  addCompany,
  emptyCompany,
} from "../features/companies/companiesSlice";
import { useSnackbar } from "notistack";

import InputError from "../components/InputError";

import Data from "../data/data.json";

function AddCompany() {
  const data = Data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [inputMessage, setInputMessage] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { company, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.companies
  );

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    industry: "",
    companySize: "",
    companyType: "",
    address: "",
    logo: "",
    tagline: "",
  });

  const {
    name,
    website,
    industry,
    companySize,
    companyType,
    address,
    logo,
    tagline,
  } = formData;

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(reset);
    }

    if (isSuccess) {
      enqueueSnackbar("Company added successfully", {
        variant: "success",
      });
      navigate(`/company/${company._id}`);
      dispatch(reset);
      dispatch(emptyCompany);
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleAgreeTerms = (e) => {
    setAgreeTerms(!agreeTerms);
    if (
      !agreeTerms &&
      inputMessage === "You need to agree to the terms above to proceeed"
    ) {
      setInputMessage(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setInputMessage("You need to agree to the terms above to proceeed");
      return;
    }

    dispatch(addCompany(formData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className=" flex justify-center items-center align-bottom min-w-screen min-h-screen shadow-lg mt-5 ">
      <form className=" w-full  lg:w-3/5 md:flex " onSubmit={onSubmit}>
        <div>
          <section className="mx-4 mb-3 p-4 rounded-2xl bg-secondaryL text-[#141416] flex flex-col">
            <h2 className="text-lg text-fourth font-bold mb-3">
              Page identity
            </h2>
            <label htmlFor="name" className="required">
              Name
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3 mt-1">
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={name}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="website">Website</label>
            <div className="flex w-full flex-wrap items-stretch mb-3 mt-1">
              <input
                type="text"
                id="website"
                placeholder="Website"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={website}
                onChange={onChange}
              />
            </div>
          </section>
          <section className="mx-4 mb-3 p-4 rounded-2xl bg-secondaryL text-[#141416] flex flex-col">
            <h2 className="text-lg text-fourth font-bold mb-3">
              Company Details
            </h2>
            <label htmlFor="industry" className="required">
              Industry
            </label>

            <select
              name="industry"
              id="industry"
              required
              className="text-black px-3 py-1 mb-3 text-sm rounded border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
              value={industry}
              onChange={onChange}
            >
              <option value="" disabled>
                Select industry
              </option>
              {data.industry.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>

            <label htmlFor="companySize" className="required">
              Company Size
            </label>

            <select
              name="companySize"
              id="companySize"
              required
              className="text-black px-3 py-1 mb-3 text-sm rounded border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
              value={companySize}
              onChange={onChange}
            >
              <option value="" disabled>
                Select company size
              </option>
              {data["company-size"].map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
            <label htmlFor="companyType" className="required">
              Company Type
            </label>

            <select
              name="companyType"
              id="companyType"
              required
              className="text-black px-3 py-1 mb-3 text-sm rounded border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
              value={companyType}
              onChange={onChange}
            >
              <option value="" disabled>
                Select company type
              </option>

              {data["company-type"].map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>

            <label htmlFor="address" className="required">
              Address
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3 mt-1">
              <input
                type="text"
                id="address"
                placeholder="Address"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={address}
                onChange={onChange}
                required
              />
            </div>
          </section>
        </div>
        <div>
          <section className="mx-4 p-4 rounded-2xl bg-secondaryL text-[#141416] flex flex-col">
            <h2 className="text-lg text-fourth font-bold mb-3">
              Profile details
            </h2>
            <label htmlFor="logo">Logo</label>
            <div className="flex w-full  mt-2 bg-grey-lighter mb-2">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-[#c1f1fd] text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue md:hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Choose File
                </span>
                <input type="file" id="logo" className="hidden" />
              </label>
            </div>
            <label htmlFor="tagline">Tagline</label>
            <div className="flex w-full flex-wrap items-stretch mb-1 mt-1">
              <textarea
                type="text"
                id="tagline"
                placeholder="Example: A family-run accounting firm that promises you won't lose sleep over filing your taxes"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={tagline}
                onChange={onChange}
                maxLength="120"
              />
            </div>
            <p className="text-sm text-black/50 mb-1">
              Use your tagline to briefly describe what your company does. This
              can be changed later.
            </p>
          </section>
          <div className="flex flex-row my-2 text-white m-4 mt-5">
            <div className="w-[100px] h-[100px]">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="w-6 h-6 mr-2"
                checked={agreeTerms}
                onChange={handleAgreeTerms}
              />
            </div>

            <label htmlFor="terms">
              I verify that I am an authorized representative of this
              organization and have the right to act on its behalf in the
              creation and management of this page.{" "}
            </label>
          </div>

          {inputMessage ? <InputError message={inputMessage} /> : ""}

          <div className="w-full flex justify-end p-4">
            <button
              // disabled={agreeTerms ? false : true}
              className={`${
                agreeTerms
                  ? "bg-[#0a66c2] md:hover:bg-[#03396f]"
                  : "bg-[#868686bb] "
              } p-2 px-6  mb-12 rounded-full  text-white  mt-3 flex flex-row items-center`}
            >
              <p className="mr-1">Add Company</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCompany;
