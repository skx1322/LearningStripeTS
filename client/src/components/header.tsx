import { Link, useLocation } from "react-router";
import * as React from "react";
import { FaAlignJustify } from "react-icons/fa";
import { headerData } from "../data/componentData";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    React.useState<boolean>(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-primary shadow-2xl sticky z-20 top-0 flex justify-between border-b border-support-gray-dark px-4 py-2 sm:px-48 items-center">
      <div className={isMobileMenuOpen ? "hidden" : "block"}>
        <span>
          <img
            src="https://nerdantabucket0.sgp1.cdn.digitaloceanspaces.com/FuHuaThumbsup.png"
            alt="LogoFull1"
            className="h-16 w-16"
          />
        </span>
      </div>
      <div className="hidden sm:block">
        <section className="flex items-center text-xl gap-2 sm:gap-6">
          {headerData.map((data, index) => (
            <Link
              to={data.link}
              key={index}
              className={`
                px-4
                transform
                transition
                duration-500
                ease-in-out
                hover:scale-105
                ${
                  location.pathname === data.link
                    ? "text-secondary"
                    : "text-text-main hover:text-secondary"
                }
              `}
            >
              {data.title}
            </Link>
          ))}
        </section>
      </div>

      <div className={`sm:hidden ${isMobileMenuOpen ? "hidden" : "block"}`}>
        <FaAlignJustify
          className="text-text-main text-2xl cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full bg-primary p-4 shadow-xl">
          <div className="w-full flex justify-end">
            <FaAlignJustify
              className="text-text-main text-2xl cursor-pointer rotate-90 transform transition duration-300"
              onClick={closeMobileMenu}
            />
          </div>
          <section className="flex flex-col text-2xl gap-2 items-center mt-4">
            {headerData.map((data, index) => (
              <Link
                to={data.link}
                key={index}
                className={`
                  text-center
                  py-4
                  ${
                    location.pathname === data.link
                      ? "text-secondary"
                      : "text-text-main"
                  }
                `}
                onClick={closeMobileMenu}
              >
                {data.title}
              </Link>
            ))}
          </section>
        </div>
      )}
    </header>
  );
};

export default Header;
