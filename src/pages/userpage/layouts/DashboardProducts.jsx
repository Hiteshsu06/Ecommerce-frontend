// Libraries
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from "react-i18next";
import 'swiper/css/bundle';

// Components
import ProductBuyCard from '@userpage-components/ProductBuyCard';

const DashboardProducts = ({data}) => {
  const { t } = useTranslation("msg");

  return (
    <div className="p-10">
        <h1 className="text-[36px] font-bold text-left mb-12 text-[#1D2E43] font-[playfair]">{t("wide_products_range")}</h1>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            allowTouchMove={true}
            loop={true}
            >
            {data.map((item) => (
                <SwiperSlide key={item?.id}>
                    <ProductBuyCard data={item} />
                </SwiperSlide>
            ))}
        </Swiper>
        <div className='mt-24 flex justify-center'>
          <button className="relative px-6 text-[1.1rem] py-2 text-white bg-black rounded-md transition-all duration-300 border-[3px] border-transparent hover:border-yellow-500">
            {t("explore_now")}
          </button>
        </div>
    </div>
  )
}

export default DashboardProducts;