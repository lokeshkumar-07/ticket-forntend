import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { LuLogOut } from "react-icons/lu";
import { logout } from "../features/authSlice";
import { change_city } from "../features/citySlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {city} = useSelector((state) => state.city)

  const [navOpen, setNavOpen] = useState(false);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const { currentUser } = useSelector((state) => state.auth);

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Jaipur', 'Ahmedabad'];
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);

    const filteredCities = value ? cities.filter(city => city.toLowerCase().includes(value.toLowerCase())) : [];
    setSuggestions(filteredCities);
  };

  const handleCityClick = (c) => {
    dispatch(change_city(c))
    setSelectedCity(c);
    setSearchTerm(c);
    setShowModal(false);
    setSuggestions([]);
  };


  const navLinks = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/bookings/my",
      display: "Bookings",
    },
   
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className="py-5 flex items-center border-b border-slate-300"
      ref={headerRef}
    >
      <div className="container ">
        <div className="flex items-center justify-between ">
          {/* Brand */}
          <div className="flex items-center gap-[60px] hidden md:block">
            <div className="flex">
              <h1 className="font-bold text-[28px] text-yellow-400 ">
                Book
              </h1>
              <h1 className="font-bold text-[28px] text-green-400">Show</h1>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:flex hidden items-center gap-5">
            <ul className="flex items-center gap-5">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-blue-600 font-[600] text-[20px]"
                        : "font-[500] text-[18px]"
                    }
                    to={item.path}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Toggle Button for Small Screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="text-gray-500 focus:outline-none"
            >
              <AiOutlineMenu className="w-6 h-6" />
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center right ml-2 gap-4">
                <div className="flex gap-2 items-center hover:cursor-pointer text-[18px] font-semibold" onClick={() => setShowModal(true)}>
                  <h1>{city}</h1>
                  <IoIosArrowDown />
                </div>
              {currentUser ? (
                <div className="flex items-center gap-2">
                  {currentUser.role === "admin" && (
                    <div className="mr-4">
                      <NavLink
                        className={(navClass) =>
                          navClass.isActive
                            ? "text-blue-600 font-[600] text-[20px]"
                            : "font-[500] text-[18px]"
                        }
                        to="/admin"
                      >
                        Admin
                      </NavLink>
                    </div>
                  )}

                  

                  <img src={currentUser.avatar} className="w-[34px] h-[34px] border border-slate-400 p-1 rounded-full" />

                  <div className="flex flex-col leading-4">
                    <h1 className="text-[14px] text-gray-500">
                      Hello, {currentUser.name}
                    </h1>
                    <span className="text-[14px] font-[500]">Your Account</span>
                  </div>

                  <div
                    onClick={handleLogout}
                    className="flex items-center border border-slate-400 px-2 py-1 hover:cursor-pointer hover:bg-red-500 hover:text-white hover:border hover:border-slate-400 rounded-full"
                  >
                    <LuLogOut className="w-[34px] h-[34px] p-1 " />
                    <h1>Logout</h1>
                  </div>

                  
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  
                  <div
                    onClick={() => navigate("/login")}
                    className="flex items-center border border-slate-400 px-4 py-2 hover:cursor-pointer hover:bg-red-500 hover:text-white hover:border hover:border-slate-400 rounded-full"
                  >
                    <LuLogOut className="w-[34px] h-[34px] p-1 " />
                    <h1>Sign In</h1>
                  </div>
                </div>
              )}

              {/* <div className="relative gap-5 hover:cursor-pointer">
              <AiOutlineShoppingCart
                onClick={() => navigate("/carts")}
                className=" w-[28px] h-[28px]"
              />

              {cartItems.length > 0 && (
                <span className="w-[16px] h-[16px] p-2.5 flex items-center justify-center bg-red-600 rounded-full absolute text-white -top-2 -right-2">
                  {cartItems.length}
                </span>
              )}
            </div> */}
            </div>
          </div>
        </div>

        {/* Responsive Navigation for Small Screens */}
        {navOpen && (
          <div className="flex flex-col md:hidden mt-4">
            <div className="flex items-center gap-[60px]">
              <div className="flex">
                <h1 className="font-bold text-[28px] text-yellow-400 ">
                  Book
                </h1>
                <h1 className="font-bold text-[28px] text-green-400">Show</h1>
              </div>
            </div>
            <ul className="flex flex-col gap-2">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-blue-600 font-[600] text-[20px]"
                        : "font-[500] text-[18px]"
                    }
                    to={item.path}
                    onClick={() => setNavOpen(false)}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md w-64">
            <h2 className="text-xl font-bold mb-4">City Search Form</h2>
            <input
              type="text"
              placeholder="Search for a city"
              value={searchTerm}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-4 focus:outline-none"
            />
            <ul>
              {suggestions.map(city => (
                <li
                  key={city}
                  onClick={() => handleCityClick(city)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {city}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-400 text-white py-2 px-4 rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default Header;
