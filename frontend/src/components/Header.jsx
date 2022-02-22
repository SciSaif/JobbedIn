import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../features/other/otherSlice";

import { FaBars } from "react-icons/fa";
import Logo from "./Logo";
import Drawer from "./Drawer";

function Header() {
  const dispatch = useDispatch();

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
              onClick={() => {
                dispatch(toggleDrawer());
              }}
            >
              <FaBars size="25px" color="#82f2e5" />
            </div>
          </div>

          {/* mobile menu */}
          <div
            className="md:hidden mobile-menu-bar cursor-pointer"
            onClick={() => {
              dispatch(toggleDrawer());
            }}
          >
            <div>
              <FaBars size="25px" color="#82f2e5" />
            </div>
          </div>
        </div>
      </div>

      <Drawer />
    </nav>
  );
}

export default Header;
