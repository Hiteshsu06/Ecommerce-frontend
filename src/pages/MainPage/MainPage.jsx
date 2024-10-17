import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from './Home/HomePage';

const MainPage = () => {
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
      <Navbar categories={allCategories}/>
      <HomePage/>
      <Footer/>
    </div>
  )
}

export default MainPage