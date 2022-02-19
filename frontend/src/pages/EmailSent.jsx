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
          <Link
            to={`/login-employer/${userEmail}`}
            className="px-8 py-2 mt-5  rounded-full bg-accent text-white text-lg md:hover:bg-accentD"
          >
            Proceed
          </Link>
        </div>
      </main>
    </div>
  );
}

export default EmailSent;
