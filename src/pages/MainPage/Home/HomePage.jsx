import React from 'react';
import ShopOurRange from './ShopOurRange';
import HeroSection from './HeroSection';
import AvailablityPlatform from './AvailablityPlatform';
import Benifits from './Benifits';
import ProductCardSwipper from '../Components/ProductCardSwipper';
import LatestBlog from '../Components/LatestBlog';
import OurStory from '../Components/OurStory';
import ShopOurSnackRange from '../Components/ShopOurSnackRange';
import TrustUs from '../Components/TrustUs';
import Speciality from '../Components/Speciality';

const HomePage = () => {
  const data = [
    {
      id: 1,
      name: 'Product 1',
      imageUrl: 'https://via.placeholder.com/150',
      hoverUrl: 'https://via.placeholder.com/150',
      numberOfItems: 10,
      price: 100
    }
  ]

  return (
    <>
      <HeroSection/>
      <ShopOurRange/>
      <Benifits/>
      <ShopOurRange/>
      <Speciality/>
      <TrustUs />
      <ShopOurSnackRange/>  
      <OurStory/>
      <LatestBlog/>
      <AvailablityPlatform/>
    </>
  )
}

export default HomePage