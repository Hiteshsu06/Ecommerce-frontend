import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductBuyCard from '../Components/ProductBuyCard';
import 'swiper/css/bundle';

const DashboardProducts = () => {
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

  return (
    <div className="p-10">
        <h1 className="text-3xl font-bold pb-10">Premium</h1>
        <Swiper
            spaceBetween={10}
            slidesPerView={4}
            allowTouchMove={true}
            loop={true}
            >
            {category.map((item) => (
                <SwiperSlide key={item.id}>
                    <ProductBuyCard data={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default DashboardProducts