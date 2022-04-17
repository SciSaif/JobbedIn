import React from "react";
import { useRef, useState } from "react";
import { FaMinusCircle } from "react-icons/fa";

import Data from "../../../data/data.json";
import { validateDates } from "../../../utils/utilityFunctions";

const data = Data;
const currentYear = new Date().getFullYear();
const years = [];
for (let i = currentYear; i >= 1922; i--) {
  years.push(i);
}

function EducationEdit({ toggle, updateCandidate, education, type }) {
  const [errorMessage, setErrorMessage] = useState("");

  const [educationData, setEducationData] = useState({
    name: education?.name ?? "",
    degree: education?.degree ?? "",
    fieldOfStudy: education?.fieldOfStudy ?? "",
    startMonth: education?.startDate?.month ?? "",
    startYear: education?.startDate?.year ?? "",
    endMonth: education?.endDate?.month ?? "",
    endYear: education?.endDate?.year ?? "",
    present: education?.endDate?.present ?? false,
    id: education?._id ?? "",
  });

  const onChange = (e) => {
    setEducationData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let dateValid = validateDates(
      educationData.startYear,
      educationData.startMonth,
      educationData.endYear,
      educationData.endMonth
    );

    if (dateValid !== "") {
      setErrorMessage(dateValid);
      return;
    }

    const formData = {
      type: type,
      data: {
        name: educationData.name,
        degree: educationData.degree,
        fieldOfStudy: educationData.fieldOfStudy,
        startDate: {
          year: educationData.startYear,
          month: educationData.startMonth,
        },
        endDate: {
          present: educationData.present,
          year: educationData.endYear,
          month: educationData.endMonth,
        },
        id: educationData.id,
      },
    };

    updateCandidate(formData);
  };

  const onDelete = (e) => {
    updateCandidate({ type: "deleteEducation", id: educationData.id });
  };

  const handlePresent = (e) => {
    setEducationData((prevState) => ({
      ...prevState,
      present: !educationData.present,
    }));
  };
  return (
    <form
      onSubmit={onSubmit}
      className="fixed top-0 left-0 bg-black/75 min-w-full h-screen flex flex-col justify-center items-center z-50 overflow-auto "
    >
      <div className="relative w-full rounded-t-xl md:w-1/2 lg:w-1/3">
        <h1 className="text-white/75 text-2xl px-7 bg-[#030b16] py-5 border-b rounded-t-xl border-white/40">
          {type === "editEducation" ? "Edit Education" : "Add Education"}
        </h1>
        <div
          className="text-white/75 text-4xl absolute top-2 right-4 cursor-pointer "
          onClick={toggle}
        >
          &times;
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3  bg-[#030b16] overflow-y-auto max-h-2/3 ">
        <div className="px-7 py-4">
          <label htmlFor="name" className="text-white/60">
            School
          </label>
          <div className="flex w-full flex-wrap items-stretch mb-4  mt-1">
            <input
              type="text"
              id="name"
              placeholder="Ex: Boston University"
              className="px-3 py-1 h-8 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full min-w-[300px]"
              value={educationData.name}
              onChange={onChange}
              required
            />
          </div>

          <label htmlFor="degree" className="text-white/60">
            Degree
          </label>
          <div className="flex w-full flex-wrap items-stretch mb-4  mt-1">
            <input
              type="text"
              id="degree"
              placeholder="Ex: Bachelor's"
              className="px-3 py-1 h-8 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full min-w-[300px]"
              value={educationData.degree}
              onChange={onChange}
              required
            />
          </div>

          <label htmlFor="fieldOfStudy" className="text-white/60">
            Field of study
          </label>
          <div className="flex w-full flex-wrap items-stretch mb-4 mt-1">
            <input
              type="text"
              id="fieldOfStudy"
              placeholder="Ex: Business"
              className="px-3 py-1 h-8 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full min-w-[300px]"
              value={educationData.fieldOfStudy}
              onChange={onChange}
              required
            />
          </div>

          <label htmlFor="startDate" className="text-white/60">
            Start Date
          </label>
          <div className="flex flex-row mb-7 mt-1">
            <select
              name="startMonth"
              id="startMonth"
              required
              className="px-3 py-2 mr-2 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full "
              value={educationData.startMonth}
              onChange={onChange}
            >
              <option value="" disabled>
                Month
              </option>
              {data["months"].map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>

            <select
              name="startYear"
              id="startYear"
              required
              className="px-3 py-2 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full"
              value={educationData.startYear}
              onChange={onChange}
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="w-6 h-6 mr-2 rounded  bg-[#030b16] shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary text-secondaryD"
              checked={educationData.present}
              onChange={handlePresent}
            />

            <label htmlFor="terms" className="text-white">
              I am currently working in this role
            </label>
          </div>

          <label htmlFor="startDate" className="text-white/60">
            End Date
          </label>
          <div
            className={
              `flex flex-row mt-1 mb-6 ` +
              (educationData.present && "opacity-20")
            }
          >
            <select
              name="endMonth"
              id="endMonth"
              required
              className="px-3 py-2 mr-2 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full "
              value={educationData.endMonth}
              onChange={onChange}
              disabled={educationData.present ? true : false}
            >
              <option value="" disabled>
                Month
              </option>
              {data["months"].map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>

            <select
              name="endYear"
              id="endYear"
              required
              className="px-3 py-2 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full"
              value={educationData.endYear}
              onChange={onChange}
              disabled={educationData.present ? true : false}
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>
          {errorMessage && (
            <div className="flex flex-row items-center text-lg text-[#f36d6d]">
              <FaMinusCircle size="20px" />
              <div className="ml-2">{errorMessage}</div>
            </div>
          )}
        </div>
      </div>
      <div
        className={
          "px-6 py-4 md:w-1/2 lg:w-1/3 border-t rounded-b-xl bg-[#030b16] w-full border-white/40 flex " +
          (type === "editEducation" ? "justify-between" : "justify-end")
        }
      >
        {type === "editEducation" && (
          <button
            type="button"
            className="text-white font-bold cursor-pointer"
            onClick={onDelete}
          >
            Delete Education
          </button>
        )}

        <button
          type="submit"
          className="bg-secondary md:hover:bg-secondaryD px-4 py-1 rounded-full text-black"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default EducationEdit;
