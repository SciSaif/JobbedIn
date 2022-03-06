import { Image } from "cloudinary-react";
import companyLogo from "../components/assets/companyLogo.png";
import React from "react";

function ProfilePicEdit({ logo, togglePhoto, isUser }) {
  return (
    <div className="fixed top-0 left-0 bg-black/75 min-w-full h-screen flex justify-center items-center z-50 ">
      <div className="w-full md:w-1/2 lg:w-1/3  mx-3 bg-[#030b16] rounded-xl overflow-hidden relative">
        <h1 className="text-white/75 text-2xl mx-4 my-5">Profile Picture</h1>
        <div
          className="text-white/75 text-4xl absolute top-2 right-4 cursor-pointer"
          onClick={togglePhoto}
        >
          &times;
        </div>
        <div className="w-full flex justify-center">
          <div className="mx-4 max-w-[500px] my-4">
            {logo ? (
              <Image cloudName="duqfwygaf" publicId={logo} crop="fill" />
            ) : (
              <img src={companyLogo} alt="" />
            )}
          </div>
        </div>

        {isUser && (
          <div className=" mt-5 border-t-white/50 border flex justify-around">
            <button className="text-white/75 px-4 py-5 text-lg font-semibold hover:bg-[#061222] hover:rounded-lg">
              Change
            </button>
            <button className="text-white/75 px-4 py-5 text-lg font-semibold hover:bg-[#061222] hover:rounded-lg">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePicEdit;
