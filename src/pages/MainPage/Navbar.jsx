import React, { useState, useEffect } from 'react';
import NavbarSubmenu from './Components/NavbarSubmenu';
import ButtonComponent from "@common/ButtonComponent";
import MiniCheckoutComponent from "./Home/MiniCheckoutComponent";
import { Sidebar } from 'primereact/sidebar';
import { API_CONSTANTS } from "../../constants/apiurl";
import { allApiWithHeaderToken } from "@api/api";

const Navbar = ({ fix = false }) => {
    const [visibleRight, setVisibleRight] = useState(false);
    const [isFixed, setIsFixed] = useState(false); // Initially relative
    const [lastScrollY, setLastScrollY] = useState(0);
    const [loader, setLoader] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleAccount = () => {};

    const handleCart = () => {
        setVisibleRight(true);
    };

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            setIsFixed(true); // Fix navbar when scrolling down
        } else if (currentScrollY < 50) {
            setIsFixed(false); // Make it relative when near the top
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        if (!fix) {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [lastScrollY]);

    const fetchCategoryList = () => {
        setLoader(true);
        allApiWithHeaderToken(API_CONSTANTS.MENU_LIST_URL, "" , "get")
          .then((response) => {
            if (response.status === 200) {
                let data = response?.data;
                data.push({name: "About Us"});
                data.push({name: "Explore & Connect"})
                setCategories(data)
            } 
          })
          .catch((err) => {
            setLoader(false);
          }).finally(()=>{
            setLoader(false);
          });
      };

    useEffect(() => {
        fetchCategoryList();
      }, []);

    return (
        <div className={`z-10 grid grid-cols-12 gap-4 shadow-custom bg-white transform transition-transform duration-1000 ease-in-out
            ${isFixed ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : 'relative'}`}
        >
            <div className='col-span-2 p-2 flex items-center'>
                <img src="//www.anandsweets.in/cdn/shop/files/logo.svg?v=1676482841" width={200} alt="logo-image"/>
            </div>
            <div className='col-span-8 flex flex-wrap gap-2 text-[#1F1F1F] items-start'>
                {categories?.map((item) => (
                    <NavbarSubmenu data={item} key={item.id} />
                ))}
            </div>
            <div className='col-span-2 flex items-center gap-10'>
                <ButtonComponent
                    onClick={handleAccount}
                    type="button"
                    className="w-full text-[22px] text-black"
                    icon="ri-user-3-line"
                    iconPos="right"
                />
                <div className='relative'>
                    <ButtonComponent
                        onClick={handleCart}
                        type="button"
                        className="w-full text-[22px] text-black"
                        icon="ri-shopping-bag-line"
                        iconPos="right"
                    />
                    <span className='absolute top-[-12px] pt-[2px] right-[-14px] text-white bg-red-500 text-xs w-5 h-5 rounded-full text-center'>2</span>
                </div>
            </div>
            <Sidebar visible={visibleRight} blockScroll={true} position="right" header="Shopping Cart" className='w-[420px]' onHide={() => setVisibleRight(false)}>
                <MiniCheckoutComponent />
            </Sidebar>
        </div>
    );
};

export default Navbar;