import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, reset } from "../features/user/userSlice";
import { refresh } from "../features/auth/authSlice";
import InputError from "../components/InputError";

function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isError, message } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
  });

  const { name, mobileNumber, email } = formData;

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(reset());
    }

    if (isSuccess) {
      dispatch(refresh(formData));
      navigate(`/user/${user._id}`);
    }

    return () => {};
  }, [isSuccess, isError, message]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        mobileNumber: user.mobileNumber,
        email: user.email,
      });
    }

    return () => {};
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      ...formData,
    };
    userData.designation = "employer";
    dispatch(updateUser(userData));
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
      <main className="flex flex-col shapesd w-full md:w-1/2 lg:w-1/3 pt-6 mx-4 mb-3 mt-3 rounded-2xl bg-secondaryL text-[#141416]">
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

            <label htmlFor="email" className="required">
              Email (cannot be changed)
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-3">
              <input
                type="text"
                id="email"
                placeholder="Mobile Number"
                className="px-3 py-1 text-black/75 bg-[#d5d5d5] rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full min-w-[300px]"
                value={email}
                onChange={onChange}
                required
                disabled
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

export default EditUser;
