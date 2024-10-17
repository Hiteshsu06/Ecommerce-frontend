const ShopOurSnackRange = () => {
    return (
        <section className="relative h-[660px]">
            <div className="absolute w-full h-[345px] z-0 inset-0 bg-[#ede9dd]">
            </div>
            <div className="relative flex flex-col justify-center items-center">
                <h1 className="text-3xl font-sans font-semibold text-center mt-10">Shop Our Snacks Range</h1>
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 px-20 py-10 justify-center items-center z-10">
                    <a href="/" className="w-[254px] h-[425px]  rounded-xl flex flex-col items-center justify-center">
                        <div>
                            <img src="https://www.anandsweets.in/cdn/shop/files/South_Indian_Special-1.png?v=1713501854&width=360" alt="Snacks" />
                        </div>
                        <div>
                            <p className="font-bold text-xl my-4">South Indian Special</p>
                        </div>
                    </a>
                    <a href="/" className="w-[254px] h-[425px]  rounded-xl flex flex-col items-center justify-center">
                        <div>
                            <img src="https://www.anandsweets.in/cdn/shop/files/Indian_Bakery_2_76ee5112-e656-4414-947d-8a55b88313cd.png?v=1723613638&width=360" alt="Snacks" />
                        </div>
                        <div>
                            <p className="font-bold text-xl my-4">Indian Bakery</p>
                        </div>
                    </a>

                    <a href="/" className="w-[254px] h-[425px]  rounded-xl flex flex-col items-center justify-center">
                        <div>
                            <img src="https://www.anandsweets.in/cdn/shop/files/Tea_Time_Snacks_2.png?v=1713501938&width=360" alt="Snacks" />
                        </div>
                        <div>
                            <p className="font-bold text-xl my-4">Tea Time Snacks</p>
                        </div>
                    </a>

                    <a href="/" className="w-[254px] h-[425px]  rounded-xl flex flex-col items-center justify-center">
                        <div>
                            <img src="https://www.anandsweets.in/cdn/shop/files/Indian_BISCOTTIS_2.png?v=1713501922&width=360" alt="Snacks" />
                        </div>
                        <div>
                            <p className="font-bold text-xl my-4">Indian Biscottis</p>
                        </div>
                    </a>

                    <a href="/" className="w-[254px] h-[425px]  rounded-xl flex flex-col items-center justify-center">
                        <div>
                            <img src="https://www.anandsweets.in/cdn/shop/files/North_Indian_Special_2.png?v=1713501887&width=360" alt="Snacks" />
                        </div>
                        <div>
                            <p className="font-bold text-xl my-4">North Indian Specials</p>
                        </div>
                    </a>
                </div>
            </div>


        </section>

    )

}

export default ShopOurSnackRange