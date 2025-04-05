// utils
import { useState, useEffect } from 'react';

// components
import LatestBlog from '@userpage-components/LatestBlog';
import OurStory from '@userpage-components/OurStory';
import ShopOurSnackRange from '@userpage-components/ShopOurSnackRange';
import TrustUs from '@userpage-components/TrustUs';
import Speciality from '@userpage-components/Speciality';
import ShopOurRange from '@userpage-layouts/ShopOurRange';
import FestivalSpecial from '@userpage-layouts/FestivalSpecial';
import AvailablityPlatform from '@userpage-layouts/AvailablityPlatform';
import Benifits from '@userpage-layouts/Benifits';
import DashboardProducts from '@userpage-layouts/DashboardProducts';
import Collection from '@userpage-layouts/Collection';
import { allApi } from "@api/api";
import { API_CONSTANTS } from "@constants/apiurl";

const HomePage = () => {
  const [loader, setLoader] = useState(false);
  const [snacksRangeData, setSnacksRangeData] = useState([]);
  const [specialityData, setSpecialityData] = useState([]);
  const [giftingCollectionData, setGiftingCollectionData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
    setLoader(true);
    const promises = [
      getAllCategoryData(),
      getGiftingCollectionData(),
      getSpecialityData(),
      getSnackData(),
      getAllProducts()
    ]
    const settledResults = await Promise.allSettled(promises);
    if(settledResults){
      setLoader(false);
    }
  }

  const getAllCategoryData=()=>{
    return allApi(API_CONSTANTS.ALL_CATEGORY_URL, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setAllCategories(response?.data)
      }
    })
    .catch((err) => {
    }).finally(()=> {
    });
  }

  const getSpecialityData=()=>{
    return allApi(API_CONSTANTS.SPECIALITY_CATEGORY_URL, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setSpecialityData(response?.data)
      }
    })
    .catch((err) => {
    }).finally(()=> {
    });
  }

  const getSnackData=()=>{
    return allApi(API_CONSTANTS.SNACK_RANGE_URL, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setSnacksRangeData(response?.data)
      }
    })
    .catch((err) => {
    }).finally(()=> {
    });
  }

  const getGiftingCollectionData=()=>{
    return allApi(API_CONSTANTS.GIFTING_CATEGORY_URL, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setGiftingCollectionData(response?.data)
      }
    })
    .catch((err) => {
    }).finally(()=> {
    });
  }

  const getAllProducts=()=>{
    return allApi(API_CONSTANTS.ALL_PRODUCTS_URL, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setAllProducts(response?.data)
      }
    })
    .catch((err) => {
    }).finally(()=> {
    });
  }

  return (
    <>
      <FestivalSpecial/>
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

export default HomePage;