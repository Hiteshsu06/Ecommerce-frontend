// Utils
import { useTranslation } from "react-i18next";
import { useState } from 'react';

// components
import { shopdata } from '@constants/shopdata.js';
import { API_CONSTANTS } from "@constants/apiurl";
import { allApi } from "@api/api";

const Footer = () => {
    const { t } = useTranslation("msg");
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");

    const getCategoryProducts = () =>{
        let body = {
            email: email
        };
        allApi(API_CONSTANTS.SUBSCRIBE_USER_BY_MAIL_URL, body, "post")
        .then((response) => {
            if(response?.status === 200){
                setErrorMessage(response?.data?.message);
            }
            else{
                setErrorMessage("");
            }
            setSubmitted(true);
            setEmail("");
        })
        .catch((err) => {
        }).finally(()=> {
        });
    }

    return (
        <footer className="w-full py-2">
            <div className="w-full bg-[#fffbf5] px-10 py-10">
                <div
                    className="flex items-center justify-center lg:justify-between flex-col lg:flex-row gap-7 lg:gap-0 border-b border-[#b69754]">
                    <a href={shopdata?.website} className="flex justify-center lg:justify-start">
                        <img src={shopdata?.logo} className="w-[154px]" alt={shopdata?.title} />
                    </a>
                    <div
                        className="flex items-center gap-2 px-7 ">
                        <img src={shopdata?.logo2} alt='' className="w-[100px]" />
                    </div>
                </div>
                <div className="flex justify-between flex-col py-8 min-[500px]:py-14 gap-8 min-[500px]:gap-16 lg:gap-0 lg:flex-row">
                    <div
                        className="flex flex-col items-center max-lg:justify-center min-[500px]:items-start min-[500px]:flex-row gap-8 sm:gap-12 xl:gap-24">
                        {shopdata?.category?.map((item) => {
                            return (
                                <div key={item?.id} className="block">
                                    <h6 className="text-[1rem] text-gray-800 font-bold mb-4 min-[500px]:mb-7 text-center min-[500px]:text-left">
                                        {item?.name}
                                    </h6>
                                    <ul className="grid gap-2 text-center min-[500px]:text-left">
                                        {item?.list?.map((list, i) => {
                                            return (
                                                <li key={list?.id}><a href={list?.url} className="text-gray-600 text-[0.85rem] hover:text-gray-900">{list?.name}</a></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                    <div className="block  md:w-[50%]">
                        <h3
                            className="font-manrope font-semibold text-[1.8rem] text-[#b69754] leading-9 mb-6 text-center lg:text-left font-['M-HEADING-FONT']">{t("we_happy_to_assist_you")}</h3>
                        <div
                            className="lg:bg-gray-100 lg:rounded-lg lg:h-16 lg:p-1.5 lg:flex-row gap-6 lg:gap-0 flex-col flex items-center justify-between">
                            <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e?.target?.value)}}
                                className="py-2 px-6 bg-gray-100 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none flex-1 w-full max-w-xl mx-auto lg:w-auto lg:py-5 lg:px-7 lg:bg-transparent"
                                placeholder="Enter email address" />
                            <button 
                                type="button" 
                                onClick={()=>{
                                getCategoryProducts();
                                }}
                                className="py-3.5 px-7 bg-[#b69754] shadow-md rounded-lg text-white font-semibold hover:bg-[#9a8048]">{t("subscribe")}</button>
                        </div>
                        {
                            submitted ? <span className="text-[#b69754] text-[0.8rem]">{errorMessage ? errorMessage : "Your email has been subscribed"}</span> : null
                        }
                        <div className='shop-detail w-full flex gap-28 mt-8'>
                            <div className="timing">
                                <p className='text-[1rem] text-gray-800 font-bold pb-4'>{t("timing")}:</p>
                                <div className=" text-gray-600 text-[0.85rem] hover:text-gray-900">{shopdata?.timing?.days}</div>
                                <div className=" text-gray-600 text-[0.85rem] hover:text-gray-900">{shopdata?.timing?.time}</div>
                            </div>
                            <div className="email">
                                <p className='text-[1rem] text-gray-800 font-bold pb-4'>{t("email")}:</p>
                                <a href={`mailto:${shopdata?.email}`} className="no-underline text-gray-600 text-[0.85rem] hover:text-gray-900">{shopdata?.email}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-5 px-10 border-t border-gray-200">
                <div className="flex items-center justify-center flex-col gap-8 lg:gap-0 lg:flex-row lg:justify-between">
                    <span className="text-sm text-gray-500 ">© {new Date().getFullYear()} {t("copyright")} <a href={shopdata?.website}>{shopdata?.title}</a>, {t("all_rights_reserved")}</span>
                    <div className="flex mt-4 space-x-4 sm:justify-center sm:mt-0 ">
                        {
                            shopdata.social.map((item, index) => {
                                return (
                                    <a
                                        href={item?.url}
                                        key={item?.id}
                                        className="w-9 h-9 rounded-full text-white bg-[#b69754] flex justify-center items-center hover:#9a8048">
                                        <i className={item?.icon}></i>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;