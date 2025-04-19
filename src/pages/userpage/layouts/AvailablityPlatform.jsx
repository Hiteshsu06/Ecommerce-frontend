const AvailablityPlatform = () => {
    const platform =  [
        {
            name: "Zomato",
            url: "https://www.zomato.com/bangalore/anand-sweets-and-savouries-commercial-street-bangalore/order",
            logo: "https://www.anandsweets.in/cdn/shop/files/zomato-1.svg?v=1686135486&width=360"
        },
        {
            name: "Swiggy Instamart",
            url: "https://www.swiggy.com/instamart",
            logo: "https://www.anandsweets.in/cdn/shop/files/instamart-1.svg?v=1686135487&width=360"
        },
        {
            name: "Amazon",
            url: "https://www.amazon.in/stores/ANAND/page/643B7F56-A14E-403F-A482-C32E71A196C1?ref_=ast_bln&store_ref=bl_ast_dp_brandLogo_sto",
            logo: "https://www.anandsweets.in/cdn/shop/files/amazon_88159abc-ad8d-448f-9ef9-d1e85a78faf2.svg?v=1687432347"
        },
        {
            name: "Swiggy",
            url: "https://www.swiggy.com/restaurants/anand-sweets-and-savouries-commercial-street-shivajinagar-bangalore-15905",
            logo: "https://www.anandsweets.in/cdn/shop/files/swiggy-1.svg?v=1686135486&width=360"
        },
        {
            name: "Zepto",
            url: "https://www.zeptonow.com/",
            logo: "https://www.anandsweets.in/cdn/shop/files/zepto-1.svg?v=1686135486&width=360"   
        },
        {
            name: "Blinkit",
            url: "https://blinkit.com/",
            logo: "https://www.anandsweets.in/cdn/shop/files/blinkit-1.svg?v=1686135486&width=360"
        }
    ];

    return (
        <div className="flex flex-col justify-center items-center p-6 sm:p-10">
            <h1 className="font-semibold font-[playfair] text-[2.5rem] text-[#1D2E43] text-center">We Are Also Available On</h1>
            <p className="text-[16px] font-medium pt-2 font-[playfair] text-[#464646] text-center">Same day delivery in Bangalore</p>
            <div className="flex flex-wrap justify-center md:grid md:grid-cols-2 lg:grid-cols-6 gap-5 p-5">
                {
                    platform.map((item, index) => {
                        return (
                            <a href={item.url} key={index} className="flex justify-center items-center">
                                <img src={item.logo} alt={item.name} className="max-w-[120px] h-auto aspect-[3.0] object-contain" />
                            </a>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default AvailablityPlatform;