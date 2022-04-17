import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, forwardRef } from "react";
import { Group, Avatar, Text, Select, Input } from "@mantine/core";
import {
  getAllCompanies,
  reset as resetCompany,
  emptyCompanies,
} from "../../../features/companies/companiesSlice";
import companyLogo from "../../../components/assets/companyLogo.png";
import Data from "../../../data/data.json";
import { FaMinusCircle } from "react-icons/fa";

import { validateDates } from "../../../utils/utilityFunctions";

const data = Data;
const currentYear = new Date().getFullYear();
const years = [];
for (let i = currentYear; i >= 1922; i--) {
  years.push(i);
}

const SelectItem = forwardRef(
  ({ image, label, description, ...others }, ref) => (
    <div ref={ref} {...others} color="black">
      <Group noWrap color="black">
        <Avatar src={image} />

        <div>
          <Text>{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

function ExperienceEdit({
  toggle,
  updateCandidate,
  experience,
  type,
  experiences,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const [companyData, setCompanyData] = useState([]);
  const [selectedCompanyID, setSelectedCompanyID] = useState(
    experience?.companyName ?? ""
  );
  const dispatch = useDispatch();

  const {
    companies,
    isSuccess: isSuccessCompany,
    isError: isErrorCompany,
  } = useSelector((state) => state.companies);

  const [experienceData, setExperienceData] = useState({
    location: experience?.role?.location ?? "",
    title: experience?.role?.title ?? "",
    employmentType: experience?.role?.employmentType ?? "",
    startMonth: experience?.role?.startDate?.month ?? "",
    startYear: experience?.role?.startDate?.year ?? "",
    endMonth: experience?.role?.endDate?.month ?? "",
    endYear: experience?.role?.endDate?.year ?? "",
    present: experience?.role?.endDate?.present ?? false,
    roleId: experience?.role?._id ?? "",
    id: experience.id,
  });

  useEffect(() => {
    if (isSuccessCompany) {
      let dataTemp = [];
      companies.forEach((company) => {
        let pic;
        if (company.logo) {
          pic = `https://res.cloudinary.com/duqfwygaf/image/upload/c_thumb,w_55/v1/${company.logo}`;
        } else {
          pic = companyLogo;
        }
        dataTemp.push({
          image: pic,
          label: company.name,
          value: company.name,
          description: company.industry,
        });
      });

      experiences.forEach((experience) => {
        if (!experience.company) {
          dataTemp.push({
            image: companyLogo,
            label: experience.companyName,
            value: experience.companyName,
            description: experience.companyName,
          });
        }
      });

      setCompanyData(dataTemp);
      dispatch(resetCompany());
    }

    if (isErrorCompany) {
      dispatch(resetCompany());
    }
  }, [isSuccessCompany, isErrorCompany]);

  useEffect(() => {
    dispatch(getAllCompanies());

    return () => {
      dispatch(resetCompany());
      dispatch(emptyCompanies());
    };
  }, []);

  const onChange = (e) => {
    setExperienceData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!selectedCompanyID) {
      setErrorMessage("Please choose a company");
      return;
    }

    let dateValid = validateDates(
      experienceData.startYear,
      experienceData.startMonth,
      experienceData.endYear,
      experienceData.endMonth
    );

    if (dateValid !== "") {
      setErrorMessage(dateValid);
      return;
    }

    const formData = {
      type: type,
      data: {
        company: selectedCompanyID,
        companyName: selectedCompanyID,
        role: {
          title: experienceData.title,
          employmentType: experienceData.employmentType,
          location: experienceData.location,
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
      },
      id: experienceData.id,
    };

    updateCandidate(formData);
  };

  const onDelete = (e) => {
    updateCandidate({
      type: "deleteExperience",
      id: experienceData.id,
      roleId: experienceData.roleId,
    });
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
            Company
          </label>
          <Select
            id="company"
            value={selectedCompanyID}
            onChange={setSelectedCompanyID}
            // required
            placeholder="Company"
            itemComponent={SelectItem}
            data={companyData}
            searchable
            clearable
            creatable
            getCreateLabel={(query) => `+ Add ${query}`}
            styles={{ input: { background: "#030b16", color: "white" } }}
            maxDropdownHeight={400}
            nothingFound="You have not added any companies"
            filter={(value, item) =>
              item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.description
                .toLowerCase()
                .includes(value.toLowerCase().trim())
            }
            className="mb-4"
          />

          <label htmlFor="title" className="text-white/60">
            Title
          </label>
          <div className="flex w-full flex-wrap items-stretch mb-4 mt-1">
            <input
              type="text"
              id="title"
              className="px-3 py-2 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full min-w-[300px]"
              value={experienceData.title}
              onChange={onChange}
              required
            />
          </div>

          <label htmlFor="location" className="text-white/60">
            Location
          </label>
          <div className="flex w-full flex-wrap items-stretch mb-4 mt-1">
            <input
              type="text"
              id="location"
              className="px-3 py-2 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full min-w-[300px]"
              value={experienceData.location}
              onChange={onChange}
              required
            />
          </div>

          <label htmlFor="employmentType" className="text-white/60">
            Employment Type
          </label>
          <select
            name="employmentType"
            id="employmentType"
            required
            className="px-3 py-2 mb-4 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full"
            value={experienceData.employmentType}
            onChange={onChange}
          >
            <option value="" disabled>
              Employement Type
            </option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Internship">Internship</option>
          </select>

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

          <div className="mb-4">
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
          (type === "editExperience" ? "justify-between" : "justify-end")
        }
      >
        {type === "editExperience" && (
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
