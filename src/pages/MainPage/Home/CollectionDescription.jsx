import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import ProductBuyCard from '../Components/ProductBuyCard';
import ShopOurSnackRange from '../Components/ShopOurSnackRange';
import Footer from "../Footer";
import { allApi } from "@api/api";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { useNavigate, useParams } from "react-router-dom";

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

const features = [
{ icon: "ri-truck-line", text: "National Shipping in 3-5 days" },
{ icon: "ri-timer-line", text: "15 Days Shelf Life" },
{ icon: "ri-earth-line", text: "International Shipping in 5-7 Days" },
{ icon: "ri-leaf-line", text: "No Preservatives" },
];

const categories = [
    {
      image: "https://www.anandsweets.in/cdn/shop/files/Dry_Fruits_3fe07210-51c4-4120-b01c-49c27b8eb02b.png?v=1713446653&width=360", // Replace with actual image path
      name: "All Products",
      count: "90 Products",
    },
    {
      image: "https://www.anandsweets.in/cdn/shop/files/Dry_Fruits_3fe07210-51c4-4120-b01c-49c27b8eb02b.png?v=1713446653&width=360",
      name: "Sweets",
      count: "43 Products",
    },
    {
      image: "https://www.anandsweets.in/cdn/shop/files/Dry_Fruits_3fe07210-51c4-4120-b01c-49c27b8eb02b.png?v=1713446653&width=360",
      name: "Indian Biscotti",
      count: "6 Products",
    },
    {
      image: "https://www.anandsweets.in/cdn/shop/files/Dry_Fruits_3fe07210-51c4-4120-b01c-49c27b8eb02b.png?v=1713446653&width=360",
      name: "Guilt Free",
      count: "17 Products",
    },
    {
      image: "https://www.anandsweets.in/cdn/shop/files/Dry_Fruits_3fe07210-51c4-4120-b01c-49c27b8eb02b.png?v=1713446653&width=360",
      name: "Tea Time Snacks",
      count: "18 Products",
    },
    {
      image: "https://www.anandsweets.in/cdn/shop/files/Dry_Fruits_3fe07210-51c4-4120-b01c-49c27b8eb02b.png?v=1713446653&width=360",
      name: "Namkeen",
      count: "11 Products",
    },
];

const category = [
    {
        id: 1,
        name: "TRAVANCORE Dry Fruits Wooden Box",
        variant: [
          {
            weight: '100 gram',
            discountedPrice: '590',
            actualPrice: '700',
          },
          {
            weight: '1 kg',
            discountedPrice: '1,190',
            actualPrice: '1,400',
          },
          {
            weight: '2 kg',
            discountedPrice: '2,190',
            actualPrice: '2,500',
          }
        ],
        imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Gifting.gif?v=1712296982&width=360'
    },
    {
        id: 2,
        name: "Anand Royal Baklava Celebration Tin Pack",
        variant: [
          {
            weight: '100 gram',
            discountedPrice: '1,190',
            actualPrice: '1200',
          },
          {
            weight: '1 kg',
            discountedPrice: '1,190',
            actualPrice: '1200',
          }
        ],
        imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Dry_Fruits_3fe07210-51c4-4120-b01c-49c27b8eb02b.png?v=1713446653&width=360'
    },
    {
        id: 3,
        name: "Biscottis",
        variant: [
          {
            weight: '100 gram',
            discountedPrice: '1,190',
            actualPrice: '1200',
          },
          {
            weight: '1 kg',
            discountedPrice: '1,190',
            actualPrice: '1200',
          },
        ],
        imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Biscottis.png?v=1713446652&width=360'
    },
    {
        id: 4,
        name: "Guilt Free",
        variant: [
          {
            weight: '100 gram',
            discountedPrice: '1,190',
            actualPrice: '1200',
          },
          {
            weight: '1 kg',
            discountedPrice: '1,190',
            actualPrice: '1200',
          },
        ],
        imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Guilt_Free_65937c6e-a8e3-4a76-92a1-ff12efab4168.png?v=1713446652&width=360'
    },
    {
        id: 5,
        name: "Snacks",
        variant: [
          {
            weight: '100 gram',
            discountedPrice: '1,190',
            actualPrice: '1200',
          },
          {
            weight: '1 kg',
            discountedPrice: '1,190',
            actualPrice: '1200',
          },
        ],
        imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Snacks.gif?v=1712297272&width=360'
    },
    {
        id: 6,
        name: "Sweets",
        variant: [
          {
            weight: '100 gram',
            discountedPrice: '1,190',
            actualPrice: '1200',
          },
          {
            weight: '1 kg',
            discountedPrice: '1,190',
            actualPrice: '1200',
          },
        ],
        imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Sweets.gif?v=1712297301&width=360'
    }
];

const CollectionDescription = () => {
  const { name } = useParams();
  const [loader, setLoader] = useState(false);
  const [categoryDescriptionData, setCategoryDescriptionData] = useState([]);

  useEffect(()=>{
      setLoader(true);
        allApi(API_CONSTANTS.ALL_CATEGORY_URL, "", "get")
        .then((response) => {
          if(response?.status === 200){
            setCategoryDescriptionData(response?.data)
          }
        })
        .catch((err) => {
          setLoader(false);
        }).finally(()=> {
          setLoader(false);
        });
  },[]);

  return (
    <>
        <Navbar categories={allCategories} fix={true}/>
        <div className="bg-[#fdfaf2] text-center py-8">
            {/* Breadcrumb */}
            <nav className="text-gray-600 text-[16px]">
                <span>Home</span> <span className='px-4'>&gt;</span> <span className="text-gray-600">Indian Biscotti</span>
            </nav>

            {/* Product Count */}
            <h2 className="font-[600] text-lg mt-2"><span className='font-[Tektur]'>6</span> Products</h2>

            {/* Features Section */}
            <div className="flex justify-evenly items-center mt-6 w-full">
                {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                    {/* Icon Wrapper */}
                    <div className="w-14 h-14 bg-[#b89550] text-white flex items-center justify-center rounded-full text-2xl">
                    <i className={`${feature.icon}`}></i>
                    </div>
                    {/* Feature Text */}
                    <p className="mt-2 text-black text-[1rem] font-[600]">{feature.text}</p>
                </div>
                ))}
            </div>
        </div>

        <div className="bg-[#fdfaf2] py-8 px-4">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                {categories.map((category, index) => (
                <div key={index} className="text-center">
                    {/* Image */}
                    <div className="relative">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-40 object-cover rounded-xl shadow-md"
                    />
                    </div>
                    {/* Text */}
                    <h3 className="mt-3 text-lg font-semibold font-[playfair] text-gray-600">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                </div>
                ))}
            </div>
        </div>

        <div className='grid grid-cols-2 gap-4 p-4'>
            {category?.map((item)=>{
                return(
                    <ProductBuyCard data={item} imageHeight="48rem"/>
                )
            })}
        </div>

        <div className="mt-24">
          <ShopOurSnackRange title="Shop Other Categories"/> 
        </div>

        <div>
          <Footer/>
        </div>
    </>
  )
}

export default CollectionDescription