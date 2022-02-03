import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaAngleRight } from "react-icons/fa";
import { useState, useRef } from "react";

function Header() {
  const [employer, setEmployer] = useState(null);
  const drawerRef = useRef(false);

  const toggleDrawer = (e) => {
    drawerRef.current.classList.toggle("hidden");
  };

  return (
    <nav className="bg-black/25 shadow-lg fixed w-screen">
      <div className=" mx-2  py-3">
        <div className="flex justify-between items-center ">
          <Link
            to="/"
            className="ml-2 text-3xl cursor-pointer font-bold text-secondary"
          >
            Jobbedin
          </Link>
          <div className="items-center hidden md:flex text-white">
            {employer === null ? (
              <>
                <Link to="/sign-in" className="pl-3 btn btn-sm btn-ghost">
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="pl-3  ml-2 btn btn-sm btn-outline  btn-primary"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                to="/"
                className="pl-3 btn btn-sm btn-ghost"
                // onClick={onLogout}
              >
                Logout
              </Link>
            )}

            <div
              className="ml-4 profilePic cursor-pointer"
              onClick={toggleDrawer}
            >
              <FaBars size="25px" color="#9d4edd" />
            </div>
          </div>

          {/* mobile menu */}
          <div
            className="md:hidden mobile-menu-bar cursor-pointer"
            onClick={toggleDrawer}
          >
            <div>
              <FaBars size="25px" color="#9d4edd" />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}

      <div
        className="hidden absolute top-0 right-0 w-screen h-screen bg-black/50 z-10"
        ref={drawerRef}
      >
        <div className="absolute top-0 right-0 w-2/3 xl:w-1/3 h-full bg-primary/100 z-10 p-2">
          <div
            className="mt-2 ml-2 rounded-full bg-secondary/50 w-fit p-2 cursor-pointer"
            onClick={toggleDrawer}
          >
            <FaAngleRight size="30px" />
          </div>

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
