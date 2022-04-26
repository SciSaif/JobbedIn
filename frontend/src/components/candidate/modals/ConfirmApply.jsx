import React from "react";
import { useRef, useState } from "react";
import { Image, Transformation } from "cloudinary-react";
import profileImg from "../../../components/assets/userPic.jpg";

function ConfirmApply({ toggle, apply, candidate }) {
  return (
    <div className="fixed top-0 left-0 bg-black/75 min-w-full h-screen flex justify-center items-center z-50 overflow-auto text-white/75">
      <div className="w-full md:w-1/2 lg:w-1/3  bg-[#030b16] rounded-xl overflow-hidden relative">
        <h1 className="text-white/75 text-2xl px-7 mb-5 py-5 border-b border-white/40">
          Apply to this job
        </h1>
        <div
          className="text-white/75 text-4xl absolute top-2 right-4 cursor-pointer "
          onClick={toggle}
        >
          &times;
        </div>

        <main className="px-7">
          <div className="font-bold">Contact Info</div>
          <div className="w-[56px] h-[56px] border-white border-2 rounded-full md:cursor-pointer overflow-hidden">
            {candidate?.profilePic ? (
              <Image cloudName="duqfwygaf" publicId={candidate?.profilePic}>
                <Transformation
                  gravity="face"
                  height="56"
                  width="56"
                  crop="fill"
                />
              </Image>
            ) : (
              <img src={profileImg} alt="profilepic" />
            )}
          </div>
          <section className="px-1">
            <div className="font-semibold">{candidate.name}</div>
            <div className="mb-4">{candidate.candidate.bio}</div>
            <label htmlFor="email" className="text-white/60">
              Email address
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-4 mt-1">
              <input
                type="text"
                id="email"
                className="px-3 py-2 bg-[#030b16] text-lg rounded-lg opacity-50 shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full min-w-[300px]"
                required
                value={candidate.email}
                disabled
              />
            </div>
            <label htmlFor="mobileNumber" className="text-white/60">
              Mobile phone number
            </label>
            <div className="flex w-full flex-wrap items-stretch mb-7 mt-1">
              <input
                type="text"
                id="mobileNumber"
                className="px-3 py-2 bg-[#030b16] text-lg rounded-lg opacity-50 shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary w-full min-w-[300px]"
                required
                value={candidate.mobileNumber}
                disabled
              />
            </div>
          </section>
        </main>

        <div className="px-6 py-4 border-t border-white/40 flex justify-end">
          <button
            className="bg-secondary md:hover:bg-secondaryD px-4 py-1 rounded-full text-black"
            onClick={apply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmApply;
