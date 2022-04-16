import React from "react";
import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { Image, Transformation } from "cloudinary-react";

import companyLogo from "../assets/companyLogo.png";

function Experience({ company, editMode, editExperience }) {
  console.log(company?.company);
  return (
    <div className="flex flex-row justify-between py-3 border-b text-textBlack  border-black/20 forLastChild">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className=" w-[50px] h-[50px]">
            {company.company ? (
              <Image cloudName="duqfwygaf" publicId={company.company.logo}>
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
          <div className="ml-3 ">
            {company.roles.length === 1 ? (
              <div className="">
                <div className="font-bold ">{company.roles[0].title}</div>
                <div className="text-sm">
                  {company.companyName} · {company.roles[0].employmentType}
                </div>
                <div className="text-black/75 text-sm">
                  {company.roles[0].startDate.month.substring(0, 3)}{" "}
                  {company.roles[0].startDate.year} -{" "}
                  {company.roles[0].endDate.present
                    ? "Present"
                    : company.roles[0].endDate.month.substring(0, 3) +
                      " " +
                      company.roles[0].endDate.year}
                </div>
                <div className="text-black/75 text-sm">
                  {company.roles[0].location}
                </div>
              </div>
            ) : (
              <div className="">
                <div className="font-bold ">{company.companyName}</div>
                <div>1 yr 5 mos</div>
              </div>
            )}
          </div>
        </div>

        {company?.roles?.length !== 1 && (
          <div className="mt-3">
            {company.roles?.map((r) => (
              <div className="timeline-section" key={r.title}>
                <span className="timelineDot"></span>
                <div className="font-bold">{r.title} </div>
                <div className="text-sm">{company.roles[0].employmentType}</div>
                <div className="text-black/75 text-sm">
                  {company.roles[0].startDate.month.substring(0, 3)}{" "}
                  {company.roles[0].startDate.year} -{" "}
                  {company.roles[0].endDate.present
                    ? "Present"
                    : company.roles[0].endDate.month.substring(0, 3) +
                      " " +
                      company.roles[0].endDate.year}
                </div>
                <div className="text-black/75 text-sm">
                  {company.roles[0].location}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {editMode && (
        <div onClick={() => editExperience(company)} className="cursor-pointer">
          <BiEditAlt size="25px" />
        </div>
      )}
    </div>
  );
}

export default Experience;
