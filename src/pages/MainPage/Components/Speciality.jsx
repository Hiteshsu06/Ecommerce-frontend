import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
let data = [
    {
        id: 1,
        name: "Gifting",
        imageUrl: "https://www.anandsweets.in/cdn/shop/files/Gifting.gif?v=1712296982&width=360"
    },
    {
        id: 2,
        name: "Dry Fruits",
        imageUrl: "https://www.anandsweets.in/cdn/shop/files/Dry_Fruits_3fe07210-51c4-4120-b01c-49c27b8eb02b.png?v=1713446653&width=360"
    },
    {
        id: 3,
        name: "Biscottis",
        imageUrl: "https://www.anandsweets.in/cdn/shop/files/Biscottis.png?v=1713446652&width=360"
    },
]

const Speciality = () => {
    return (
        <div className="container bg-white my-12">
            <div className=" flex 2 bg-[#ede9dd]">
                <div className="w-[35%] py-24 pl-24">
                    <div className="card flex flex-col justify-start items-start border-[#af2037] border-l-8 rounded-md p-12">
                        <img src="https://cdn.shopify.com/s/files/1/0569/3456/4001/files/Guilt_Free_Sweets_top_icon_8e04c652-9c48-4fdd-92ed-440d9ef25c5d.svg?v=1709719757" alt="desgin"  />
                        <h1 className="text-3xl font-sans font-semibold py-2">Our Speciality</h1>
                        <p className="mb-4">handmade sweet confections that always get a little more love!</p>
                        <button className="btn px-4 py-2 text-white bg-[#af2037] rounded-md">See All</button>
                    </div>
                </div>
                <div className="w-[55%] relative">
                    <div className='absolute top-[-25px] w-[62vw]'>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={2.5}
                        allowTouchMove={true}
                        loop={true}
                        >
                            {data.map((item) => (
                                <SwiperSlide key={item.id}>
                                <div className="flex flex-col cursor-pointer select-none ">
                                <div className='flex-shrink-0 h-[520px] relative  rounded-lg overflow-hidden bg-white shadow-md card aspect-[0.7171875]'>
                                    <img
                                        src={item?.imageUrl}
                                        className="w-full h-full object-cover "
                                        alt={item?.name}
                                        draggable="false"
                                    />
                                    <h1 className='absolute bottom-5 text-center left-[50%] translate-x-[-50%] text-white text-xl font-sans font-semibold] '>{item?.name}</h1>
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