import React, { useState, useEffect } from 'react';
import ShopOurRange from './ShopOurRange';
import HeroSection from './HeroSection';
import AvailablityPlatform from './AvailablityPlatform';
import Benifits from './Benifits';
import LatestBlog from '../Components/LatestBlog';
import OurStory from '../Components/OurStory';
import ShopOurSnackRange from '../Components/ShopOurSnackRange';
import TrustUs from '../Components/TrustUs';
import Speciality from '../Components/Speciality';
import DashboardProducts from './DashboardProducts';
import Collection from './Collection';
import { allApi } from "@api/api";
import { API_CONSTANTS } from "../../../constants/apiurl";

const HomePage = () => {
  const [loader, setLoader] = useState(false);
  const [snacksRangeData, setSnacksRangeData] = useState([]);
  const [specialityData, setSpecialityData] = useState([]);
  const [giftingCollectionData, setGiftingCollectionData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  
  useEffect(()=>{
    getAllCategoryData();
    getGiftingCollectionData();
    getSpecialityData();
    getSnackData();
    getAllProducts();
  },[]);

  const getAllCategoryData=()=>{
    setLoader(true);
    allApi(API_CONSTANTS.ALL_CATEGORY_URL, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setAllCategories(response?.data)
      }
    })
    .catch((err) => {
      setLoader(false);
    }).finally(()=> {
      setLoader(false);
    });
  }

  const getSpecialityData=()=>{
    setLoader(true);
    allApi(API_CONSTANTS.SPECIALITY_CATEGORY_URL, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setSpecialityData(response?.data)
      }
    })
    .catch((err) => {
      setLoader(false);
    }).finally(()=> {
      setLoader(false);
    });
  }

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

  const getGiftingCollectionData=()=>{
    setLoader(true);
    allApi(API_CONSTANTS.GIFTING_CATEGORY_URL, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setGiftingCollectionData(response?.data)
      }
    })
    .catch((err) => {
      setLoader(false);
    }).finally(()=> {
      setLoader(false);
    });
  }

  const getAllProducts=()=>{
    setLoader(true);
    allApi(API_CONSTANTS.ALL_PRODUCTS_URL, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setAllProducts(response?.data)
      }
    })
    .catch((err) => {
      setLoader(false);
    }).finally(()=> {
      setLoader(false);
    });
  }

  return (
    <>
      <HeroSection/>
      <ShopOurRange data={allCategories}/>
      <Benifits/>
      <DashboardProducts data={allProducts}/>
      <Collection data={giftingCollectionData}/>
      <Speciality data={specialityData}/>
      <TrustUs />
      <ShopOurSnackRange title="Shop Our Snacks Range" data={snacksRangeData}/>  
      <OurStory/>
      <LatestBlog/>
      <AvailablityPlatform/>
    </>
  )
}

export default HomePage