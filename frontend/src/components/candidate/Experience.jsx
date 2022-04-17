import React from "react";
import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { Image, Transformation } from "cloudinary-react";

import companyLogo from "../assets/companyLogo.png";

function Experience({ experience, editMode, editExperience }) {
  return (
    <div className="flex flex-row justify-between py-3 border-b text-textBlack  border-black/20 forLastChild">
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <div className=" w-[50px] h-[50px]">
            {experience.company ? (
              <Image cloudName="duqfwygaf" publicId={experience.company.logo}>
                <Transformation
                  gravity="face"
                  height="50"
                  width="50"
                  crop="fill"
                />
              </Image>
            ) : (
              <img src={companyLogo} alt="" />
            )}
            {/* <img src={companyLogo} alt="company Logo" /> */}
          </div>
          <div className="ml-3 w-full">
            {experience.roles.length === 1 ? (
              <div className="flex flex-row justify-between">
                <div className="">
                  <div className="font-bold ">{experience.roles[0].title}</div>
                  <div className="text-sm">
                    {experience.companyName} ·{" "}
                    {experience.roles[0].employmentType}
                  </div>
                  <div className="text-black/75 text-sm">
                    {experience.roles[0].startDate.month.substring(0, 3)}{" "}
                    {experience.roles[0].startDate.year} -{" "}
                    {experience.roles[0].endDate.present
                      ? "Present"
                      : experience.roles[0].endDate.month.substring(0, 3) +
                        " " +
                        experience.roles[0].endDate.year}
                  </div>
                  <div className="text-black/75 text-sm">
                    {experience.roles[0].location}
                  </div>
                </div>
                {editMode && (
                  <div
                    onClick={() =>
                      editExperience({
                        company: experience.company,
                        companyName: experience.companyName,
                        role: experience.roles[0],
                        id: experience._id,
                      })
                    }
                    className="cursor-pointer "
                  >
                    <BiEditAlt size="25px" />
                  </div>
                )}
              </div>
            ) : (
              <div className="">
                <div className="font-bold ">{experience.companyName}</div>
                <div>1 yr 5 mos</div>
              </div>
            )}
          </div>
        </div>

        {experience?.roles?.length !== 1 && (
          <div className="mt-3 w-full">
            {experience.roles?.map((r) => (
              <div className="timeline-section " key={r.title}>
                <span className="timelineDot"></span>
                <div className="flex flex-row justify-between">
                  <div>
                    <div className="font-bold">{r.title} </div>
                    <div className="text-sm">
                      {experience.roles[0].employmentType}
                    </div>
                    <div className="text-black/75 text-sm">
                      {experience.roles[0].startDate.month.substring(0, 3)}{" "}
                      {experience.roles[0].startDate.year} -{" "}
                      {experience.roles[0].endDate.present
                        ? "Present"
                        : experience.roles[0].endDate.month.substring(0, 3) +
                          " " +
                          experience.roles[0].endDate.year}
                    </div>
                    <div className="text-black/75 text-sm">
                      {experience.roles[0].location}
                    </div>
                  </div>
                  {editMode && (
                    <div
                      onClick={() =>
                        editExperience({
                          company: experience.company,
                          companyName: experience.companyName,
                          role: r,
                          id: experience._id,
                        })
                      }
                      className="cursor-pointer "
                    >
                      <BiEditAlt size="25px" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Experience;
