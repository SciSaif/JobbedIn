import { useState } from "react";

import { AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";

import DeleteAccount from "./DeleteAccount";

function Settings({ closeDrawer }) {
  const [open, setOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);

  return (
    <div className="w-full mt-4  bg-black/25 text-white  rounded-xl select-none ">
      <div
        className={`w-ful px-4 py-3 flex flex-row items-center ${
          open ? "text-secondary" : ""
        } text-lg font-bold bg-black/25  md:hover:text-secondary  cursor-pointer rounded-xl `}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <AiFillSetting size="35px" />
        <p className="ml-2 ">Settings</p>
      </div>

      {/* if setting is clicked (open) */}
      {open && (
        <>
          {/* if no setting is selected */}
          {!selectedSetting && (
            <>
              <div className="p-4">
                <Link
                  to="user/edit"
                  className="mb-3 border-b-2 pb-3 cursor-pointer hover:text-secondary block"
                  onClick={() => {
                    setOpen(!open);
                    closeDrawer();
                  }}
                >
                  Edit Profile
                </Link>
                <div
                  className="mb-3 border-b-2 pb-3 cursor-pointer hover:text-secondary block"
                  onClick={() => setSelectedSetting("changePassword")}
                >
                  Change Password
                </div>
                <div
                  className="mb-3 border-b-2 pb-3 cursor-pointer hover:text-secondary block"
                  onClick={() => setSelectedSetting("deleteAccount")}
                >
                  Delete Account
                </div>
              </div>
            </>
          )}

          {/* if deleteAccount setting is selected */}
          {selectedSetting === "deleteAccount" && (
            <>
              <DeleteAccount
                closeDrawer={() => {
                  closeDrawer();
                }}
                setSelectedSetting={(value) => {
                  setSelectedSetting(value);
                }}
                setOpen={() => {
                  setOpen(!open);
                }}
              />
            </>
          )}

          {/* if changePassword setting is selected */}
          {selectedSetting === "changePassword" && (
            <>
              <ChangePassword
                closeDrawer={() => {
                  closeDrawer();
                }}
                setSelectedSetting={(value) => {
                  setSelectedSetting(value);
                }}
                setOpen={() => {
                  setOpen(!open);
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Settings;
