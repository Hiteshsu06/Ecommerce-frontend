import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';

import { FestivalSpecialFooter } from '@constants/shopdata.js';
import Image from "@common/Image";

const FestivalSpecial = ({ data }) => {
  return (
    <div className={`${data?.length > 0 ? "" : 'hidden'}`}>
      <Swiper
        spaceBetween={30}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1500}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false
        }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="mySwiper w-full h-[60vh] md:h-[70vh] lg:h-[80vh]"
      >
        {data?.map((item) => (
          <SwiperSlide key={item?.id}>
            <Image
              src={item?.image_url}
              alt={item?.name}
              className="block w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-sub-section w-full flex flex-col justify-center items-center px-4 py-10 md:py-16 bg-[#fafafa]">
        <div className="hero-sub-section-heading w-full md:w-[80%] pb-4 md:pb-6">
          <h1 className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] text-[#1D2E43] font-semibold text-center font-[playfair]">
            {FestivalSpecialFooter?.title}
          </h1>
        </div>
        <div className="hero-sub-section-text w-full sm:w-[90%] md:w-[70%] lg:w-[60%]">
          <p className="text-center text-sm sm:text-base text-[#333] leading-relaxed">
            {FestivalSpecialFooter?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FestivalSpecial;