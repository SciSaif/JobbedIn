import React from "react";
import { useEffect, useState } from "react";
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
import Experience from "../components/candidate/Experience";
import Education from "../components/candidate/Education";

function Candidate() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCandidate, setisCandidate] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const [photoState, setPhotoState] = useState(false);

  const { user: loggedInUser } = useSelector((state) => state.auth);

  const {
    user,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    isLoading: isLoadingUser,
    onAction,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserById(id));
    if (loggedInUser && loggedInUser._id === id) {
      setisCandidate(true);
    }

    return () => {
      setisCandidate(false);
      dispatch(resetUser());
      dispatch(emptyUser());
      dispatch(emptyCompanies());
    };
  }, [setisCandidate, dispatch, resetUser]);

  useEffect(() => {
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
  }, []);

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
          pic={user?.profilePic}
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
            {/* {isLoadingUser && onAction === "editPic" && <SpinnerC />} */}

            {user?.profilePic ? (
              <Image cloudName="duqfwygaf" publicId={user?.profilePic}>
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
            {user?.name}
          </div>
          <div className="mb-2">
            {user?.candidate?.bio ? (
              <>{user?.candidate?.bio}</>
            ) : (
              <div className="flex items-center hover:cursor-pointer">
                {isCandidate ? (
                  <>
                    <p className="mr-2">Add a bio</p> <BiEditAlt size="20px" />
                  </>
                ) : (
                  <p className="text-black/75 italic">Bio not available</p>
                )}
              </div>
            )}
          </div>

          <div>
            <p>
              <span className="font-bold">Email:</span> {user?.email}
            </p>
            {user?.mobileNumber ? (
              <p>
                <span className="font-bold">Mobile number:</span>{" "}
                {user?.mobileNumber}
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

            {isCandidate && (
              <div className="hover:cursor-pointer">
                {" "}
                <BiEditAlt size="30px" />{" "}
              </div>
            )}
          </div>
          <div>
            {user?.candidate?.about ? (
              <p> {user?.candidate?.about}</p>
            ) : (
              <>
                {isCandidate ? (
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

            {isCandidate && (
              <div className="hover:cursor-pointer">
                {" "}
                <BiEditAlt size="30px" />{" "}
              </div>
            )}
          </div>
          <div>
            {user?.candidate?.experience ? (
              user.candidate.experience.map((company) => (
                <Experience company={company} key={company._id} />
              ))
            ) : (
              <>
                {isCandidate ? (
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

            {isCandidate && (
              <div className="hover:cursor-pointer">
                {" "}
                <BiEditAlt size="30px" />{" "}
              </div>
            )}
          </div>
          <div>
            {user?.candidate?.education ? (
              user.candidate.education.map((school) => (
                <Education school={school} key={school._id} />
              ))
            ) : (
              <>
                {isCandidate ? (
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

            {isCandidate && (
              <div className="hover:cursor-pointer">
                {" "}
                <BiEditAlt size="30px" />{" "}
              </div>
            )}
          </div>
          <div>
            {user?.candidate?.skills ? (
              <div className="w-full flex flex-wrap ">
                {user.candidate.skills.map((skill, index) => (
                  <p
                    className="px-5 py-2 mr-2 mb-3 flex items-center bg-midnight/50 font-bold text-lg text-white rounded-full"
                    key={index}
                  >
                    {skill}
                  </p>
                ))}
              </div>
            ) : (
              <>
                {isCandidate ? (
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
