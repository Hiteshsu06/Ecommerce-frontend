// Utils
import { lazy } from 'react';

const Navbar = lazy(() => import("@userpage/Navbar"));
const Footer = lazy(() => import("@userpage/Footer"));
const HomePage = lazy(() => import("@userpage-layouts/HomePage"));

const MainPage = () => {

  return (
    <>
      <Navbar/>
      <HomePage/>
      <Footer/>
    </>
  )
}

export default MainPage