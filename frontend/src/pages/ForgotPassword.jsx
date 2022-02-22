import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputError from "../components/InputError";
import { resetOther, resetPassword } from "../features/other/otherSlice";
import { useDispatch, useSelector } from "react-redux";

import { RiRotateLockFill } from "react-icons/ri";

function ForgotPassword() {
  const dispatch = useDispatch();

  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.other
  );

  const [inputMessage, setInputMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(resetOther());
    }
    if (isLoading) {
      setStatus("loading");
    }
    if (isSuccess) {
      setStatus("sent");
      dispatch(resetOther());
    }
  }, [isSuccess, isLoading, isError, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex justify-center items-center align-bottom min-w-screen min-h-screen shadow-lg">
      <main className="flex flex-col bg-[#F2FFFF] rounded-lg mb-4 overflow-hidden min-w-[385px] min-h-[305px]">
        {!status && (
          <>
            {" "}
            <div className="w-full pl-4 py-2   bg-secondary">
              <h4>Login to start hiring :) </h4>
            </div>
            <div className="w-full px-4 mt-2">
              <h1 className="text-2xl font-bold mb-5">
                <div className="flex flex-row items-center ">
                  <RiRotateLockFill size="40px" />
                  <p className="ml-3">Reset Password</p>
                </div>
              </h1>
              <div>A link to reset password will be sent to your email</div>
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
                    value={email}
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
          </>
        )}
        {status === "sent" && (
          <div className="flex flex-col justify-center  bg-[#7ac142] h-[305px] ">
            <svg className="animated-check mx-auto" viewBox="0 0 24 24">
              <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />{" "}
            </svg>
            <div className="w-[360px] text-center mx-auto text-white  text-xl font-">
              An email with password reset link has been sent your email:{" "}
              <b>{email}</b>
            </div>
            <Link
              to="/login-employer"
              className="mx-auto mt-5 mb-5 px-12 py-2 text-lg bg-white font-semibold md:hover:px-10 rounded-full"
            >
              Proceed
            </Link>
          </div>
        )}
        {status === "loading" && (
          <div className="flex flex-col justify-center  bg-[#7ac142] h-[305px]">
            <div className="loader"></div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ForgotPassword;
