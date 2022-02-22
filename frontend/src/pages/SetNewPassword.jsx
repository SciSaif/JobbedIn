import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetOther, executeResetPassword } from "../features/other/otherSlice";
import { useDispatch, useSelector } from "react-redux";
import InputError from "../components/InputError";
import { RiRotateLockFill } from "react-icons/ri";
import { useSnackbar } from "notistack";

function SetNewPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, resetString } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.other
  );

  const [inputMessage, setInputMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(resetOther());
    }
    if (isSuccess) {
      dispatch(resetOther());
      enqueueSnackbar("Password changed successfully!", {
        variant: "success",
      });
      navigate("/login-employer");
    }
  }, [isSuccess, isError, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setInputMessage("Passwords don't match");
      return;
    }
    dispatch(executeResetPassword({ userId: id, resetString, newPassword }));
  };

  const onChange = (e) => {
    if (e.target.id === "newPassword") {
      setNewPassword(e.target.value);
    }
    if (e.target.id === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  return (
    <div className="flex justify-center items-center align-bottom min-w-screen min-h-screen shadow-lg">
      <main className="flex flex-col bg-[#F2FFFF] rounded-lg mb-4 overflow-hidden">
        <div className="w-full pl-4 py-2 mb-2  bg-secondary">
          <h4>You can change your password now :) </h4>
        </div>
        <div className="w-full px-4">
          <h1 className="text-2xl font-bold mb-5">
            <div className="flex flex-row items-center ">
              <RiRotateLockFill size="40" />
              <p className="ml-3">Change password</p>
            </div>
          </h1>
        </div>

        {inputMessage ? <InputError message={inputMessage} /> : ""}
        <div className="p-4">
          <form onSubmit={onSubmit} className="mb-3">
            <label htmlFor="newPassword" className="required ">
              New Password
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-4 mt-1">
              <input
                type="password"
                id="newPassword"
                placeholder="New Password"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={newPassword}
                onChange={onChange}
                required
              />
            </div>
            <label htmlFor="confirmPassword" className="required ">
              Confirm Password
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-4 mt-1">
              <input
                type="password"
                id="confirmPassword"
                placeholder="New Password"
                className="px-3 py-1 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={confirmPassword}
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

export default SetNewPassword;
