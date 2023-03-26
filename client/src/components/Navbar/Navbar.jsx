import React, { useContext, useState } from "react";
import Button from "../../parts/Button";
import { GlobalContext } from "../../context/GlobalContext";
import { UserContext } from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useQuery } from "react-query";
import { API } from "../../config/api";
const Navbar = () => {
  const navigate = useNavigate();
  const { statesFromGlobalContext } = useContext(GlobalContext);
  const { setIsModalVisible, setIsLoginModal, setIsSignUpModal, setPreview } =
    statesFromGlobalContext;
  const [state, dispatch] = useContext(UserContext);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  let { data: profile } = useQuery(
    "ProfileCache",
    async () => {
      const response = await API.get("/user/" + state.user.id);
      return response.data.data;
    },
    {
      refetchInterval: 1000,
    }
  );
  const logout = (e) => {
    setPreview(null);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <>
      <div className="navbar h-16  flex justify-between items-center shadow-navbarShadow px-4 md:px-8 lg:px-20">
        <div className="leftNavbar flex">
          <div className="">
            <NavLink to="/" className="flex gap-x-4 items-center">
              <span className="text-transparent font-normal text-3xl bg-clip-text bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A]">
                LandTick
              </span>
              <img
                src="/assets/LandTickIcon.png"
                alt="Trainicon"
                className=" w-14"
              />
            </NavLink>
          </div>
        </div>
        <div className="rightNavbar flex gap-x-[26px] items-center">
          {state.isLogin ? (
            <>
              {state.user.role !== "admin" ? (
                <>
                  <span className="">{profile?.name}</span>
                </>
              ) : (
                <>
                  <span>Admin</span>
                </>
              )}
              <div
                className="w-full "
                onMouseEnter={() => {
                  setIsProfileHovered(true);
                }}
                onMouseLeave={() => {
                  setIsProfileHovered(false);
                }}
              >
                <NavLink className="profile relative">
                  <LazyLoadImage
                    effect="blur"
                    width={50}
                    height={50}
                    src={profile?.image}
                    alt="profilePic"
                    className="object-cover h-[50px] w-[50px] rounded-full"
                  />
                </NavLink>
                {/* user dropdown */}
                {isProfileHovered && state.user.role === "user" ? (
                  <>
                    <ul className="absolute top-[40px] bg-white text-black w-60 right-0 rounded-[10px] z-10">
                      <NavLink to="/myTicket" className="profile">
                        <li className="p-4 flex gap-x-4">
                          <div className="w-[24px]">
                            <LazyLoadImage
                              effect="blur"
                              src="/assets/ticketUser.png"
                              alt="addTicket"
                            />
                          </div>
                          <span className="text-transparent font-normal bg-clip-text bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A]">
                            Profile
                          </span>
                        </li>
                      </NavLink>
                      <NavLink to="/payment" className="bill">
                        <li className="p-4 flex gap-x-4 border-t-[2px]">
                          <div className="w-[24px]">
                            <LazyLoadImage
                              effect="blur"
                              src="/assets/bill.png"
                              alt="bill"
                            />
                          </div>
                          <span className="text-transparent font-normal bg-clip-text bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A]">
                            Payment
                          </span>
                        </li>
                      </NavLink>
                      <NavLink className="logout">
                        <li className="p-4 flex gap-x-4 border-t-[2px]">
                          <div className="w-[24px]">
                            <LazyLoadImage
                              effect="blur"
                              src="/assets/logout.png"
                              alt="logout"
                            />
                          </div>
                          <button
                            onClick={(event) => {
                              event.preventDefault(), logout();
                            }}
                          >
                            <span className="text-transparent font-normal  bg-clip-text bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A]">
                              Logout
                            </span>
                          </button>
                        </li>
                      </NavLink>
                    </ul>
                  </>
                ) : (
                  <></>
                )}
                {/* admin dropdown */}
                {state.user.role === "admin" && isProfileHovered ? (
                  <>
                    <ul className="absolute top-[40px] bg-white text-black w-60 right-0 rounded-[10px] z-50">
                      <NavLink
                        to="/admin/transactionList"
                        className="transactionList"
                      >
                        <li className="p-4 flex gap-x-4">
                          <div className="w-[24px]">
                            <LazyLoadImage
                              src="/assets/addTicket.png"
                              alt="dropdown"
                            />
                          </div>
                          Transaction List
                        </li>
                      </NavLink>
                      <NavLink to="/admin/addTicket" className="addTicket">
                        <li className="p-4 flex gap-x-4 border-t-[2px]">
                          <div className="w-[24px]">
                            <LazyLoadImage
                              src="/assets/addTicket.png"
                              alt="dropdown"
                            />
                          </div>
                          Add Ticket
                        </li>
                      </NavLink>
                      <NavLink to="/admin/addStation" className="addStation">
                        <li className="p-4 flex gap-x-4 border-t-[2px]">
                          <div className="w-[24px]">
                            <LazyLoadImage
                              src="/assets/addTicket.png"
                              alt="dropdown"
                            />
                          </div>
                          Add Station
                        </li>
                      </NavLink>
                      <NavLink
                        onClick={(event) => {
                          event.preventDefault();
                          logout();
                        }}
                        className="logout"
                      >
                        <li className="p-4 flex gap-x-4 border-t-[2px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            />
                          </svg>
                          Logout
                        </li>
                      </NavLink>
                    </ul>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink
                onClick={() => {
                  setIsModalVisible(true);
                  setIsLoginModal(true);
                }}
              >
                <Button className="">Login</Button>
              </NavLink>
              <NavLink
                onClick={() => {
                  setIsModalVisible(true);
                  setIsSignUpModal(true);
                }}
              >
                <Button>Sign Up</Button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
