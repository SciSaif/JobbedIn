import React from "react";
import { useEffect, useState } from "react";
import {
  reset as resetUser,
  emptyUser,
  getUserById,
  updateProfilePic,
} from "../features/user/userSlice";
import {
  updateCandidate,
  reset as resetCandidate,
  emptyCandidate,
} from "../features/candidate/candidateSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import profileImg from "../components/assets/userPic.jpg";

import { Image, Transformation } from "cloudinary-react";
import ProfilePicEdit from "../components/ProfilePicEdit";
import SpinnerC from "../components/SpinnerC";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import Experience from "../components/candidate/Experience";
import Education from "../components/candidate/Education";
import AboutEdit from "../components/candidate/modals/AboutEdit";
import ExperienceEdit from "../components/candidate/modals/ExperienceEdit";
import EducationEdit from "../components/candidate/modals/EducationEdit";
import SkillEdit from "../components/candidate/modals/SkillAdd";
import BioEdit from "../components/candidate/modals/BioEdit";

function Candidate() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCandidate, setisCandidate] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const [photoState, setPhotoState] = useState(false);
  const [aboutEdit, setAboutEdit] = useState(false);
  const [bioEdit, setBioEdit] = useState(false);

  const [experienceEdit, setExperienceEdit] = useState(false);
  const [experienceEditMode, setExperienceEditMode] = useState(false);
  const [type, setType] = useState("");
  const [experienceData, setExperienceData] = useState("");

  const [educationEdit, setEducationEdit] = useState(false);
  const [educationEditMode, setEducationEditMode] = useState(false);
  const [educationData, setEducationData] = useState("");

  const [skillEdit, setSkillEdit] = useState(false);
  const [skillEditMode, setSkillEditMode] = useState(false);
  const [skillsToRemove, setSkillsToRemove] = useState([]);

  const { user: loggedInUser } = useSelector((state) => state.auth);
  const {
    isError: isErrorCandidate,
    isSuccess: isSuccessCandidate,
    onAction: onActionCandidate,
  } = useSelector((state) => state.candidates);

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
    if (isSuccessCandidate && onActionCandidate === "update candidate") {
      enqueueSnackbar("Update successfull!", {
        variant: "success",
      });
      closeAllModals();
      dispatch(getUserById(id));
      dispatch(resetCandidate());
    }
    if (isErrorCandidate && onActionCandidate === "updateCandidate") {
      enqueueSnackbar("Failed to update!", {
        variant: "error",
      });
      closeAllModals();
      dispatch(resetCandidate());
    }
  }, [
    isErrorCandidate,
    isErrorUser,
    isSuccessCandidate,
    isSuccessUser,
    onActionCandidate,
  ]);

  const closeAllModals = () => {
    setAboutEdit(false);
    setPhotoState(false);
    setExperienceEdit(false);
    setExperienceData("");
    setSkillEdit(false);
    setSkillEditMode(false);
    setSkillsToRemove([]);
    setEducationEdit(false);
    setEducationEditMode(false);
    setEducationData("");
    setBioEdit(false);
  };

  const candidateUpdate = (data) => {
    dispatch(updateCandidate(data));
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

  const toggleSkillToRemove = (skill) => {
    if (skillsToRemove.includes(skill)) {
      setSkillsToRemove(
        skillsToRemove.filter((skillC) => {
          return skillC !== skill;
        })
      );
    } else {
      // add the skill back
      setSkillsToRemove((prevState) => [...prevState, skill]);
    }
  };
  return (
    <div className="stripes max-w-screen  min-h-screen shadow-lg text-white flex flex-col  lg:w-1/2 lg:m-auto ">
      <section className="w-full min-h-[200px] ">
        <div className="w-full  min-h-[200px] rounded-t-xl md:rounded-xl border-t-2 border-white mt-[100px]  relative bg-secondaryL text-black pt-[60px] pb-5 px-5">
          <div
            className="w-[100px] h-[100px] border-white border-2 rounded-full absolute top-[-50px] left-1/2 translate-x-[-50px] z-7  overflow-hidden md:cursor-pointer"
            onClick={togglePhoto}
          >
            {isLoadingUser && onAction === "editPic" && <SpinnerC />}

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
          <div className="mb-2 flex flex-row justify-between">
            {user?.candidate?.bio ? (
              <>{user?.candidate?.bio}</>
            ) : (
              <div className="flex flex-row justify-between items-center hover:cursor-pointer ">
                {isCandidate ? (
                  <>
                    <p className="mr-2">Add a bio</p>
                  </>
                ) : (
                  <p className="text-black/75 italic">Bio not available</p>
                )}
              </div>
            )}
            {isCandidate && (
              <div
                className="hover:cursor-pointer"
                onClick={() => setBioEdit(true)}
              >
                {" "}
                <BiEditAlt size="25px" />{" "}
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
              <div
                className="hover:cursor-pointer"
                onClick={() => setAboutEdit(true)}
              >
                {" "}
                <BiEditAlt size="25px" />{" "}
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
      <section className="w-full  mt-2 md:rounded-xl overflow-hidden bg-secondaryL">
        <div className="w-full border-t-2 border-white relative  text-black py-5 px-5 ">
          <div className="flex justify-between mb-3">
            <h2 className="font-bold text-2xl text-textBlack">Experience</h2>

            {isCandidate && (
              <div className=" flex flex-row items-center justify-between min-w-[65px]">
                <div
                  onClick={() => {
                    setExperienceEdit(true);
                    setType("addExperience");
                  }}
                  className="hover:cursor-pointer"
                >
                  <AiOutlinePlus size="25px" />
                </div>
                {experienceEditMode ? (
                  <div
                    onClick={() => {
                      setExperienceEditMode(false);
                      setExperienceData("");
                    }}
                    className="hover:cursor-pointer"
                  >
                    <ImCross />
                  </div>
                ) : (
                  <div
                    onClick={() => setExperienceEditMode(true)}
                    className="hover:cursor-pointer"
                  >
                    <BiEditAlt size="25px" />{" "}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="experienceBox">
            {user?.candidate?.experience?.length > 0 ? (
              user.candidate.experience.map((experience) => (
                <Experience
                  experience={experience}
                  key={experience._id}
                  editMode={experienceEditMode}
                  editExperience={(experienceD) => {
                    setType("editExperience");
                    setExperienceEdit(true);
                    setExperienceData(experienceD);
                  }}
                />
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
          <div className="flex justify-between mb-3">
            <h2 className="font-bold text-2xl text-textBlack">Education</h2>

            {isCandidate && (
              <div className=" flex flex-row items-center justify-between min-w-[65px]">
                <div
                  onClick={() => {
                    setEducationEdit(true);
                    setType("addEducation");
                  }}
                  className="hover:cursor-pointer"
                >
                  <AiOutlinePlus size="25px" />
                </div>
                {educationEditMode ? (
                  <div
                    onClick={() => {
                      setEducationEditMode(false);
                      setEducationData("");
                    }}
                    className="hover:cursor-pointer"
                  >
                    <ImCross />
                  </div>
                ) : (
                  <div
                    onClick={() => setEducationEditMode(true)}
                    className="hover:cursor-pointer"
                  >
                    <BiEditAlt size="25px" />{" "}
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            {user?.candidate?.education?.length > 0 ? (
              user.candidate.education.map((school) => (
                <Education
                  school={school}
                  key={school._id}
                  editMode={educationEditMode}
                  editEducation={(school) => {
                    setType("editEducation");
                    setEducationEdit(true);
                    setEducationData(school);
                  }}
                />
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
      <section className="w-full  mt-2 md:rounded-xl overflow-hidden  bg-secondaryL pb-7">
        <div className="w-full border-t-2 border-white relative  text-black py-5 px-5 ">
          <div className="flex justify-between mb-3">
            <h2 className="font-bold text-2xl text-textBlack">Skills</h2>

            {isCandidate && (
              <div className=" flex flex-row items-center justify-between min-w-[65px]">
                <div
                  onClick={() => {
                    setSkillEdit(true);
                  }}
                  className="hover:cursor-pointer"
                >
                  <AiOutlinePlus size="25px" />
                </div>
                {skillEditMode ? (
                  <div
                    onClick={() => {
                      setSkillEditMode(false);
                      setSkillsToRemove([]);
                    }}
                    className="hover:cursor-pointer"
                  >
                    <ImCross />
                  </div>
                ) : (
                  <div
                    onClick={() => setSkillEditMode(true)}
                    className="hover:cursor-pointer"
                  >
                    <BiEditAlt size="25px" />{" "}
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            {skillEditMode && (
              <div className="w-full flex flex-row justify-between  pl-2 mb-3 bg-accent rounded-full">
                <div className="text font-bold my-3">
                  Select the skills you want to remove
                </div>
                <button
                  className="bg-[#b60000] text-white px-2 cursor-pointer rounded-r-full"
                  onClick={() =>
                    candidateUpdate({
                      type: "skillsRemove",
                      data: skillsToRemove,
                    })
                  }
                >
                  Remove
                </button>
              </div>
            )}
            {user?.candidate?.skills?.length > 0 ? (
              <div className="w-full flex flex-wrap ">
                {user.candidate.skills.map((skill, index) => (
                  <p
                    className={`px-5 py-2 mr-2 mb-3 flex cursor-pointer items-center  font-bold text-lg text-white rounded-full  ${
                      skillsToRemove.includes(skill)
                        ? "bg-accentD"
                        : "bg-midnight"
                    }`}
                    key={index}
                    onClick={() => {
                      if (skillEditMode) {
                        toggleSkillToRemove(skill);
                      }
                    }}
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

      {/* {isCandidate && (
        <section className="w-full  mt-2 md:rounded-xl overflow-hidden  bg-secondaryL  text-textBlack px-5 pt-7 pb-10">
          <div className="font-semibold">You have applied to 3 Jobs</div>
          <Link to="/" className="underline text-[#3db4fe]">
            List of jobs that you have applied to{" "}
          </Link>
        </section>
      )} */}

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

      {aboutEdit && (
        <AboutEdit
          about={user?.candidate?.about}
          toggle={() => setAboutEdit(!aboutEdit)}
          updateCandidate={(data) => candidateUpdate(data)}
        />
      )}
      {bioEdit && (
        <BioEdit
          bio={user?.candidate?.bio}
          toggle={() => setBioEdit(!bioEdit)}
          updateCandidate={(data) => candidateUpdate(data)}
        />
      )}

      {experienceEdit && (
        <ExperienceEdit
          experiences={user?.candidate?.experience}
          experience={experienceData}
          toggle={() => {
            setExperienceEdit(!experienceEdit);
            if (experienceEdit === true) {
              setExperienceData("");
            }
          }}
          updateCandidate={(data) => candidateUpdate(data)}
          type={type}
        />
      )}

      {educationEdit && (
        <EducationEdit
          education={educationData}
          toggle={() => {
            setEducationEdit(!educationEdit);
            if (educationEdit === true) {
              setEducationData("");
            }
          }}
          updateCandidate={(data) => candidateUpdate(data)}
          type={type}
        />
      )}

      {skillEdit && (
        <SkillEdit
          toggle={() => {
            setSkillEdit(!skillEdit);
          }}
          updateCandidate={(data) => candidateUpdate(data)}
        />
      )}
    </div>
  );
}

export default Candidate;
