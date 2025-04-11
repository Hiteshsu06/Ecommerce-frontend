import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import MiniCheckoutComponent from "@userpage-layouts/MiniCheckoutComponent.jsx";
import NavbarSubmenu from '@userpage-components/NavbarSubmenu.jsx';
import ButtonComponent from "@common/ButtonComponent";
import useCartStore from "@store";

const Navbar = ({ data, fix = false }) => {
    const [visibleRight, setVisibleRight] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true); // State to control navbar visibility
    const [lastScrollY, setLastScrollY] = useState(0);
    const { t } = useTranslation("msg");
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const triggerUpdate = useCartStore((state) => state.triggerUpdate);

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
                <ButtonComponent
                    // onClick={handleAccount}
                    type="button"
                    className="w-full text-[22px] text-black"
                    icon="ri-user-3-line"
                />
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
        </div>
    );
};

export default Navbar;