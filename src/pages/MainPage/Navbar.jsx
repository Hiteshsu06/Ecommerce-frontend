import React from 'react';
import NavbarSubmenu from './Components/NavbarSubmenu';
import ButtonComponent from "@common/ButtonComponent";

const Navbar = ({categories}) => {

    const handleSearch=()=>{

    }

    const handleAccount=()=>{

    }

    const handleCart=()=>{

    }

  return (
    <div>
        <div className='bg-[#af2037] text-center py-3 text-[14px] text-white'>
            The Deliveries in Bangalore Takes Upto 3 Days. For Same Day Deliveries Please Order on Swiggy or Zomato.
        </div>
        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-2 p-6'>
                <img src="//www.anandsweets.in/cdn/shop/files/logo.svg?v=1676482841" alt="logo-image"/>
            </div>
            <div className='col-span-8 flex flex-wrap gap-10 text[#1F1F1F] items-center'>
               {categories?.map((item)=>{
                    return(
                        <NavbarSubmenu data={item}/>
                )
               })}
            </div>
            <div className='col-span-2 flex items-center gap-10'>
                <ButtonComponent
                    onClick={handleSearch}
                    type="button"
                    className="w-full scale-[1.7] text-[12px] text-black"
                    icon="ri-search-line"
                    iconPos="right"
                />
                <ButtonComponent
                    onClick={handleAccount}
                    type="button"
                    className="w-full scale-[1.7] text-[12px] text-black"
                    icon="ri-user-3-line"
                    iconPos="right"
                />
                <ButtonComponent
                    onClick={handleCart}
                    type="button"
                    className="w-full scale-[1.7] text-[12px] text-black"
                    icon="ri-shopping-bag-line"
                    iconPos="right"
                />
            </div>
        </div>
    </div>
  )
}

export default Navbar