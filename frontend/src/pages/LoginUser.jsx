import React from "react";
import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, reset } from "../features/auth/authSlice";
import InputError from "../components/InputError";
import { GrLogin } from "react-icons/gr";
import Spinner from "../components/Spinner";

function LoginUser() {
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const designation = searchParams.get("desig");

  useEffect(() => {
    if (designation !== "employer" && designation !== "candidate") {
      navigate("/login-user?desig=employer");
    }
  }, []);

  const [inputMessage, setInputMessage] = useState(null);

  const [formData, setFormData] = useState({
    email: userEmail ? userEmail : "",
    password: "",
  });

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      if (user.designation === "employer") {
        navigate(`/employer/${user._id}`);
      } else if (user.designation === "candidate") {
        navigate(`/candidate/${user._id}`);
      }
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
    const userData = {
      ...formData,
    };

    dispatch(loginUser(userData));
  };

  return (
    <div className=" flex justify-center items-center align-bottom min-w-screen min-h-screen shadow-lg ">
      {isLoading ? <Spinner /> : ""}
      <main className="flex flex-col bg-[#F2FFFF] rounded-lg mb-4 overflow-hidden">
        <div className="w-full pl-4 py-2 mb-2  bg-secondary">
          <h4>Welcome back, login here :) </h4>
        </div>
        <div className="w-full pl-4 ">
          <h1 className="text-2xl font-bold mb-2 mt-2">
            <div className="flex flex-row items-center ">
              <GrLogin />
              <p className="ml-3">Login</p>
            </div>
          </h1>
        </div>

        {inputMessage ? <InputError message={inputMessage} /> : ""}
        <div className="p-4">
          <form onSubmit={onSubmit} className="mb-3">
            <label htmlFor="email" className="required ">
              Email
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-4 mt-1">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={formData?.email}
                onChange={onChange}
                required
              />
            </div>

            <label
              htmlFor="password"
              className="flex flex-row justify-between mb-1"
            >
              <p className="required">Password</p>
              <Link to="/forgot-password" className="text-accent">
                Forgot Password?
              </Link>
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="px-3 py-1 mb-3 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={formData?.password}
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

          <p className="mt-1">
            Don't have an account?{" "}
            <Link
              to={`/register-user?desig=${
                designation === "employer" ? "employer" : "candidate"
              }`}
              className="underline text-accent"
            >
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginUser;
