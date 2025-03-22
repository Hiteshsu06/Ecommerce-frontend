import React from 'react';
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

const HomePage = () => {

  return (
    <>
      <HeroSection/>
      <ShopOurRange/>
      <Benifits/>
      <ShopOurRange/>
      <DashboardProducts/>
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