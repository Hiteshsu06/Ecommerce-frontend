const OurStory = () => {
    return (
        <section className="text-gray-600 body-font overflow-hidden p-6 sm:px-10">
            <div className="w-full">
                <div className="mx-auto flex flex-wrap">
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded mb-6 lg:mb-0"
                        src="https://www.anandsweets.in/cdn/shop/files/Our_Story_b0bf13d1-2e54-441f-b746-a283961772a9.png?v=1713447083&width=720"
                    />
                    <div className="lg:w-1/2 w-full flex flex-col lg:pl-10 lg:py-6 justify-center">
                        <h1 className="text-[2rem] sm:text-[2.5rem] text-[#1D2E43] font-[playfair] font-bold mb-8">
                            Our Story
                        </h1>
                        <p className="leading-relaxed text-[16px] sm:text-[18px]">
                            Anand's success stems from its blend of tradition, innovation, and unwavering quality.
                            Its dynamism is fueled by a continuous effort to revamp products and packaging to align
                            with the evolving demographics of India.
                        </p>
                        <p className="leading-relaxed mt-4 text-[16px] sm:text-[18px]">
                            Anand is dedicated to authenticity, sourcing ingredients like saffron from Kashmir for
                            Malpua and paneer from Delhi for savory delights, proving that great taste knows no
                            boundaries.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;