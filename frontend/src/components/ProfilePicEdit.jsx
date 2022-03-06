import React from "react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCompanyLogo } from "../features/companies/companiesSlice";

import { Image } from "cloudinary-react";
import companyLogo from "../components/assets/companyLogo.png";
import SpinnerC from "./SpinnerC";

function ProfilePicEdit({ logo, togglePhoto, isUser }) {
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const dispatch = useDispatch();

  const onChangeClick = () => {
    fileInputRef.current.click();
  };

  const onChange = () => {
    dispatch(updateCompanyLogo({ id, previewSource }));
    togglePhoto();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onDelete = () => {
    dispatch(updateCompanyLogo({ id, previewSource: "" }));
    togglePhoto();
  };

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
            {previewSource && (
              <>
                <img src={previewSource} alt="img preview" />
              </>
            )}
            {!previewSource && logo ? (
              <Image
                cloudName="duqfwygaf"
                publicId={logo}
                crop="fill"
                width="500"
              />
            ) : (
              <> {!previewSource && <img src={companyLogo} alt="" />}</>
            )}
          </div>
        </div>

        {isUser && (
          <div className=" mt-5 border-t-white/50 border flex justify-around">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileInputChange}
              value={fileInputState}
            />
            <button
              className="text-white/75 px-4 py-5 text-lg font-semibold md:hover:bg-[#061222] md:hover:rounded-lg"
              onClick={onChangeClick}
            >
              {previewSource ? <>Choose</> : <>Change pic</>}
            </button>
            {!previewSource ? (
              <button
                className="text-white/75 px-4 py-5 text-lg font-semibold md:hover:bg-[#061222] md:hover:rounded-lg"
                onClick={onDelete}
              >
                Delete
              </button>
            ) : (
              <>
                <button
                  className="text-white/75 px-4 py-5 text-lg font-semibold md:hover:bg-[#061222] md:hover:rounded-lg"
                  onClick={onChange}
                >
                  Change
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePicEdit;
