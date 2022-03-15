import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import InputError from "../components/InputError";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Spinner from "../components/Spinner";

function RegisterUser() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const designation = searchParams.get("desig");
  useEffect(() => {
    if (designation !== "employer" && designation !== "candidate") {
      navigate("/register-user?desig=employer");
    }
  }, []);

  const [inputMessage, setInputMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  });

  const { name, email, password, confirmPassword, mobileNumber } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate(`/emailsent/${email}`);
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

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

      return;
    } else if (mobileNumber.length < 10 || mobileNumber.length > 14) {
      setInputMessage("Please input a correct mobile Number");
    } else {
      const userData = {
        ...formData,
      };
      delete userData.confirmPassword;
      userData.designation = designation;
      dispatch(registerUser(userData));
    }
  };

  return (
    <div className=" flex justify-center items-center align-bottom min-w-screen min-h-screen shadow-lg ">
      {isLoading ? <Spinner /> : ""}
      <main className="flex flex-col bg-[#F2FFFF] rounded-lg mb-4 overflow-hidden">
        <div className="w-full pl-4 py-2 mb-2  bg-secondary">
          {designation === "employer" ? (
            <h4>Your next hire is right here. Get started</h4>
          ) : (
            <h4>Looking for a job? Register now!</h4>
          )}
        </div>
        <div className="w-full pl-4 ">
          <h1 className="text-2xl font-bold mb-2 mt-2">
            <div className="flex flex-row items-center ">
              <BsFillPersonLinesFill />
              {designation === "employer" ? (
                <p className="ml-3">Employer registration</p>
              ) : (
                <p className="ml-3">Candidate Registration</p>
              )}
            </div>
          </h1>
        </div>

        {inputMessage ? <InputError message={inputMessage} /> : ""}
        <div className="p-4">
          <form onSubmit={onSubmit}>
            <label
              for="toggle-example-checked"
              class="flex relative items-center mb-4 cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle-example-checked"
                class="sr-only"
                checked
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full border border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-600"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Toggle me (checked)
              </span>
            </label>

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

            <label htmlFor="email" className="required">
              Email
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3 mt-1">
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
            <div className="flex w-full flex-wrap items-stretch mb-3 mt-1">
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
            <div className="flex w-full flex-wrap items-stretch mb-3 mt-1">
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

            <label htmlFor="mobileNumber" className="required">
              Mobile Number
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3 mt-1">
              <input
                type="text"
                id="mobileNumber"
                placeholder="Mobile Number"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={mobileNumber}
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
            Already have an account?{" "}
            <Link
              to={`/login-user?desig=${
                designation === "employer" ? "employer" : "candidate"
              }`}
              className="underline text-accent"
            >
              Login
            </Link>
          </p>
          <p className="mt-3">
            {designation === "employer"
              ? "Looking for a job? Create a "
              : "Want to hire? Create an "}

            <Link
              to={`/register-user?desig=${
                designation === "employer" ? "candidate" : "employer"
              }`}
              className="underline text-accent"
            >
              {designation === "employer"
                ? "Candidate Account"
                : "Employer Account"}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default RegisterUser;
