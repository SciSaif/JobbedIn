import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillSetting } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteEmployer,
  reset,
  emptyEmployer,
} from "../features/employer/employerSlice";
import { logoutEmployer } from "../features/auth/authSlice";

function Settings({ closeDrawer }) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector(
    (state) => state.employer
  );

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      setTimeout(() => {
        setInputMessage("");
      }, 3000);
      dispatch(reset());
    }

    if (isSuccess && message.type === "deleteEmployer") {
      setInputMessage("Deleted Account");
      dispatch(reset());
      dispatch(emptyEmployer());
      dispatch(logoutEmployer());
      closeDrawer();
      navigate("/");
    }
  }, [isSuccess, isError, message]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleDelete = () => {
    setDeleteOpen(!deleteOpen);
  };

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.name === "cancel") {
      setPassword("");
      setDeleteOpen(false);
    } else {
      dispatch(deleteEmployer(password));
    }
  };
  return (
    <div className="w-full mt-4  bg-black/25 text-white  rounded-xl select-none ">
      <div
        className={`w-ful px-4 py-3 flex flex-row items-center ${
          open ? "text-secondary" : ""
        } text-lg font-bold bg-black/25  md:hover:text-secondary  cursor-pointer rounded-xl`}
        onClick={toggleOpen}
      >
        <AiFillSetting size="35px" />
        <p className="ml-2 ">Settings</p>
      </div>

      {open ? (
        <>
          {deleteOpen ? (
            <div className="p-4">
              <div className="mb-3 border-b-2 pb-3 font-bold text-accentD block">
                Are you sure you want to delete your account?
                <div className="text-white font-normal mt-2">
                  Enter your password to confirm
                </div>
                <form>
                  <input
                    type="password"
                    placeholder="password"
                    className="w-full rounded px-3 py-1"
                    value={password}
                    onChange={onChange}
                    required
                  />
                  {inputMessage ? (
                    <div className="w-full text-white font-normal bg-[#eed202] px-3 py-1 mt-2 rounded">
                      {inputMessage}
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="flex mt-2 w-full text-white">
                    <button
                      type="submit"
                      name="confirm"
                      className="flex-1 bg-accentD hover:bg-[#bd0325] rounded-l p-2 font-bold"
                      onClick={onSubmit}
                    >
                      Confirm
                    </button>
                    <button
                      type="submit"
                      name="cancel"
                      className="flex-1 bg-secondary hover:bg-[#3bddca] rounded-r p-2 font-bold"
                      onClick={onSubmit}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <Link
                to="employer/edit"
                className="mb-3 border-b-2 pb-3 cursor-pointer hover:text-secondary block"
                onClick={() => {
                  toggleOpen();
                  closeDrawer();
                }}
              >
                Edit Profile
              </Link>
              <div
                className="mb-3 border-b-2 pb-3 cursor-pointer hover:text-secondary block"
                onClick={toggleDelete}
              >
                Delete Account
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Settings;
