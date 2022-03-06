import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  emptyCompany,
  getCompany,
  editCompany,
} from "../../features/companies/companiesSlice";
import { Select } from "@mantine/core";
import { useSnackbar } from "notistack";

import InputError from "../../components/InputError";

import Data from "../../data/data.json";

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function validateURL(url) {
  if (
    !(url.substring(0, 8) === "https://" || url.substring(0, 7) === "http://")
  ) {
    url = "https://" + url;
    if (isValidHttpUrl(url)) return url;
    else return null;
  } else {
    if (isValidHttpUrl(url)) return url;
    else return null;
  }
}

function EditCompany() {
  const data = Data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [inputMessage, setInputMessage] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [industryValue, setIndustryValue] = useState("");

  const { company, isLoading, onAction, isError, isSuccess, message } =
    useSelector((state) => state.companies);

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    industry: industryValue,
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
      dispatch(reset());
    }

    if (isSuccess && onAction === "edit") {
      enqueueSnackbar("Company edited successfully", {
        variant: "success",
      });
      dispatch(reset());
      dispatch(emptyCompany());
      navigate(`/company/${id}`);
    }

    if (isSuccess && onAction === "getCompany") {
      setFormData((prevData) => ({
        ...prevData,
        ...company,
      }));
      setIndustryValue(company.industry);
    }
  }, [isError, isSuccess, message, dispatch, onAction]);

  useEffect(() => {
    dispatch(getCompany(id));
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      industry: industryValue,
    }));
  }, [industryValue]);

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

    dispatch(editCompany({ id, formData }));
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
                className="px-3 py-2 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
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
                className="px-3 py-2 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
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

            <Select
              name="industry"
              id="industry"
              value={industryValue}
              onChange={setIndustryValue}
              placeholder="Select Industry"
              searchable
              nothingFound="No options"
              data={data.industry}
            />

            <label htmlFor="companySize" className="required mt-2">
              Company Size
            </label>

            <select
              name="companySize"
              id="companySize"
              required
              className="text-black px-3 py-2 mb-3 text-sm rounded border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
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
              className="text-black px-3 py-2 mb-3 text-sm rounded border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
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
                className="px-3 py-2 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
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

export default EditCompany;
