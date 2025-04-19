import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { useNavigate } from "react-router-dom";
import { TieredMenu } from 'primereact/tieredmenu';
import { Avatar } from "primereact/avatar";
import { useTranslation } from "react-i18next";

// Components
import MiniCheckoutComponent from "@userpage-layouts/MiniCheckoutComponent.jsx";
import NavbarSubmenu from '@userpage-components/NavbarSubmenu.jsx';
import ButtonComponent from "@common/ButtonComponent";
import { allApiWithHeaderToken } from "@api/api";
import { API_CONSTANTS } from "@constants/apiurl";
import useCartStore from "@store";
import { ROUTES_CONSTANTS } from "@constants/routesurl";

const Navbar = ({ data, fix = false }) => {
  const [visibleRight, setVisibleRight] = useState(false);
  const [cart, setCart] = useState([]);
  const triggerUpdate = useCartStore((state) => state.triggerUpdate);
  const navigate = useNavigate();
  const { t } = useTranslation("msg");
  const menu = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); 
  const [MobileMenuShow, setMobileMenuShow] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const loggedInItems = [
    {
      label: userDetails?.name,
      icon: <Avatar
        className="mr-2"
        label={userDetails?.name[0]}
        shape="circle"
      />,
      command: () => { }
    },
    {
      separator: true
    },
    {
      label: t("edit_profile"),
      icon: "ri-user-3-line",
      command: () => {
        navigate(`/edit-profile`)
      },
      className: "text-[0.8rem] user-profile-menu-item-list"
    },
    {
      label: t("help"),
      icon: "ri-questionnaire-line",
      command: () => {
        navigate('/user-help')
      },
      className: "text-[0.8rem] user-profile-menu-item-list"
    },
    {
      label: t("logout"),
      icon: "ri-logout-circle-r-line",
      command: () => {
        logout();
        let theme = localStorage.getItem("theme");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("token");
        localStorage.setItem("theme", theme);
      },
      className: "text-[0.8rem] user-profile-menu-item-list"
    }
  ];

  // Fetch cart data
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, [triggerUpdate]);

  const handleCart = () => {
    setVisibleRight(true);
  };

  const logout = () => {
    allApiWithHeaderToken(API_CONSTANTS.LOGOUT, "", "delete")
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
      });
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // When scrolling down and passing 100px, set navbar to fixed
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsFixed(true); // Make navbar fixed when scrolling down
      setShowNavbar(false); // Hide navbar when scrolling down
    } 
    // When scrolling up
    else if (currentScrollY < lastScrollY && currentScrollY > 0) {
      setIsFixed(true); // Keep navbar fixed when scrolling up
      setShowNavbar(true); // Show navbar when scrolling up
    }
    // When at the top of the page
    else if (currentScrollY === 0) {
      setIsFixed(false); // Set navbar to relative when at the top
      setShowNavbar(true); // Ensure navbar is visible at the top
    }

    setLastScrollY(currentScrollY); // Update the last scroll position
  };

  // Add scroll event listener
  useEffect(() => {
    if (!fix) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScrollY]);

  return (
    <div className={`${data?.length > 0 ? "" : 'hidden'}`}>
      <div
        className={`
          z-50 transition-all duration-300 ease-in-out
          ${showNavbar ? 'translate-y-0' : '-translate-y-full'} // Add a smooth hide/show effect
        `}
        style={{
          position: isFixed ? 'fixed' : 'relative', // Change position based on isFixed
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          paddingTop: showNavbar ? '0' : '60px', // Add padding when navbar is hidden
        }}
      >
        <div className="grid grid-cols-12 gap-4 items-center px-4 py-2 bg-white">
          {/* Logo */}
          <div className="col-span-6 md:col-span-2 flex items-center">
            <img
              className="hover:cursor-pointer w-[160px] md:w-[200px]"
              onClick={() => navigate("/")}
              src="//www.anandsweets.in/cdn/shop/files/logo.svg?v=1676482841"
              alt="logo-image"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex col-span-8 flex-wrap gap-4 items-center">
            {data?.map((item) => (
              <NavbarSubmenu data={item} key={item?.id} />
            ))}
          </div>

          {/* Right Side (Cart / User) */}
          <div className="col-span-6 md:col-span-2 flex justify-end gap-4 items-center">
            <div className='relative'>
              <ButtonComponent
                onClick={handleCart}
                type="button"
                className="text-[22px] text-black"
                icon="ri-shopping-bag-line"
              />
              {
                cart?.length > 0 ? <span className="absolute top-[-0.7rem] right-0 text-white bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart?.length}
              </span> : null
              }
            </div>

            {/* User Avatar */}
            {userDetails ? (
              <Avatar
                className="mr-2"
                label={userDetails?.name[0]}
                shape="circle"
                onClick={(e) => menu.current.toggle(e)}
              />
            ) : (
              <ButtonComponent
                onClick={() => navigate(ROUTES_CONSTANTS.SIGN_IN)}
                type="button"
                className="text-[22px] text-black"
                icon="ri-user-3-line"
              />
            )}

            {/* Mobile Menu Icon */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMobileMenuShow(true)}
            >
              <i className="ri-menu-line" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <Sidebar
        visible={MobileMenuShow}
        onHide={() => setMobileMenuShow(false)}
        blockScroll
        position="left"
        className="w-[80vw] sm:w-[60vw]"
      >
        {data?.map((item) => (
          <div key={item?.id} className="py-2 border-b">
            <NavbarSubmenu data={item} />
          </div>
        ))}
        <div className="mt-4">
          {userDetails && (
            <div className="text-sm">
              <div className="font-semibold">{userDetails?.name}</div>
              <button onClick={logout} className="text-red-500 mt-2">
                Logout
              </button>
            </div>
          )}
        </div>
      </Sidebar>

      <Sidebar
        visible={visibleRight}
        blockScroll
        position="right"
        header="Shopping Cart"
        className="w-[420px]"
        onHide={() => setVisibleRight(false)}
      >
        <MiniCheckoutComponent />
      </Sidebar>

      <TieredMenu
        model={loggedInItems}
        popup
        ref={menu}
        breakpoint="767px"
        className="p-0 text-[0.8rem] user-avatar-menu"
      />
    </div>
  );
};

export default Navbar;