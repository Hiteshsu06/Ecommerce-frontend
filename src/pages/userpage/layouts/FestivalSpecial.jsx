// Utils
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper/modules';

// components
import { FestivalSpecialFooter } from '@constants/shopdata.js';
import Image from "@common/Image";

const FestivalSpecial = ({data}) => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                loop={true}
                pagination={{
                clickable: true,
                }}
                modules={[EffectFade, Pagination]}
                className="mySwiper w-full h-[80vh]"
                >
                {
                    data?.map((item)=>{
                        return(
                            <SwiperSlide key={item?.id}>
                            <Image src={item?.image_url} alt={item?.name} className='block w-full'/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <div className="hero-sub-section w-full flex flex-col justify-center items-center h-[250px]">
                <div className="hero-sub-section-heading w-[80%] pb-6">
                    <h1 className="text-[2.5rem] text-[#1D2E43] font-semibold text-center font-[playfair]">{FestivalSpecialFooter?.title}</h1>
                </div>
                <div className="hero-sub-section-text w-[60%]">
                    <p className="text-center">{FestivalSpecialFooter?.description}</p>
                </div>
            </div>
        </>
    )
}

export default FestivalSpecial;