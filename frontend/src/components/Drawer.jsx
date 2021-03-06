import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, reset } from "../features/auth/authSlice";
import { toggleDrawer } from "../features/other/otherSlice";

import { FaAngleRight } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";

import Settings from "./Settings";

function Drawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { drawerState } = useSelector((state) => state.other);

  const onLogout = () => {
    drawerToggle();
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/");
  };

  const drawerToggle = (e) => {
    dispatch(toggleDrawer());
  };

  return (
    <div
      className={`${
        drawerState && "hidden"
      } fixed top-0 right-0 w-screen h-screen bg-black/50 z-10 overflow-y-scroll `}
    >
      {/* to click away the drawer  */}
      <div
        className="fixed top-0 left-0 w-1/3 xl:w-2/3 h-screen z-11"
        onClick={drawerToggle}
      ></div>
      <div className="absolute top-0 right-0 w-2/3 xl:w-1/3 h-full bg-primary z-11 ">
        <div
          className="mt-2 ml-2 rounded-full bg-secondary/50 w-fit p-2 cursor-pointer"
          onClick={drawerToggle}
        >
          <FaAngleRight size="30px" />
        </div>

        <Link
          to="/"
          className="w-full flex justify-center my-3 "
          onClick={drawerToggle}
        >
          <AiOutlineHome color="white" size="40px" />
        </Link>

        {user ? (
          <>
            <div className=" w-full bg-black/25 text-white py-4 px-4 rounded-t-xl">
              <h1 className="font-bold">Welcome {user.name}</h1>

              <div className="flex flex-row">
                <button
                  className="flex-1 text-xl text-center shadow bg-secondary rounded-lg py-2 hover:bg-secondaryD focus:ring-4 focus:ring-secondary"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
              <div className="flex flex-row mt-2">
                <Link
                  to={`/${
                    user.designation === "employer" ? "employer" : "candidate"
                  }/${user._id}`}
                  className="flex-1 text-xl text-center shadow bg-accent rounded-lg py-2 hover:bg-accentD focus:ring-4 focus:ring-secondary"
                  onClick={drawerToggle}
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
            <Settings
              closeDrawer={() => {
                drawerToggle();
              }}
            />
          </>
        ) : (
          <>
            <div className=" w-full bg-black/25 text-white py-4 px-4 rounded-t-xl mb-1">
              <h1 className="font-bold mb-1">Want to hire? </h1>

              <div className="flex flex-row">
                <Link
                  to="/login-user?desig=employer"
                  className="flex-1 text-xl  text-center shadow bg-secondary rounded-l-lg py-2 hover:bg-secondaryD focus:ring-4 focus:ring-secondary"
                  onClick={drawerToggle}
                >
                  Login
                </Link>
                <Link
                  to="/register-user?desig=employer"
                  className="flex-1 text-xl text-center shadow bg-accent rounded-r-lg py-2 hover:bg-accentD focus:ring-4 focus:ring-secondary"
                  onClick={drawerToggle}
                >
                  Register
                </Link>
              </div>
            </div>
            <div className=" w-full bg-black/25 text-white py-4 px-4 rounded-t-xl mb-1">
              <h1 className="font-bold mb-1">Looking for a job?</h1>

              <div className="flex flex-row">
                <Link
                  to="/login-user?desig=candidate"
                  className="flex-1 text-xl  text-center shadow bg-secondary rounded-l-lg py-2 hover:bg-secondaryD focus:ring-4 focus:ring-secondary"
                  onClick={drawerToggle}
                >
                  Login
                </Link>
                <Link
                  to="/register-user?desig=candidate"
                  className="flex-1 text-xl text-center shadow bg-accent rounded-r-lg py-2 hover:bg-accentD focus:ring-4 focus:ring-secondary"
                  onClick={drawerToggle}
                >
                  Register
                </Link>
              </div>
            </div>
          </>
        )}

        {/* <Link
          to="/about"
          className="absolute bottom-2 text-center w-full btn btn-ghost"
          onClick={toggleDrawer}
        >
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Drawer;
