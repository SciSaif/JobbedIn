import React from "react";
import { useState } from "react";
import { CgArrowLongRight } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerEmployer } from "../features/auth/authSlice";
import InputError from "../components/InputError";
import { BsFillPersonLinesFill } from "react-icons/bs";

function RegisterEmployer() {
  const [inputMessage, setInputMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    companyName: "",
    address: "",
    description: "",
  });

  const {
    name,
    email,
    password,
    confirmPassword,
    number,
    companyName,
    address,
    description,
  } = formData;

  const dispatch = useDispatch();

  const { employer, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setInputMessage("Passwords Don't match");
      setTimeout(() => {
        setInputMessage(null);
      }, 3000);
      return;
    } else if (number.length < 10 || number.length > 12) {
      setInputMessage("Please input a correct mobile number");
      setTimeout(() => {
        setInputMessage(null);
      }, 3000);
    } else {
      const employerData = {
        ...formData,
      };
      delete employerData.confirmPassword;

      dispatch(registerEmployer(employerData));
    }
  };

  return (
    <div className=" flex justify-center items-center align-bottom min-w-screen min-h-screen shadow-lg ">
      <main className="flex flex-col bg-[#F2FFFF] rounded-lg mb-4 overflow-hidden">
        <div className="w-full pl-4 py-2 mb-2  bg-secondary">
          <h4>Register your company with us </h4>
        </div>
        <div className="w-full pl-4 ">
          <h1 className="text-2xl font-bold mb-5">
            <div className="flex flex-row items-center ">
              <BsFillPersonLinesFill />
              <p className="ml-3">Register</p>
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
                placeholder="Name"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={name}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="email" className="required" className="required">
              Email
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={email}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="password" className="required">
              Password
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={password}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="confirmPassword" className="required">
              Confirm password
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={confirmPassword}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="number" className="required">
              Mobile number
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="text"
                id="number"
                placeholder="Mobile number"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={number}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="companyName" className="required">
              Company name
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <textarea
                type="text"
                id="companyName"
                placeholder="Company name"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={companyName}
                onChange={onChange}
                required
              />
            </div>
            <label htmlFor="address" className="required">
              Company address
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <textarea
                type="text"
                id="address"
                placeholder="Company address"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={address}
                onChange={onChange}
                required
              />
            </div>

            <label htmlFor="description" className="required">
              Company description
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <textarea
                type="text"
                id="description"
                placeholder="Company description"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={description}
                onChange={onChange}
                required
              />
            </div>

            <button
              type="submit"
              className=" w-full text-xl shadow bg-secondary rounded py-2 hover:bg-secondaryD focus:ring-4 focus:ring-secondary"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default RegisterEmployer;
