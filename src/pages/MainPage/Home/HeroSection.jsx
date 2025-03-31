import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Pagination } from 'swiper/modules';

const HeroSection = () => {

    const Hero = {
        name: "Introducing",
        description: "Healthy Indulgences mode with Millets, Nuts and Contain No Refined Sugar.",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        navigateUrl: "/dashboard",
        navigateText: "Shop Now",
        subsection: {
            title: "Excellence in Every Bite of Our Sweets, Snacks, and Treats",
            description: "With over three decades of expertise in the art of crafting heritage sweets, Anand Sweets has been a symbol of quality and tradition, dedicated to one singular goal - a commitment to bringing the authentic taste of Royal India to your homes."
        }
    }

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
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-1.jpg" className='block w-full'/>
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-2.jpg" className='block w-full'/>
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-3.jpg" className='block w-full'/>
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-4.jpg" className='block w-full'/>
                </SwiperSlide>
            </Swiper>
            <div className="hero-sub-section w-full flex flex-col justify-center items-center h-[250px]">
                <div className="hero-sub-section-heading w-[80%] pb-6">
                    <h1 className="text-[2.5rem] text-[#1D2E43] font-semibold text-center font-[playfair]">{Hero.subsection.title}</h1>
                </div>
                <div className="hero-sub-section-text w-[60%]">
                    <p className="text-center">{Hero.subsection.description}</p>
                </div>
            </div>
        </>
    )
}

export default HeroSection