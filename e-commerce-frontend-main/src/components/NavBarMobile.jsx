import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { bestDealsImage, bestSellersImage, electronicsImage, fashionImage, homeImage } from "../utils/data";
import { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";

const NavBarMobile = ({ isMobileNavShow, setIsMobileNavBarShow, setBgImage }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cartSize } = useCart();
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
    setIsMobileNavBarShow(false);
    navigate("/", {
      state: {
        alert: {
          message: "Logged out successfully!",
          type: "success",
        },
      },
    });
    window.location.reload();
  };

  const handleOrdersClick = () => {
    if (isAuthenticated) {
      navigate("/Orders");
      setIsMobileNavBarShow(false);
    } else {
      navigate("/Login", { state: { from: "/Orders" } });
      setIsMobileNavBarShow(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/Login");
    setIsMobileNavBarShow(false);
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
    <nav className="">
      <div
        className={`fixed top-0 bg-black/60 z-[1000] h-screen inset-0 w-[40%] lg:hidden transform transition-all ease-in inline-flex flex-col ${
          isMobileNavShow ? "translate-x-[0]" : "translate-x-[-100%]"
        }`}
      >
        <i
          className="fa-solid fa-xmark mr-[20px] ml-auto mt-[20px] cursor-pointer text-white"
          onClick={() => setIsMobileNavBarShow(false)}
        ></i>
        <ul className="text-white cursor-pointer flex-col items-center justify-between gap-[30px] text-[1rem] font-semibold">
          {navLinks.map((heading, index) => {
            const updateURL = heading.split(" ").join("");
            if (heading === "Orders") {
              return (
                <li
                  key={heading + index}
                  onClick={handleOrdersClick}
                  className="ml-[20px] mr-auto hover:text-red-600"
                >
                  Orders
                  <hr className="text-gray-400 mb-[8px] mt-[12px]" />
                </li>
              );
            }
            return (
              <NavLink
                key={heading + index}
                to={`/${heading === "Home" ? "" : updateURL}`}
                onClick={() => {
                  changeImg(heading);
                  setIsMobileNavBarShow(false);
                }}
                className="hover:text-red-600"
              >
                <li id={heading} className="ml-[20px] mr-auto">
                  {heading}
                  <hr className="text-gray-400 mb-[8px] mt-[12px]" />
                </li>
              </NavLink>
            );
          })}
          <li className="ml-[20px] mr-auto">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold text-[1.1rem] px-3 py-0.5 rounded-md hover:bg-red-700 active:bg-red-800 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-green-600 text-white font-semibold text-[1.1rem] px-3 py-0.5 rounded-md hover:bg-green-700 active:bg-green-800 transition-colors"
              >
                Login
              </button>
            )}
            <hr className="text-gray-400 mb-[8px] mt-[12px]" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarMobile;