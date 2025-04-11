// utils
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';

const Speciality = ({data}) => {
    const { t } = useTranslation("msg");
    return (
        <div className="w-full bg-white my-12">
            <div className=" flex 2 bg-[#ede9dd]">
                <div className="w-[35%] py-24 pl-[2rem]">
                    <div className="card flex flex-col justify-start items-start border-[#af2037] border-l-8 rounded-md p-12">
                        <img src="https://cdn.shopify.com/s/files/1/0569/3456/4001/files/Guilt_Free_Sweets_top_icon_8e04c652-9c48-4fdd-92ed-440d9ef25c5d.svg?v=1709719757" alt="desgin"  />
                        <h1 className="text-[2.5rem] font-bold pb-2 text-[#1D2E43] font-[playfair]">{t("our_speciality")}</h1>
                        <p className="mb-4">{t("our_speciality_desc")}</p>
                        <button className="px-8 py-2 text-white bg-[#caa446] rounded-md transition-all duration-300 border border-transparent hover:bg-transparent hover:text-yellow-600 hover:border-yellow-600">
                            {t("see_all")}
                        </button>
                    </div>
                </div>
                <div className="w-[55%] relative">
                    <div className='absolute top-[-16px] w-[62vw]'>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={2.5}
                        allowTouchMove={true}
                        loop={true}
                        >
                            {data.map((item) => (
                                <SwiperSlide key={item?.id}>
                                    <div className="flex flex-col cursor-pointer select-none ">
                                        <div className='flex-shrink-0 h-[520px] relative  rounded-lg overflow-hidden bg-white shadow-md card aspect-[0.7171875]'>
                                            <img
                                                src={item?.image_url}
                                                className="w-full h-full object-cover "
                                                alt={item?.name}
                                                draggable="false"
                                            />
                                            <h1 className='absolute bottom-5 text-center left-[50%] translate-x-[-50%] text-white text-[20px] font-[700]'>{item?.name}</h1>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Speciality;