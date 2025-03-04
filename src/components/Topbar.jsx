import { useEffect, useState } from "react";
import AvatarProfile from "@common/AvatarProfile";
import { useTranslation } from "react-i18next";

const Topbar = ({ toggleExpansionSwitch }) => {
  const { t } = useTranslation("msg");
  const [expand, setExpand] = useState(true);
  const [theme, setTheme] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const toggleTheme = () => {
    setTheme(!theme);
    if (theme) {
      document.querySelector("body").setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      if(theme === "dark"){
        document.documentElement.classList.add("dark");
      }
      else{
        document.documentElement.classList.remove("dark");
      }
    } else {
      document.querySelector("body").setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));    
    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme === "dark") {
      setTheme(true);
      document.querySelector("body").setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme(false);
      document.querySelector("body").setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="flex h-16 w-full items-center gap-4 bg-BgTertiaryColor px-5">
      <button
        className={`toggle-button col-span-1 ${expand ? "expanded" : ""}`}
        onClick={() => {
          setExpand(!expand);
          toggleExpansionSwitch(!expand); // Fix the argument to toggleExpansionSwitch
        }}>
        <i
          className={`icon text-2xl text-TextPrimaryColor ${expand ? "ri-menu-fold-2-line rotate" : "ri-menu-unfold-2-line"}`}
        ></i>
      </button>
      <div className="grid w-full grid-cols-12 gap-2">
        <div className="col-span-8 flex items-center">
        </div>
        <div className="col-span-4 flex justify-end text-TextPrimaryColor">
          <button onClick={toggleTheme} className="me-8 text-xl">
            {theme ? (
              <i className="ri-sun-line"></i>
            ) : (
              <i className="ri-contrast-2-fill"></i>
            )}
          </button>
          <AvatarProfile shape="circle" userDetails={userDetails} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
