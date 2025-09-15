import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  bestDealsImage,
  bestSellersImage,
  electronicsImage,
  fashionImage,
  homeImage,
} from "../utils/data";
import logo from "../images/nivzone_transparent.png";
import { useState, useEffect } from "react";
import NavBarMobile from "./NavBarMobile";
import { useCart } from "./context/CartContext";
import Alert from "./Alert";

const NavBar = ({ setBgImage }) => {
  const { cartSize } = useCart();
  const [isMobileNavShow, setIsMobileNavBarShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    "Home",
    "Electronics",
    "Fashion",
    "Best Deals",
    "Best Sellers",
    "Orders",
  ];

  // Update bgImage based on current route
  useEffect(() => {
    const path = location.pathname;
    let newImage;

    switch (path) {
      case "/":
        newImage = homeImage;
        break;
      case "/Electronics":
        newImage = electronicsImage;
        break;
      case "/Fashion":
        newImage = fashionImage;
        break;
      case "/BestDeals":
        newImage = bestDealsImage;
        break;
      case "/BestSellers":
        newImage = bestSellersImage;
        break;
      case "/Orders":
      case "/Cart":
      case "/Login":
      default:
        newImage = homeImage; // Fallback for non-banner pages
    }

    if (typeof setBgImage === "function" && newImage) {
      setBgImage(newImage);
    }
  }, [location.pathname, setBgImage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/", {
      state: {
        alert: { message: "Logged out successfully!", type: "success" },
      },
    });
    window.location.reload();
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate("/Cart");
    } else {
      navigate("/Login", { state: { from: "/Cart" } });
    }
  };

  const handleOrdersClick = () => {
    if (isAuthenticated) {
      navigate("/Orders");
    } else {
      navigate("/Login", { state: { from: "/Orders" } });
    }
  };

  const changeImg = (url) => {
    if (typeof setBgImage === "function") {
      switch (url) {
        case "Home":
          setBgImage(homeImage);
          break;
        case "Electronics":
          setBgImage(electronicsImage);
          break;
        case "Fashion":
          setBgImage(fashionImage);
          break;
        case "Best Deals":
          setBgImage(bestDealsImage);
          break;
        case "Best Sellers":
          setBgImage(bestSellersImage);
          break;
        default:
          setBgImage(homeImage);
      }
    }
  };

  return (
    <nav className="max-w-[1450px] mx-auto z-1 w-full fixed top-0">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="py-[20px] bg-slate-300/60 text-blue-600">
        <div className="flex items-center justify-between md:h-[90px] h-[60px] w-full">
          <div className="flex items-center justify-center gap-[50px] mb-[40px] w-[180px] mx-auto lg:ml-[90px]">
            <span
              className="md:hidden text-[1.6rem]"
              onClick={() => setIsMobileNavBarShow(true)}
            >
              <i className="fa-solid fa-bars text-slate-800 mt-[34px]"></i>
            </span>
            <img
              className="h-[70px] md:mt-[30px] mt-[40px] items-center md:ml-[0px]"
              src={logo}
              alt="Nivzone logo"
            />
            <span
              onClick={handleCartClick}
              className="md:hidden mr-[20px] ml-auto cursor-pointer"
            >
              <i className="fa-solid fa-cart-shopping font-semibold cursor-pointer mt-[34px] text-[1.3rem]">
                <span className="p-[1px] bg-red-600 rounded-full text-[0.9rem] text-white relative top-[-15px] border-[5px] border-red-600">
                  {cartSize}
                </span>
              </i>
            </span>
          </div>
          <ul className="cursor-pointer lg:flex hidden items-center justify-between gap-[34px] text-[1.3rem]">
            {navLinks.map((heading, index) => {
              const updateURL = heading.split(" ").join("");
              if (heading === "Orders") {
                return (
                  <li
                    key={heading + index}
                    onClick={handleOrdersClick}
                    className="relative flex w-fit text-white group"
                  >
                    <span
                      id={heading}
                      className="hover:text-red-600 text-blue-700 font-semibold"
                    >
                      Orders
                      <span className="absolute left-0 bottom-0 h-[2px] bg-red-600 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                    </span>
                  </li>
                );
              }
              return (
                <NavLink
                  key={heading + index}
                  to={`/${heading === "Home" ? "" : updateURL}`}
                  className="relative flex w-fit text-white group"
                  onClick={() => changeImg(heading)}
                >
                  <li
                    id={heading}
                    className="hover:text-red-600 text-blue-700 font-semibold"
                  >
                    {heading}
                    <span className="absolute left-0 bottom-0 h-[2px] bg-red-600 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </li>
                </NavLink>
              );
            })}
            <span onClick={handleCartClick} className="cursor-pointer">
              <i className="fa-solid fa-cart-shopping mr-[30px] font-semibold cursor-pointer text-[1.3rem]">
                <span className="p-[1px] bg-red-600 rounded-full text-[0.9rem] text-white relative top-[-15px] border-[5px] border-red-600">
                  {cartSize}
                </span>
              </i>
            </span>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold text-[1.1rem] px-3 py-0.5 rounded-md hover:bg-red-700 active:bg-red-800 transition-colors mr-[30px]"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/Login"
                className="bg-green-600 text-white font-semibold text-[1.1rem] px-3 py-0.5 rounded-md hover:bg-green-700 active:bg-green-800 transition-colors mr-[30px]"
              >
                Login
              </NavLink>
            )}
          </ul>
        </div>
        <NavBarMobile
          isMobileNavShow={isMobileNavShow}
          setIsMobileNavBarShow={setIsMobileNavBarShow}
          setBgImage={setBgImage}
        />
      </div>
    </nav>
  );
};

export default NavBar;