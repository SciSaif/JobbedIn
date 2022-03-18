import React from "react";
import { useEffect, useState } from "react";
import { reset, getJobs, emptyJobs } from "../features/jobs/jobsSlice";
import {
  reset as resetUser,
  emptyUser,
  getUserById,
  updateProfilePic,
} from "../features/user/userSlice";
import {
  reset as resetCompany,
  getCompanies,
  emptyCompanies,
} from "../features/companies/companiesSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import profileImg from "../components/assets/userPic.jpg";

import { Image, Transformation } from "cloudinary-react";
import ProfilePicEdit from "../components/ProfilePicEdit";
import SpinnerC from "../components/SpinnerC";
import { BiEditAlt } from "react-icons/bi";
import schoolLogo from "../components/assets/school.png";
import companyLogo from "../components/assets/companyLogo.png";

function Candidate() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCandidate, setisCandidate] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [companiesShow, setCompaniesShow] = useState(false);

  const [photoState, setPhotoState] = useState(false);

  const { user: loggedInUser } = useSelector((state) => state.auth);
  const {
    user,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    isLoading: isLoadingUser,
    onAction,
  } = useSelector((state) => state.user);
  const { name, email, mobileNumber } = user;

  const { jobs, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.jobs
  );
  const {
    companies,
    isLoading: isLoadingCompany,
    isSuccess: isSuccessCompany,
    isError: isErrorCompany,
    message: messageCompany,
    onAction: onActionCompany,
  } = useSelector((state) => state.companies);

  useEffect(() => {
    if (isError) {
      setInputMessage(message);
      dispatch(reset());
    }

    if (isSuccess) {
      dispatch(reset());
    }

    if (isErrorUser && onAction !== "drawer") {
      dispatch(resetUser());
      enqueueSnackbar("User not found", {
        variant: "error",
      });
      navigate("/");
    }

    if (isSuccessUser) {
      dispatch(resetUser());
    }

    if (isErrorCompany) {
      dispatch(resetCompany());
    }

    if (isSuccessCompany) {
      dispatch(resetCompany());
    }
    if (isSuccessCompany && onActionCompany === "delete") {
      dispatch(resetCompany());
      dispatch(getJobs(user._id));
    }

    if (isSuccessUser && onAction === "editPic") {
      enqueueSnackbar("Updated profile picture successfully!", {
        variant: "success",
      });
    }
    if (isErrorUser && onAction === "editPic") {
      enqueueSnackbar("Failed to update profile picture!", {
        variant: "error",
      });
    }
  }, [
    isSuccess,
    isError,
    isSuccessUser,
    isErrorUser,
    isSuccessCompany,
    isErrorCompany,
    onActionCompany,
    messageCompany,
    onAction,
  ]);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getJobs(id));
    dispatch(getCompanies(id));
    if (loggedInUser && loggedInUser._id === id) {
      setisCandidate(true);
    }

    return () => {
      setisCandidate(false);
      dispatch(resetUser());
      dispatch(emptyUser());
      dispatch(emptyJobs());
      dispatch(emptyCompanies());
    };
  }, [setisCandidate, dispatch, resetUser]);

  const toggleCompany = () => {
    setCompaniesShow(!companiesShow);
  };

  const togglePhoto = () => {
    setPhotoState(!photoState);
  };

  const deletePhoto = () => {
    dispatch(updateProfilePic({ id, previewSource: "" }));
  };

  const changePhoto = (previewSource) => {
    dispatch(updateProfilePic({ id, previewSource }));
  };
  return (
    <div className="stripes max-w-screen  min-h-screen shadow-lg text-white flex flex-col  lg:w-1/2 lg:m-auto ">
      {photoState && (
        <ProfilePicEdit
          pic={user.profilePic}
          togglePhoto={() => togglePhoto()}
          isUser={isCandidate}
          defaultPic={profileImg}
          deletePhoto={() => deletePhoto()}
          changePhoto={(previewSource) => changePhoto(previewSource)}
        />
      )}

      <section className="w-full min-h-[200px] ">
        <div className="w-full  min-h-[200px] rounded-t-xl md:rounded-xl border-t-2 border-white mt-[100px]  relative bg-secondaryL text-black pt-[60px] pb-5 px-5">
          <div
            className="w-[100px] h-[100px] border-white border-2 rounded-full absolute top-[-50px] left-1/2 translate-x-[-50px] z-7  overflow-hidden md:cursor-pointer"
            onClick={togglePhoto}
          >
            {isLoadingUser && onAction === "editPic" && <SpinnerC />}

            {user.profilePic ? (
              <Image cloudName="duqfwygaf" publicId={user.profilePic}>
                <Transformation
                  gravity="face"
                  height="150"
                  width="150"
                  crop="fill"
                />
              </Image>
            ) : (
              <img src={profileImg} alt="profilepic" />
            )}
          </div>
          <div className="mx-auto text-center font-bold mb-3 text-3xl">
            {name}
          </div>
          <p className="mb-2">
            {true ? (
              <>
                MERN Stack developer and competitive programmer | 4 stars on
                codechef ⭐⭐⭐⭐
              </>
            ) : (
              <div className="flex items-center hover:cursor-pointer">
                {false ? (
                  <>
                    <p className="mr-2">Add a bio</p> <BiEditAlt size="20px" />
                  </>
                ) : (
                  <p className="text-black/75 italic">Bio not available</p>
                )}
              </div>
            )}
          </p>

          <div>
            <p>
              <span className="font-bold">Email:</span> {email}
            </p>
            {mobileNumber ? (
              <p>
                <span className="font-bold">Mobile number:</span> {mobileNumber}
              </p>
            ) : (
              <>{}</>
            )}
          </div>
        </div>
      </section>
      <section className="w-full  mt-2 md:rounded-xl overflow-hidden  bg-secondaryL">
        <div className="w-full border-t-2 border-white relative  text-black py-5 px-5 ">
          <div className="flex justify-between  mb-3">
            <h2 className="font-bold text-2xl text-textBlack">About</h2>

            {true && (
              <div className="hover:cursor-pointer">
                {" "}
                <BiEditAlt size="30px" />{" "}
              </div>
            )}
          </div>
          <div>
            {true ? (
              <p>
                {" "}
                A passionate Coder who loves to solve problems, and build cool
                stuff ;) I am currently learning MERN Stack I am also an active
                competitive programmer
              </p>
            ) : (
              <>
                {true ? (
                  <>Describe yourself </>
                ) : (
                  <p className="text-black/75 italic">
                    About section not available
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <section className="w-full  mt-2 md:rounded-xl overflow-hidden  bg-secondaryL">
        <div className="w-full border-t-2 border-white relative  text-black py-5 px-5 ">
          <div className="flex justify-between mb-5">
            <h2 className="font-bold text-2xl text-textBlack">Experience</h2>

            {true && (
              <div className="hover:cursor-pointer">
                {" "}
                <BiEditAlt size="30px" />{" "}
              </div>
            )}
          </div>
          <div>
            {true ? (
              <div className="flex flex-row">
                <div className="w-[50px] h-[50px]">
                  {user.profilePic ? (
                    <Image cloudName="duqfwygaf" publicId={user.profilePic}>
                      <Transformation
                        gravity="face"
                        height="150"
                        width="150"
                        crop="fill"
                      />
                    </Image>
                  ) : (
                    <img src={companyLogo} alt="profilepic" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className=" font-semibold text-xl">
                    Google Developer Students Club
                  </h3>
                  <p>1 yr 4 mos</p>
                  <p>New Delhi, Delhi, India</p>
                </div>
              </div>
            ) : (
              <>
                {false ? (
                  <>Add an experience </>
                ) : (
                  <p className="text-black/75 italic">
                    Experience details not available
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="w-full  mt-2 md:rounded-xl overflow-hidden  bg-secondaryL ">
        <div className="w-full border-t-2 border-white relative  text-black py-5 px-5 ">
          <div className="flex justify-between mb-5">
            <h2 className="font-bold text-2xl text-textBlack">Education</h2>

            {true && (
              <div className="hover:cursor-pointer">
                {" "}
                <BiEditAlt size="30px" />{" "}
              </div>
            )}
          </div>
          <div>
            {true ? (
              <>
                <div className="flex flex-col border-b border-black/25 pb-3 mb-4">
                  <div className="flex flex-row">
                    <div className=" w-[50px] h-[50px]">
                      <img src={schoolLogo} alt="school Logo" />
                    </div>
                    <div className="ml-3">
                      <h3 className=" font-semibold text-xl">
                        Guru Gobind Singh Indraprastha University
                      </h3>
                      <p className="mt-0">New Delhi, Delhi, India</p>
                      <div className="font-semibold">
                        Bachelor Of Technology - B.Tech{" "}
                      </div>
                      <p className="mt-0">2020 - 2024</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row mb-4">
                    <div className=" w-[50px] h-[50px]">
                      <img src={schoolLogo} alt="school Logo" />
                    </div>
                    <div className="ml-3">
                      <h3 className=" font-semibold text-xl">
                        Good Samaritan School
                      </h3>
                      <p className="timeline-address">
                        Jasola, New Delhi, Delhi, India
                      </p>
                    </div>
                  </div>
                  <div className="timeline-section ">
                    <div className="font-semibold text-lg ">Class 10th </div>
                    <p className="timeline-address">2016 - 2017</p>
                  </div>
                  <div className="timeline-section">
                    <div className="font-semibold text-lg">Class 12th </div>
                    <p className="timeline-address">2018 - 2019</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {false ? (
                  <>Add your education details </>
                ) : (
                  <p className="text-black/75 italic">
                    Education details not available
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="w-full  mt-2 md:rounded-xl overflow-hidden  bg-secondaryL mb-5">
        <div className="w-full border-t-2 border-white relative  text-black py-5 px-5 ">
          <div className="flex justify-between mb-5">
            <h2 className="font-bold text-2xl text-textBlack">Skills</h2>

            {true && (
              <div className="hover:cursor-pointer">
                {" "}
                <BiEditAlt size="30px" />{" "}
              </div>
            )}
          </div>
          <div>
            {true ? (
              <div className="w-full flex flex-wrap ">
                <p className="px-5 py-2 mr-2 mb-3 flex items-center bg-midnight/50 font-bold text-lg text-white rounded-full">
                  C++
                </p>
                <p className="px-5 py-2 mr-2 mb-3 flex items-center bg-midnight/50 font-bold text-lg text-white rounded-full">
                  Javascript
                </p>
                <p className="px-5 py-2 mr-2 mb-3 flex items-center bg-midnight/50 font-bold text-lg text-white rounded-full">
                  Java
                </p>
                <p className="px-5 py-2 mr-2 mb-3 flex items-center bg-midnight/50 font-bold text-lg text-white rounded-full">
                  HTML
                </p>
                <p className="px-5 py-2 mr-2 mb-3 flex items-center bg-midnight/50 font-bold text-lg text-white rounded-full">
                  CSS
                </p>
                <p className="px-5 py-2 mr-2 mb-3 flex items-center bg-midnight/50 font-bold text-lg text-white rounded-full">
                  React
                </p>
                <p className="px-5 py-2 mr-2 mb-3 flex items-center bg-midnight/50 font-bold text-lg text-white rounded-full">
                  Express
                </p>
                <p className="px-5 py-2 mr-2 mb-3 flex items-center bg-midnight/50 font-bold text-lg text-white rounded-full">
                  Node.js
                </p>
                <p className="px-5 py-2 mr-2 mb-3 flex items-center bg-midnight/50 font-bold text-lg text-white rounded-full">
                  MongoDb
                </p>
              </div>
            ) : (
              <>
                {false ? (
                  <>Add your skills </>
                ) : (
                  <p className="text-black/75 italic">Skills not available</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Candidate;
