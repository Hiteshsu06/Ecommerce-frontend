import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from "react-i18next";
import CollectionCard from '../Components/CollectionCard';

const Collection = ({data}) => {
  const { t } = useTranslation("msg");

  return (
    <div className="p-10">
     <div className="hero-sub-section w-full flex flex-col justify-center items-center h-[250px]">
        <div className="hero-sub-section-heading w-[80%] pb-2">
            <h1 className="text-[2.5rem] text-[#1D2E43] font-semibold text-center font-[playfair]">{t("gifting_collection_heading")}</h1>
        </div>
        <div className="hero-sub-section-text w-[50%]">
            <p className="text-center">{t("gifting_collection_heading_description")}</p>
        </div>
     </div>
     <Swiper
        spaceBetween={10}
        slidesPerView={3}
        allowTouchMove={true}
        loop={true}
        >
        {data.map((item) => (
            <SwiperSlide key={item.id}>
                <CollectionCard data={item} />
            </SwiperSlide>
        ))}
    </Swiper>
    </div>
  )
}

export default Collection