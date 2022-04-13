import React from "react";
import { useRef, useState } from "react";

import Data from "../../../data/data.json";

const data = Data;
const currentYear = new Date().getFullYear();
const years = [];
for (let i = currentYear; i >= 1922; i--) {
  years.push(i);
}

function ExperienceEdit({ toggle, updateCandidate, experience, type }) {
  const [experienceData, setExperienceData] = useState({
    name: experience?.name ?? "",
    address: experience?.address ?? "",
    startMonth: experience?.startDate?.month ?? "",
    startYear: experience?.startDate?.year ?? "",
    endMonth: experience?.endDate?.month ?? "",
    endYear: experience?.endDate?.year ?? "",
    present: experience?.endDate?.present ?? false,
    id: experience?._id ?? "",
  });

  const onChange = (e) => {
    setExperienceData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      type: type,
      data: {
        name: experienceData.name,
        address: experienceData.address,
        startDate: {
          year: experienceData.startYear,
          month: experienceData.startMonth,
        },
        endDate: {
          present: experienceData.present,
          year: experienceData.endYear,
          month: experienceData.endMonth,
        },
      },
      id: experienceData.id,
    };

    updateCandidate(formData);
  };

  const onDelete = (e) => {
    updateCandidate({ type: "delete", data: experienceData.id });
  };

  const handlePresent = (e) => {
    setExperienceData((prevState) => ({
      ...prevState,
      present: !experienceData.present,
    }));
  };
  return (
    <form
      onSubmit={onSubmit}
      className="fixed top-0 left-0 bg-black/75 min-w-full h-screen flex flex-col justify-center items-center z-50 overflow-auto "
    >
      <div className="relative w-full rounded-t-xl md:w-1/2 lg:w-1/3">
        <h1 className="text-white/75 text-2xl px-7 bg-[#030b16] py-5 border-b rounded-t-xl border-white/40">
          {type === "edit" ? "Edit Experience" : "Add Experience"}
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
            Name of Company
          </label>
          <div className="flex w-full flex-wrap items-stretch mb-6  mt-1">
            <input
              type="text"
              id="name"
              className="px-3 py-2 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full min-w-[300px]"
              value={experienceData.name}
              onChange={onChange}
              required
            />
          </div>

          <label htmlFor="address" className="text-white/60">
            Address of Company
          </label>
          <div className="flex w-full flex-wrap items-stretch mb-6 mt-1">
            <input
              type="text"
              id="address"
              className="px-3 py-2 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full min-w-[300px]"
              value={experienceData.address}
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
              value={experienceData.startMonth}
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
              value={experienceData.startYear}
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

          <div className="mb-6">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="w-6 h-6 mr-2 rounded  bg-[#030b16] shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary text-secondaryD"
              checked={experienceData.present}
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
              (experienceData.present && "opacity-20")
            }
          >
            <select
              name="endMonth"
              id="endMonth"
              required
              className="px-3 py-2 mr-2 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full "
              value={experienceData.endMonth}
              onChange={onChange}
              disabled={experienceData.present ? true : false}
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
              value={experienceData.endYear}
              onChange={onChange}
              disabled={experienceData.present ? true : false}
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
        </div>
      </div>
      <div
        className={
          "px-6 py-4 md:w-1/2 lg:w-1/3 border-t rounded-b-xl bg-[#030b16] w-full border-white/40 flex " +
          (type === "edit" ? "justify-between" : "justify-end")
        }
      >
        {type === "edit" && (
          <button
            type="button"
            className="text-white font-bold cursor-pointer"
            onClick={onDelete}
          >
            Delete Experience
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

export default ExperienceEdit;
