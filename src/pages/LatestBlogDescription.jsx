// Libararies
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// Components
import { refactorPrefilledDate } from '@helper';
import Navbar from "@userpage/Navbar";
import Footer from "@userpage/Footer";

const LatestBlogDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("msg");
  const { image_url, heading, description, createdAt } = location.state || {};
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

  return (
    <div>
      <Navbar categories={allCategories} fix={true}/>
      <div className='px-24 relative'>
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