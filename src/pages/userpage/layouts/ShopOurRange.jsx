// utils
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from "react-i18next";
import 'swiper/css/bundle';

// components
import RangeCard from '@userpage-components/RangeCard';

const ShopOurRange = ({data}) => {
    const { t } = useTranslation("msg");

    return (
        <div className="p-10">
            <h1 className="text-[2.5rem] font-bold pb-10 text-[#1D2E43] font-[playfair]">{t("shop_our_range")}</h1>
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                allowTouchMove={true}
                loop={true}
                >
                {data.map((item) => (
                    <SwiperSlide key={item.id}>
                        <RangeCard data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ShopOurRange;
