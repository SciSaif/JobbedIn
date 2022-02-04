import React from "react";
import { useState } from "react";
import { CgArrowLongRight } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginEmployer } from "../features/auth/authSlice";
import InputError from "../components/InputError";
import { GrLogin } from "react-icons/gr";

function LoginEmployer() {
  const [inputMessage, setInputMessage] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
    const employerData = {
      ...formData,
    };

    dispatch(loginEmployer(employerData));
  };

  return (
    <div className=" flex justify-center items-center align-bottom min-w-screen min-h-screen shadow-lg ">
      <main className="flex flex-col bg-[#F2FFFF] rounded-lg mb-4 overflow-hidden">
        <div className="w-full pl-4 py-2 mb-2  bg-secondary">
          <h4>Login to start hiring :) </h4>
        </div>
        <div className="w-full pl-4 ">
          <h1 className="text-2xl font-bold mb-5">
            <div className="flex flex-row items-center ">
              <GrLogin />
              <p className="ml-3">Login</p>
            </div>
          </h1>
        </div>

        {inputMessage ? <InputError message={inputMessage} /> : ""}
        <div className="p-4">
          <form onSubmit={onSubmit}>
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
                className="px-3 py-1 mb-3 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={password}
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

export default LoginEmployer;
