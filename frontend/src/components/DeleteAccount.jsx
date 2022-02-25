import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, reset, emptyUser } from "../features/user/userSlice";
import { logoutUser } from "../features/auth/authSlice";
import { useSnackbar } from "notistack";

function DeleteAccount({ closeDrawer, setSelectedSetting, setOpen }) {
  const [inputMessage, setInputMessage] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(reset());
    }

    if (isSuccess && message.type === "deleteUser") {
      dispatch(reset());
      dispatch(emptyUser());
      dispatch(logoutUser());
      closeDrawer();
      setOpen();
      setSelectedSetting(null);
      enqueueSnackbar("Account deleted successfully", {
        variant: "success",
      });

      navigate("/");
    }
  }, [isSuccess, isError, message]);

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.name === "cancel") {
      setPassword("");
      setSelectedSetting(null);
    } else {
      dispatch(deleteUser(password));
    }
  };

  return (
    <div className="p-4">
      <div className="mb-3 border-b-2 pb-3 font-bold text-accentD block">
        Are you sure you want to delete your account?
        <div className="text-white font-normal mt-2 mb-1">
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
            <div className="w-full text-black font-normal bg-[#eed202] px-3 py-1 mt-2 rounded">
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
  );
}

export default DeleteAccount;
