import React from "react";
import { CgArrowLongRight } from "react-icons/cg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container flex justify-center items-center align-bottom w-screen h-screen  px-3">
      <main className="flex flex-col justify-center items-center">
        <h1 className="text-accent text-5xl text-center font-bold leading-snug">
          10K+ Startups already hiring on JobbedIn
        </h1>
        <h5 className="text-accent text-center mt-5">
          Why don't you hire someone today!
        </h5>

        <Link
          to="/hire/register"
          className="bg-secondary text-white rounded-full px-4 py-2 mt-10 w-fit hover:bg-tertiary-100 active:px-3"
        >
          <p className="flex flex-row items-center">
            Hire for your company{" "}
            <span className="text-[#ddbe4e] mx-1 font-bold">FREE</span>
            <CgArrowLongRight />{" "}
          </p>
        </Link>
        <Link to="/jobs" className="underline text-white mt-2">
          <p>I'm Looking for a Job </p>
        </Link>
      </main>
    </div>
  );
}

export default Home;
