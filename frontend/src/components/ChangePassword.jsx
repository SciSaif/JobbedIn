import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changePassword, reset } from "../features/user/userSlice";
import { useSnackbar } from "notistack";

function ChangePassword({ closeDrawer, setSelectedSetting, setOpen }) {
  const [inputMessage, setInputMessage] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { oldPassword, newPassword, confirmPassword } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(reset());
    }

    if (isSuccess && message.type === "changePassword") {
      dispatch(reset());
      closeDrawer();
      setSelectedSetting(null);
      setOpen();
      enqueueSnackbar("Password changed successfully!", {
        variant: "success",
      });
    }
  }, [isSuccess, isError, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.name === "cancel") {
      setFormData(initialState);
      setSelectedSetting(null);
    } else {
      if (newPassword !== confirmPassword) {
        setInputMessage("Passwords don't match");
        return;
      }
      dispatch(changePassword(formData));
    }
  };

  const btnRef = useRef();

  const handleFocus = (e) => {
    e.target.scrollIntoView();
  };

  return (
    <div className="p-4">
      <div className="mb-3 border-b-2 pb-3 ">
        <p className="font-bold text-accentD text-lg mb-2">Change Password</p>
        <form>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            placeholder="Old Password"
            className="w-full rounded px-3 py-1 mb-2 mt-1 text-black"
            value={oldPassword}
            onChange={onChange}
            onFocus={handleFocus}
            required
          />

          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            placeholder="New Password"
            className="w-full rounded px-3 py-1 mb-2 mt-1 text-black"
            value={newPassword}
            onChange={onChange}
            onFocus={handleFocus}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="w-full rounded px-3 py-1 mb-2 mt-1 text-black"
            value={confirmPassword}
            onChange={onChange}
            onFocus={handleFocus}
            required
          />

          {inputMessage && (
            <div className="w-full text-black font-normal bg-[#eed202] px-3 py-1 mt-2 rounded">
              {inputMessage}
            </div>
          )}

          <div className="flex mt-2 w-full text-white" ref={btnRef}>
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
  );
}

export default ChangePassword;
