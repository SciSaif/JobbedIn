import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerEmployer, reset } from "../features/auth/authSlice";
import InputError from "../components/InputError";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Spinner from "../components/Spinner";

function EmailSent() {
  const { userEmail } = useParams();
  return (
    <div className=" flex justify-center items-center align-bottom min-w-screen min-h-screen shadow-lg ">
      <main className="flex sprinkle flex-col rounded-lg mb-4 overflow-hidden">
        <div className="p-5 bg-secondary flex flex-col justify-center items-center text-center">
          <div className="font-bold text-3xl flex flex-col mb-5">
            Account Confirmation
          </div>
          <div>
            An email with your account confirmation link has been sent to your
            email: <b>{userEmail}</b>
          </div>
          <div>Check your email and come back to proceed!</div>
          <div className="text-xs mt-3 text-black/75">
            Sometimes it may take upto 5 mins to deliver the mail :|
          </div>
          <Link
            to={`/login-employer/${userEmail}`}
            className="px-8 py-2 mt-6  rounded-full bg-accent text-white text-lg md:hover:bg-accentD"
          >
            Proceed
          </Link>
        </div>
      </main>
    </div>
  );
}

export default EmailSent;
