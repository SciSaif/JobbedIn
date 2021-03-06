import React from "react";
import { useState, useEffect, forwardRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  editJob,
  getJob,
  reset,
  emptyJob,
} from "../../features/jobs/jobsSlice";
import InputError from "../../components/InputError";
import {
  getAllCompanies,
  getCompanies,
  reset as resetCompany,
} from "../../features/companies/companiesSlice";
import { AiFillEdit } from "react-icons/ai";
import companyLogo from "../../components/assets/companyLogo.png";
import Spinner from "../../components/Spinner";
import { Group, Avatar, Text, Select } from "@mantine/core";

const SelectItem = forwardRef(
  ({ image, label, description, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
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

function EditJob() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const [inputMessage, setInputMessage] = useState(null);
  const [providePayRange, setProvidePayRange] = useState(false);
  const [selectedCompanyID, setSelectedCompanyID] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { job, isLoading, isSuccess, message, isError, onAction } = useSelector(
    (state) => state.jobs
  );

  const {
    companies,
    isSuccess: isSuccessCompany,
    isError: isErrorCompany,
  } = useSelector((state) => state.companies);

  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    workplaceType: "",
    location: "",
    employmentType: "",
    description: "",
    low: 0,
    high: 0,
  });

  useEffect(() => {
    if (job.length !== 0) {
      if (job.payRange) {
        setFormData({
          title: job.title,
          employmentType: job.employmentType,
          workplaceType: job.workPlaceType,
          location: job.location,
          description: job.description,
          low: job.payRange.low,
          high: job.payRange.high,
        });
        setProvidePayRange(true);
      } else {
        setFormData({
          title: job.title,
          employmentType: job.employmentType,
          workplaceType: job.workPlaceType,
          location: job.location,
          description: job.description,
          low: 0,
          high: 0,
        });
      }
      if (isSuccessCompany) {
        setSelectedCompanyID(job.companyID);
      }
    }
  }, [job, isSuccessCompany]);

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
  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(reset());
    }

    if (isSuccess && submitted) {
      navigate(`/job/${job._id}`);
    }
    if (isSuccess) {
      dispatch(reset());
    }

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
          value: company._id,
          description: company.industry,
        });
      });

      setData(dataTemp);
      dispatch(resetCompany());
    }

    if (isErrorCompany) {
      dispatch(resetCompany());
    }

    dispatch(reset());
  }, [
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
    isSuccessCompany,
    isErrorCompany,
    job,
  ]);

  useEffect(() => {
    dispatch(getJob(id));
    if (user) {
      dispatch(getAllCompanies());
    }

    return () => {
      dispatch(emptyJob());
    };
  }, [dispatch]);

  const onChange = (e) => {
    if (e.target.type === "number") {
      if (e.target.value === "") {
        e.target.value = 0;
      }
      e.target.value = parseInt(e.target.value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (providePayRange && low > high) {
      setInputMessage("Pay range should be from low to high");
      return;
    }
    const jobData = {
      title,
      workplaceType,
      location,
      employmentType,
      description,
      payRange: providePayRange ? { low, high } : null,
      companyID: selectedCompanyID,
    };

    dispatch(editJob({ jobData, id }));
    setSubmitted(true);
  };

  const handleCheckbox = (e) => {
    setProvidePayRange(!providePayRange);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center  items-center align-bottom text-white min-w-screen min-h-screen shadow-lg ">
      {isLoading ? <Spinner /> : ""}
      <main className="flex flex-col  w-full md:w-1/2 lg:w-1/3   pt-6 mx-4 mb-3 mt-3  rounded-2xl bg-secondaryL text-[#141416] ">
        <div className="w-full pl-4 ">
          <h1 className="text-2xl font-bold mb-5">
            <div className="flex flex-row items-center ">
              <AiFillEdit size="35px" />
              <p className="ml-3">Edit Job</p>
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

            <label htmlFor="company" className="required">
              Company
            </label>

            <Select
              // label=""
              id="company"
              value={selectedCompanyID}
              onChange={setSelectedCompanyID}
              required
              placeholder="Company"
              itemComponent={SelectItem}
              data={data}
              searchable
              maxDropdownHeight={400}
              nothingFound="You have not added any companies"
              filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description
                  .toLowerCase()
                  .includes(value.toLowerCase().trim())
              }
              className="mb-2"
            />

            <label htmlFor="workplaceType" className="required">
              Workplace Type
            </label>

            <select
              name="workplaceType"
              id="workplaceType"
              required
              className="text-black px-3 py-1 mb-3 mt-2 text-sm rounded border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
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
              className=" w-full text-xl shadow bg-secondary rounded py-2 mt-3 hover:bg-secondaryD focus:ring-4 focus:ring-secondary"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditJob;
