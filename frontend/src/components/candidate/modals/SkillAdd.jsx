import React from "react";
import { useRef, useState } from "react";

function SkillEdit({ toggle, updateCandidate }) {
  const [skillData, setSkillData] = useState("");

  const onChange = (e) => {
    setSkillData(e.target.value);
  };

  return (
    <div className="fixed top-0 left-0 bg-black/75 min-w-full h-screen flex justify-center items-center z-50 overflow-auto">
      <div className="w-full md:w-1/2 lg:w-1/3  bg-[#030b16] rounded-xl overflow-hidden relative">
        <h1 className="text-white/75 text-2xl px-7 mb-5 py-5 border-b border-white/40">
          Add Skill
        </h1>
        <div
          className="text-white/75 text-4xl absolute top-2 right-4 cursor-pointer "
          onClick={toggle}
        >
          &times;
        </div>

        <div className="px-7 py-4">
          <label htmlFor="tagline" className="text-white/60">
            Add a skill
          </label>
          <div className="flex w-full flex-wrap items-stretch mb-6 mt-2">
            <input
              type="text"
              id="tagline"
              className="px-3 py-1 text-white/75 bg-[#030b16] text-lg rounded-lg  shadow outline-white/50 outline focus:outline-none focus:ring focus:ring-secondary  w-full min-w-[300px]"
              maxLength="200"
              value={skillData}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/40 flex justify-end">
          <button
            className="bg-secondary md:hover:bg-secondaryD px-4 py-1 rounded-full text-black"
            onClick={() =>
              updateCandidate({ type: "skillAdd", data: skillData })
            }
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkillEdit;
