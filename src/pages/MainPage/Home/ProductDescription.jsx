import React from 'react';
import Navbar from "../Navbar";
import ShopOurSnackRange from '../Components/ShopOurSnackRange';
import Footer from "../Footer";
import { Rating } from "primereact/rating";
import { Accordion, AccordionTab } from 'primereact/accordion';

const allCategories = [
    {name: "Shop All", hover: false, items: [
      {name: "Sweets", hover: false, items: [
              {name: "All Sweets"},
              {name: "Burfi"},
              {name: "Mysore Pak"},
              {name: "Laddu"},
              {name: "Pak"},
      ]},
      {name: "Dry Fruits"},
      {name: "Speciality"},
      {name: "Snacks"},
      {name: "Guilt Free"},
      {name: "Grifting"}
    ]},
    {name: "Sweets"},
    {name: "Namkeen", hover: false, items: [
      {name: "All Namkeen"},
      {name: "Northern Special"},
      {name: "Southern Special"}
    ]},
    {name: "Dry Fruits"},
    {name: "Gifting"},
    {name: "About Us"},
    {name: "Explore & Connect"}
]

const features = [
    {
      icon: "ri-archive-line", // Shelf life icon
      text: "25 Days shelf life",
    },
    {
      icon: "ri-map-pin-line", // Delivery icon
      text: "3-5 days delivery. Pan India shipping.",
    },
    {
      icon: "ri-earth-line", // International shipping icon
      text: "International Shipping Available",
    },
];

