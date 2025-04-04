// Utils
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Rating } from "primereact/rating";

// Components
import Navbar from "@userpage/Navbar";
import Footer from "@userpage/Footer";
import CustomerReview from "@userpage-components/CustomerReview";
import ShopOurSnackRange from '@userpage-components/ShopOurSnackRange';
import { allApi } from "@api/api";
import { API_CONSTANTS } from "@constants/apiurl";

const ProductDescription = () => {
  const location = useLocation();
  const { image_url, description, name, variants, subCategoryName, shelf_life } = location?.state || {};
  const [discountedPrice, setDiscountedPrice] = useState(variants[0]?.discountedPrice);
  const [actualPrice, setActualPrice] = useState(variants[0]?.actualPrice);
  const [productWeight, setProductWeight] = useState(variants[0]?.weight);
  const [ features, setFeatures] = useState([]);
  const [loader, setLoader] = useState(false);
  const [snacksRangeData, setSnacksRangeData] = useState([]);
  const { t } = useTranslation("msg");

  useEffect(()=>{
    prefilledData[0].text = shelf_life + " " +  "Days shelf life";
    let data = prefilledData;
    setFeatures(data); 
    getSnackData();
  },[]);

  const prefilledData = [
    {
      icon: "ri-archive-line text-[14px]",
      text: t("25_days_shelf_life"),
    },
    {
      icon: "ri-map-pin-line text-[14px]",
      text: t("5days_delivery_pan_india"),
    },
    {
      icon: "ri-earth-line text-[14px]",
      text: t("international_shipping_available"),
    },
  ];

   const getSnackData=()=>{
    setLoader(true);
    allApi(API_CONSTANTS.SNACK_RANGE_URL, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setSnacksRangeData(response?.data)
      }
    })
    .catch((err) => {
      setLoader(false);
    }).finally(()=> {
      setLoader(false);
    });
  }

  const changeHandler=(weight)=>{
    let obj = variants?.find((item)=> item?.weight === weight);
    setDiscountedPrice(obj?.discountedPrice);
    setActualPrice(obj?.actualPrice);
    setProductWeight(obj?.weight);
  };

  return (
    <>
        <Navbar/>

        <div className="mx-16 p-4">
            {/* Product Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side - Image */}
                <div>
                <img
                    src={image_url}
                    alt="Mysore Pak"
                    className="w-full rounded-lg shadow-lg"
                />
                </div>

                {/* Right Side - Details */}
                <div>
                    <h2 className="text-2xl font-semibold">{name} - {productWeight}</h2>
                    <div className="flex items-center space-x-2 text-yellow-500 mt-2">
                        <Rating value={0} readOnly cancel={false} /> <span className="text-gray-500 ps-4">(0 {t("reviews")})</span>
                    </div>
                    <p className="text-lg font-bold mt-1">₹ {discountedPrice} { discountedPrice < actualPrice ? <span className='ms-4 text-gray-500 font-[600] line-through'>₹ {actualPrice}</span> : null}</p>
                    
                    <div className="flex flex-col mt-8 md:flex-row justify-center gap-8 text-center">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center w-[30%]">
                                <div className="w-8 h-8 flex items-center justify-center bg-[#cca438] text-white rounded-full text-2xl">
                                    <i className={feature.icon}></i>
                                </div>
                                <p className="mt-2 text-gray-700 text-sm">{feature.text}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                      <p className="text-lg font-bold mt-1">{t("weight")}</p>
                      <div className='flex gap-2 mt-2'>
                          {variants?.map((item)=>{
                            return(
                              <div onClick={()=>{ changeHandler(item?.weight)}} className='hover:cursor-pointer font-[600] border-2 border-[#caa446] hover:bg-[#caa446] hover:text-white rounded-md overflow-hidden w-[100px] h-[50px] flex items-center justify-center'>
                                {item?.weight}
                              </div>
                            )
                          })}
                      </div>
                    </div>

                    <div className="w-full mt-12">
                        <div className='flex gap-4'>
                            {/* Quantity Selector */}
                            <div class="flex items-center border-2 border-[#caa446] rounded-md overflow-hidden min-w-[113px]">
                                <button class="px-3 py-2 text-lg hover:bg-gray-200 w-fit h-full" onclick="decreaseQty()">−</button>
                                    <span id="quantity" class="px-4 py-2 text-lg font-[Tektur] w-fit">1</span>
                                <button class="px-3 py-2 text-lg hover:bg-gray-200 w-fit h-full" onclick="increaseQty()">+</button>
                            </div>

                            {/* Add to Cart Button */}
                            <button className="w-full bg-[#cca438] text-white font-medium py-3 rounded-md transition-all duration-300 border-2 hover:bg-white hover:text-[#cca438] hover:border-2 hover:border-[#caa446]">
                              {t("add_to_cart")}
                            </button>
                        </div>

                        {/* Buy it now Button */}
                        <button className="w-full bg-[#cca438] text-white font-medium py-3 rounded-md mt-2 transition-all duration-300 border-2 hover:bg-white hover:text-[#cca438] hover:border-2 hover:border-[#caa446]">
                            {t("buy_it_now")}
                        </button>

                        {/* Info Section */}
                        <div className="mt-4 p-8 rounded-md">
                            {[
                            { icon: "ri-heart-line", text: t("freshly_made_to_order") },
                            { icon: "ri-leaf-line", text: t("preservation_free_day_shelf_life", { days: shelf_life }) },
                            { icon: "ri-gift-line", text: t("premium_safe_packaging") },
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
                                          <span className="font-[500] white-space-nowrap">{t("product_details")}</span>
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
                                  {description}
                                </div>
                            </AccordionTab>
                            <AccordionTab
                                header={
                                    <div className="flex align-items-center justify-between gap-2 w-full">
                                        <div className='flex items-center'>
                                          <span className="font-[500] white-space-nowrap">{t("shipping_and_returns")}</span>
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
                                   {t("shipping")}
                                </div>
                                <div className='text-[13px]'>
                                   {t("shipping_policy")}
                                </div>
                                <div className='text-[14px] font-[700] mt-2'>
                                   {t("returns")}
                                </div>
                                <div className='text-[13px]'>
                                   {t("return_policy")}
                                </div>
                            </AccordionTab>
                            <AccordionTab
                                header={
                                    <div className="flex align-items-center justify-between gap-2 w-full">
                                        <div className='flex items-center'>
                                          <span className="font-[500] white-space-nowrap">{t("may_we_help")}</span>
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
                                  {t("reach_out_for_inquiry")} care@anandsweets.net
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

        <div className="mt-16 p-4">
          <CustomerReview />
        </div>

        <div className="mt-24">
          <ShopOurSnackRange title="Shop Our Snack Range" data={snacksRangeData}/> 
        </div>

        <div>
          <Footer/>
        </div>
    </>
  )
}

export default ProductDescription