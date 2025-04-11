// Utils
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';

// Components
import ProductCard from '@userpage-component';

const ProductCardSwipper = ({data}) => {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            autoplay={{ delay: 3000 }}
        >
            <SwiperSlide>
                {data.map((item) => (
                    <div className="w-full h-60 bg-gray-200 rounded-lg" key={item?.id}>
                        <ProductCard  data={item}/>
                    </div>
                ))}
            </SwiperSlide>
        </Swiper>
    );
};

export default ProductCardSwipper;