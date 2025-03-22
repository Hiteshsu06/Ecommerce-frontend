import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import RangeCard from '../Components/RangeCard';
import 'swiper/css/bundle';

const ShopOurRange = () => {
    const category = [
        {
            id: 1,
            name: "Gifting",
            numberOfItems: 23,
            imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Gifting.gif?v=1712296982&width=360'
        },
        {
            id: 2,
            name: "Dry Fruits",
            numberOfItems: 11,
            imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Dry_Fruits_3fe07210-51c4-4120-b01c-49c27b8eb02b.png?v=1713446653&width=360'
        },
        {
            id: 3,
            name: "Biscottis",
            numberOfItems: 6,
            imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Biscottis.png?v=1713446652&width=360'
        },
        {
            id: 4,
            name: "Guilt Free",
            numberOfItems: 19,
            imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Guilt_Free_65937c6e-a8e3-4a76-92a1-ff12efab4168.png?v=1713446652&width=360'
        },
        {
            id: 5,
            name: "Snacks",
            numberOfItems: 26,
            imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Snacks.gif?v=1712297272&width=360'
        },
        {
            id: 6,
            name: "Sweets",
            numberOfItems: 55,
            imageUrl: 'https://www.anandsweets.in/cdn/shop/files/Sweets.gif?v=1712297301&width=360'
        }
    ];

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold pb-10">Shop Our Range</h1>
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                allowTouchMove={true}
                loop={true}
                >
                {category.map((item) => (
                    <SwiperSlide key={item.id}>
                        <RangeCard data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ShopOurRange;