const ProductDescription = () => {
  return (
    <>
        <Navbar categories={allCategories} fix={true}/>

        <div className="mx-16 p-4">
            {/* Product Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side - Image */}
                <div>
                <img
                    src="https://www.anandsweets.in/cdn/shop/files/Dry_Fruits_3fe07210-51c4-4120-b01c-49c27b8eb02b.png?v=1713446653&width=360" 
                    alt="Mysore Pak"
                    className="w-full rounded-lg shadow-lg"
                />
                </div>

                {/* Right Side - Details */}
                <div>
                    <h2 className="text-2xl font-semibold">Mysore Pak Celebration Tin - 500gms</h2>
                    <div className="flex items-center space-x-2 text-yellow-500 mt-2">
                        <Rating value={3} readOnly cancel={false} /> <span className="text-gray-500 ps-4">(32 reviews)</span>
                    </div>
                    <p className="text-lg font-bold mt-1">₹ 545 <span className="text-sm text-gray-700">Shipping and tax included.</span></p>
                    
                    <div className="flex flex-col mt-8 md:flex-row justify-center gap-8 text-center">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center w-[30%]">
                                <div className="w-12 h-12 flex items-center justify-center bg-yellow-600 text-white rounded-full text-2xl">
                                    <i className={feature.icon}></i>
                                </div>
                                <p className="mt-2 text-gray-700 text-sm">{feature.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full mt-8">
                        <div className='flex gap-4'>
                            {/* Quantity Selector */}
                            <div class="flex items-center border-2 border-[#caa446] rounded-md overflow-hidden">
                                <button class="px-3 py-2 text-lg hover:bg-gray-200 w-fit" onclick="decreaseQty()">−</button>
                                    <span id="quantity" class="px-4 py-2 text-lg font-[Tektur] w-fit">1</span>
                                <button class="px-3 py-2 text-lg hover:bg-gray-200 w-fit" onclick="increaseQty()">+</button>
                            </div>

                            {/* Add to Cart Button */}
                            <button className="w-full bg-yellow-600 text-white font-medium py-3 rounded-md transition-all duration-300 hover:bg-yellow-700 hover:shadow-md">
                                Add to cart
                            </button>
                        </div>

                        {/* Buy it now Button */}
                        <button className="w-full bg-yellow-600 text-white font-medium py-3 rounded-md mt-2 transition-all duration-300 hover:bg-yellow-700 hover:shadow-md">
                            Buy it now
                        </button>

                        {/* Info Section */}
                        <div className="mt-4 p-8 rounded-md">
                            {[
                            { icon: "ri-heart-line", text: "Freshly Made To Order" },
                            { icon: "ri-leaf-line", text: "Preservative-Free, 25 Days Shelf-Life" },
                            { icon: "ri-gift-line", text: "Premium And Safe Packaging" },
                            ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2 text-gray-800">
                                <i className={`${item.icon} text-red-600 text-xl`}></i>
                                <span className="text-[14px]">{item.text}</span>
                            </div>
                            ))}
                        </div>
                    </div>

                    {/* Details Accordion */}
                    <div className="border-t pt-4">
                        <Accordion className='custom-checkout-accordian-header'>
                            <AccordionTab
                                header={
                                    <div className="flex align-items-center justify-between gap-2 w-full">
                                        <div className='flex items-center'>
                                          <span className="font-[500] white-space-nowrap">Product Details</span>
                                        </div>
                                        <div className='flex items-center'>
                                          <span>
                                             <i
                                              className="icon text-[28px] transition-transform duration-300 ri-arrow-drop-down-fill"
                                            ></i>
                                          </span>
                                        </div>
                                    </div>
                                  }
                                >
                                <div className='text-[13px]'>
                                  Pride of karnataka
                                  Created by Kakasura Madappa, a head chef at the Mysore Palace in 1935, the Mysore Pak is a ghee-laden indulgent sweet that is the pride of Karnataka. Golden-hued and redolent with the aroma of pure cow ghee, the Mysore Pak is popularly served at festivals, weddings, and religious ceremonies and is loved by people of all ages.
                                </div>
                            </AccordionTab>
                            <AccordionTab
                                header={
                                    <div className="flex align-items-center justify-between gap-2 w-full">
                                        <div className='flex items-center'>
                                          <span className="font-[500] white-space-nowrap">Shipping & Returns</span>
                                        </div>
                                        <div className='flex items-center'>
                                          <span>
                                             <i
                                              className="icon text-[28px] transition-transform duration-300 ri-arrow-drop-down-fill"
                                            ></i>
                                          </span>
                                        </div>
                                    </div>
                                  }
                                >
                                <div className='text-[14px] font-[700]'>
                                  Shipping
                                </div>
                                <div className='text-[13px]'>
                                  It takes 2-3 days for deliveries in Bangalore, whereas it takes 6-8 days for Nation and worldwide deliveries.
                                </div>
                                <div className='text-[14px] font-[700] mt-2'>
                                  Returns
                                </div>
                                <div className='text-[13px]'>
                                  We do not accept returns. Refunds are provided in certain cases. Please email us at care@anandsweets.net  with relevant information and images for assistance.
                                </div>
                            </AccordionTab>
                            <AccordionTab
                                header={
                                    <div className="flex align-items-center justify-between gap-2 w-full">
                                        <div className='flex items-center'>
                                          <span className="font-[500] white-space-nowrap">May We Help ?</span>
                                        </div>
                                        <div className='flex items-center'>
                                          <span>
                                             <i
                                              className="icon text-[28px] transition-transform duration-300 ri-arrow-drop-down-fill"
                                            ></i>
                                          </span>
                                        </div>
                                    </div>
                                  }
                                >
                                <div className='text-[14px] font-[700]'>
                                  You can reach out to us for product related information, bulk inquiries or special requests at care@anandsweets.net
                                </div>
                            </AccordionTab>
                        </Accordion>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="mt-10 text-center">
                <h3 className="text-[#1D2E43] font-[playfair] text-[36px] font-bold">Elevating The Culinary Experience</h3>
                <p className="text-gray-500">By exquisite sourcing, impeccable craftsmanship</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {[
                    { title: "Quality Assurance", desc: "Certified, sourced ingredients, unparalleled authenticity.", icon: "" },
                    { title: "Purity in Every Bite", desc: "All products are free of artificial flavours or added preservatives.", icon: "" },
                    { title: "Crafting Authenticity", desc: "We hire our karigars, maintaining our high standards for product excellence", icon: "" },
                    { title: "Worldwide Shipping", desc: "We adhere to global hygiene standards.", icon: "" },
                ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                    <div className="text-4xl"><i className={`${item.icon}`}></i></div>
                    <h4 className="font-[playfair] text-[#1D2E43] text-[1.3rem]">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>

        <div className="mt-24">
          <ShopOurSnackRange title="Shop Our Snack Range"/> 
        </div>

        <div>
          <Footer/>
        </div>
    </>
  )
}

export default ProductDescription