import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../features/companies/companiesSlice";
import logo from "../components/assets/amazonLogo.jfif";

function CompanyCard({ name, industry, address, id, isEmployer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dropdownContainerRef = useRef(null);

  const toggleDropdown = (e) => {
    dropdownRef.current.classList.toggle("hidden");
  };

  const onClick = () => {
    navigate(`/company/${id}`);
  };

  const onDelete = () => {
    dispatch(deleteCompany(id));
  };

  const onEdit = () => {
    navigate(`/edit-company/${id}`);
  };

  return (
    <div className="border-l-2 border-secondaryD hover:border-accent border-b-2 border-b-black/75 pl-4 p-2   flex flex-row justify-between items-center cursor-pointer relative">
      <div className="flex flex-row" onClick={onClick}>
        <div className="min-w-[50px] ">
          <img src={logo} alt="logo" className="w-[50px]" />
        </div>
        <div className="text-black text-lg font-bold ml-3 ">
          {name}
          <p className="text-black/75  text-sm">
            {industry} | {address}
          </p>
        </div>
      </div>

      {/* Dropdown menu */}
      {isEmployer ? (
        <>
          <div onClick={toggleDropdown} ref={dropdownContainerRef}>
            <div
              className="mx-2 p-1 mb-2   cursor-pointer hover:rounded-full  hover:bg-black/75 h-fit text-black hover:text-white "
              id="dropdownInformationButton"
              data-dropdown-toggle="dropdownInformation"
              type="button"
              // onClick={toggleDropdown}
            >
              <BsThreeDotsVertical />
            </div>
            <div
              className="hidden  w-[120px] bg-black/75 text-[#DCEBFF] rounded-xl  absolute right-10 top-0 -translate-y-3 flex flex-col  p-1  select-none"
              ref={dropdownRef}
            >
              <button
                className="px-3 py-2 hover:bg-black/25  rounded-t-xl border-b-2 border-white/25"
                onClick={onDelete}
              >
                Delete
              </button>
              <button
                className="px-3 py-2 hover:bg-black/25  rounded-b-xl"
                onClick={onEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default CompanyCard;
