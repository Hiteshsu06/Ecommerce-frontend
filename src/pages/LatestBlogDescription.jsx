// Libararies
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { API_CONSTANTS } from "@constants/apiurl";
import { allApi } from "@api/api";

// Components
import { refactorPrefilledDate } from '@helper';
import Navbar from "@userpage/Navbar";
import Footer from "@userpage/Footer";

const LatestBlogDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("msg");
  const [menuList, setMenuList] = useState([]);
  const { image_url, heading, description, createdAt } = location.state || {};
 
  const fetchMenuList = () => {
    return allApi(API_CONSTANTS.MENU_LIST_URL, "" , "get")
    .then((response) => {
      if (response.status === 200) {
          let data = response?.data;
          data.push({name: "About Us"});
          setMenuList(data)
      } 
    })
    .catch((err) => {
    }).finally(()=>{
    });
  };

  useEffect(()=>{
    fetchMenuList();
  },[])

  return (
    <div>
      <Navbar data={menuList}/>
      <div className='px-24 relative mt-[5rem]'>
        <img src={image_url} alt="blog-img" />
        <div className='bg-white absolute top-[85%] text-center left-[15%] px-12 w-[70%]'>
          <div className='uppercase mt-2'>{t("blogs")}</div>
          <div className='text-[36px] font-bold text-center mb-4 text-[#1D2E43] font-[playfair]'>{heading}</div>
          <div>{refactorPrefilledDate(createdAt)}</div>
        </div>
      </div>
      <div className='mt-32 px-32 leading-snug tracking-wider' dangerouslySetInnerHTML={{ __html: description }}>
      </div>
      <div className='px-32 my-10'>
        <hr />
      </div>
      <div className='px-32 flex gap-4 mb-10'>
        <div><i className="ri-corner-down-left-line text-[20px] hover:cursor-pointer" onClick={()=>{
          navigate("/")
        }}></i></div>
        <div className='text-[18px] hover:cursor-pointer' onClick={()=>{
          navigate("/")
        }}>{t("previous")}</div>
      </div>
      <Footer/>
    </div>
  )
}

export default LatestBlogDescription