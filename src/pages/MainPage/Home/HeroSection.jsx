const HeroSection = () => {

    const Hero = {
        name: "Introducing",
        description: "Healthy Indulgences mode with Millets, Nuts and Contain No Refined Sugar.",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        navigateUrl: "/dashboard",
        navigateText: "Shop Now",
        subsection: {
            title: "Excellence In Every Morsel",
            description: "With over three decades of expertise in the art of crafting heritage sweets, Anand Sweets has been a symbol of quality and tradition, dedicated to one singular goal - a commitment to bringing the authentic taste of Royal India to your homes."
        }
    }

    return (
        <>
            <a className="hero-section flex box-border justify-center items-center max-sm:flex-col">
                <div className="hero-section-image w-[60%] h-[560px] max-sm:w-full max-sm:h-[300px] max-md:w[50%]">
                    <img src={Hero.imageUrl} alt="hero" className="w-full h-full object-cover" />
                </div>

                <div className="hero-section-text w-[40%] flex justify-center flex-col p-[5rem] max-sm:w-full max-sm:p-[2rem]">
                    <div className="hero-section-text-heading pb-6">
                        <h1 className="text-5xl font-sans font-semibold">
                            <span>{Hero.name}</span>
                        </h1>
                    </div>

                    <div className="hero-section-text-para pb-6">
                        <p>
                            <span> {Hero.description}</span>
                        </p>
                    </div>

                    <div className="hero-section-text-button rounded-sm"></div>
                        <button className="hero-section-text-button text-lg w-fit py-2 px-4 rounded-md bg-[#c5a238] text-white uppercase" >
                            <span>{Hero.navigateText}</span>
                        </button>
                </div>
            </a>
            <div className="hero-sub-section w-full flex flex-col justify-center items-center h-[250px]">
                <div className="hero-sub-section-heading w-[50%] pb-6">
                    <h1 className="text-3xl font-sans font-semibold text-center">{Hero.subsection.title}</h1>
                </div>
                <div className="hero-sub-section-text w-[50%]">
                    <p className="text-center">{Hero.subsection.description}</p>
                </div>
            </div>
        </>
    )
}

export default HeroSection