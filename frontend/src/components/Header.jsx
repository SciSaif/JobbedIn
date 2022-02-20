import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaAngleRight } from "react-icons/fa";
import { useState, useRef } from "react";
import Logo from "./Logo";
import { logoutEmployer, reset } from "../features/auth/authSlice";
import { AiOutlineHome } from "react-icons/ai";
import Settings from "./Settings";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employer } = useSelector((state) => state.auth);

  const drawerRef = useRef(false);

  const toggleDrawer = (e) => {
    drawerRef.current.classList.toggle("hidden");
  };

  const onLogout = () => {
    toggleDrawer();
    dispatch(logoutEmployer());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="bg-black/25 shadow-lg   min-w-screen">
      <div className=" mx-2  py-3">
        <div className="flex justify-between items-center ">
          <Link
            to="/"
            className="ml-2 text-3xl cursor-pointer font-bold text-secondary"
          >
            <div className="flex flex-row items-center ">
              <p className="mr-1">Jobbed</p>
              <Logo width={35} />
            </div>
          </Link>
          <div className="items-center hidden md:flex text-white">
            <div
              className="ml-4 profilePic cursor-pointer"
              onClick={toggleDrawer}
            >
              <FaBars size="25px" color="#82f2e5" />
            </div>
          </div>

          {/* mobile menu */}
          <div
            className="md:hidden mobile-menu-bar cursor-pointer"
            onClick={toggleDrawer}
          >
            <div>
              <FaBars size="25px" color="#82f2e5" />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}

      <div
        className="hidden fixed top-0 right-0 w-screen h-screen bg-black/50 z-10"
        ref={drawerRef}
      >
        {/* to click away the drawer  */}
        <div
          className="absolute top-0 left-0 w-1/3 xl:w-2/3 h-full z-11"
          onClick={toggleDrawer}
        ></div>
        <div className="absolute top-0 right-0 w-2/3 xl:w-1/3 h-full bg-primary z-11">
          <div
            className="mt-2 ml-2 rounded-full bg-secondary/50 w-fit p-2 cursor-pointer"
            onClick={toggleDrawer}
          >
            <FaAngleRight size="30px" />
          </div>

          <Link
            to="/"
            className="w-full flex justify-center my-3 "
            onClick={toggleDrawer}
          >
            <AiOutlineHome color="white" size="40px" />
          </Link>

          {employer ? (
            <>
              <div className=" w-full bg-black/25 text-white py-4 px-4 rounded-t-xl">
                <h1 className="font-bold">Welcome {employer.name}</h1>

                <div className="flex flex-row">
                  <button
                    className="flex-1 text-xl text-center shadow bg-secondary rounded-lg py-2 hover:bg-secondaryD focus:ring-4 focus:ring-secondary"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
                <div className="flex flex-row mt-2">
                  <Link
                    to={`/employer/${employer._id}`}
                    className="flex-1 text-xl text-center shadow bg-accent rounded-lg py-2 hover:bg-accentD focus:ring-4 focus:ring-secondary"
                    onClick={toggleDrawer}
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
              <Settings
                closeDrawer={() => {
                  toggleDrawer();
                }}
              />
            </>
          ) : (
            <>
              <div className=" w-full bg-black/25 text-white py-4 px-4 rounded-t-xl">
                <h1 className="font-bold">Want to Hire?</h1>

                <div className="flex flex-row">
                  <Link
                    to="/login-employer"
                    className="flex-1 text-xl text-center shadow bg-secondary rounded-l-lg py-2 hover:bg-secondaryD focus:ring-4 focus:ring-secondary"
                    onClick={toggleDrawer}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register-employer"
                    className="flex-1 text-xl text-center shadow bg-accent rounded-r-lg py-2 hover:bg-accentD focus:ring-4 focus:ring-secondary"
                    onClick={toggleDrawer}
                  >
                    Register
                  </Link>
                </div>
              </div>
              <div className=" w-full bg-black/25 text-white py-4 px-4  rounded-b-xl">
                <h1 className="font-bold">Looking for a Job?</h1>

                <div className="flex flex-row">
                  <Link
                    to="/login-candidate"
                    className="flex-1 text-xl text-center shadow bg-secondary rounded-l-lg py-2 hover:bg-secondaryD focus:ring-4 focus:ring-secondary"
                    onClick={toggleDrawer}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register-candidate"
                    className="flex-1 text-xl text-center shadow bg-accent rounded-r-lg py-2 hover:bg-accentD focus:ring-4 focus:ring-secondary"
                    onClick={toggleDrawer}
                  >
                    Register
                  </Link>
                </div>
              </div>
            </>
          )}

          <Link
            to="/about"
            className="absolute bottom-2 text-center w-full btn btn-ghost"
            onClick={toggleDrawer}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
