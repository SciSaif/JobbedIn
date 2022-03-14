import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const [designation, setDesignation] = useState(null);
  useEffect(() => {
    if (user && user.designation) {
      setDesignation(user.designation);
    }
  }, [user]);

  return (
    <div className=" flex items-center justify-center min-w-screen h-screen  ">
      <div className="container flex justify-center items-center align-bottom   px-3">
        <main className="flex flex-col justify-center items-center">
          <h1 className="text-accent text-5xl text-center font-bold leading-snug">
            +10K Startups already hiring on JobbedIn
          </h1>
          <h5 className="text-white/75 text-center text-lg mt-8">
            Why don't you hire someone today?
          </h5>

          <div className="flex flex-col ">
            <Link
              to={
                user && designation === "employer"
                  ? `/employer/${user._id}`
                  : `/register-user?desig=employer`
              }
              className="bg-secondary hover:bg-[#4ffbe7] text-black rounded px-4 py-2 mt-4 w-fit hover:bg-tertiary-100 "
            >
              <div className="flex flex-row items-center">
                <p className="border-r border-black/25 pr-3 mr-3">
                  Hire for your company
                </p>
                <span className="text-black mx-1 font-bold">FREE</span>
              </div>
            </Link>
            <Link
              to="/jobs/all"
              className=" text-black  bg-[#FBDFDF] hover:bg-[#fbcece] rounded px-4 py-2 mt-4 w-full hover:bg-tertiary-100  text-center"
            >
              <p>I'm Looking for a Job </p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
