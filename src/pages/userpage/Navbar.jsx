import React, { useState, useEffect, useRef  } from 'react';
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
    const [showNavbar, setShowNavbar] = useState(true); // State to control navbar visibility
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation("msg");
    const menu = useRef(null);
    const [cart, setCart] = useState([]);
    const triggerUpdate = useCartStore((state) => state.triggerUpdate);
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    const loggedInItems = [
        {
            label: userDetails?.name,
            icon: <Avatar
                className="mr-2"
                label={userDetails?.name[0]}
                shape="circle"
            />,
            command: () => {}
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

    // Handle scroll to show/hide navbar
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowNavbar(false); // Scrolling down, hide navbar
        } else {
            setShowNavbar(true); // Scrolling up, show navbar
        }

        setLastScrollY(currentScrollY);
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

     const logout=()=>{
        allApiWithHeaderToken(API_CONSTANTS.LOGOUT, "" , "delete")
        .then((response) => {
            if (response.status === 200){
                navigate("/");
            } 
        })
        .catch((err) => {
        });
      }

    return (
        <div
            className={`
                z-10 grid grid-cols-12 gap-4 shadow-custom bg-white transform transition-transform duration-500 ease-in-out
                ${showNavbar ? 'translate-y-0' : '-translate-y-full'}
                fixed top-0 left-0 right-0 z-50 shadow-lg
            `}
        >
            <div className='col-span-2 p-2 flex items-center'>
                <img
                    className='hover:cursor-pointer'
                    onClick={() => { navigate("/") }}
                    src="//www.anandsweets.in/cdn/shop/files/logo.svg?v=1676482841"
                    width={200}
                    alt="logo-image"
                />
            </div>
            <div className='col-span-8 flex flex-wrap gap-2 text-[#1F1F1F] items-start'>
                {data?.map((item) => (
                    <NavbarSubmenu data={item} key={item?.id} />
                ))}
            </div>
            <div className='col-span-2 flex items-center justify-end gap-8 pr-4'>
                <div className='relative'>
                    <ButtonComponent
                        onClick={handleCart}
                        type="button"
                        className="w-full text-[22px] text-black"
                        icon="ri-shopping-bag-line"
                    />
                    <span className='absolute top-[-12px] pt-[2px] right-[-14px] text-white bg-red-500 text-xs w-5 h-5 rounded-full text-center'>
                        {cart?.length}
                    </span>
                </div>
                {
                    userDetails ? <Avatar
                    className="mr-2"
                    label={userDetails?.name[0]}
                    shape="circle"
                    onClick={(e) => menu.current.toggle(e)}
                    /> : 
                    <ButtonComponent
                        onClick={()=>{ navigate(ROUTES_CONSTANTS.SIGN_IN); }} 
                        type="button"
                        className="w-full text-[22px] text-black"
                        icon="ri-user-3-line"
                    />
                }
            </div>
            <Sidebar
                visible={visibleRight}
                blockScroll={true}
                position="right"
                header="Shopping Cart"
                className='w-[420px]'
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