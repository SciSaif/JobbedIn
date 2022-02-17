import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { updateEmployer, reset } from "../features/employer/employerSlice";
import { refresh } from "../features/auth/authSlice";
import InputError from "../components/InputError";

function EditEmployer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState(null);
  const { employer } = useSelector((state) => state.auth);
  const { isSuccess, isError, message } = useSelector(
    (state) => state.employer
  );

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    companyName: "",
    address: "",
    description: "",
  });

  const { name, mobileNumber, companyName, address, description } = formData;

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(reset());
    }

    if (isSuccess) {
      dispatch(refresh(formData));
      navigate(`/employer/${employer._id}`);
    }

    return () => {};
  }, [isSuccess, isError, message]);

  useEffect(() => {
    if (employer) {
      setFormData({
        name: employer.name,
        mobileNumber: employer.mobileNumber,
        companyName: employer.companyName,
        address: employer.address,
        description: employer.description,
      });
    }

    return () => {};
  }, [employer]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEmployer(formData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center align-bottom text-white min-w-screen min-h-screen shadow-lg ">
      {/* {isLoading ? <Spinner /> : ""} */}
      <main className="flex flex-col shapesd w-full md:w-1/2 lg:w-1/3 h-screen overflow-hidden pt-8">
        <div className="w-full pl-4 ">
          <h1 className="text-2xl font-bold mb-5">
            <div className="flex flex-row items-center ">
              <AiFillEdit size="35px" />
              <p className="ml-3">Edit Profile</p>
            </div>
          </h1>
        </div>

        {inputMessage ? <InputError message={inputMessage} /> : ""}
        <div className="p-4">
          <form onSubmit={onSubmit}>
            <label htmlFor="name" className="required">
              Name
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="text"
                id="name"
                placeholder="name"
                className="px-3 py-1 text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={name}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="mobileNumber" className="required">
              Mobile Number
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="text"
                id="mobileNumber"
                placeholder="Mobile Number"
                className="px-3 py-1 text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={mobileNumber}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="companyName" className="required">
              Company Name
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="text"
                id="companyName"
                placeholder="Company Name"
                className="px-3 py-1 text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={companyName}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="address" className="required">
              Company Address
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="text"
                id="address"
                placeholder="Company Address"
                className="px-3 py-1 text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={address}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="description" className="required">
              Description
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <textarea
                type="text"
                id="description"
                placeholder="Description"
                className="px-3 py-1 text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={description}
                onChange={onChange}
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              className=" w-full text-xl mt-3 shadow bg-secondary rounded py-2 hover:bg-secondaryD focus:ring-4 focus:ring-secondary"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditEmployer;
