const Benifits = () => {
    const benifit = [
        {
            title: "Loved By India",
            description: "Loved by 5 lakh+ customers",
            image: "https://www.anandsweets.in/cdn/shop/files/Loved_By_India.svg?v=1712037938"
        },
        {
            title: "Handmade",
            description: "Every piece is made with love",
            image: "https://www.anandsweets.in/cdn/shop/files/Hand_made_Icon_6ff6bffb-fab7-4bb7-9c15-f1e9115bdf78.svg?v=1713347545"
        },
        {
            title:"Ships In 1-2 Days",
            description: "Write to us to expedite your order",
            image: "https://www.anandsweets.in/cdn/shop/files/Ships_In_1-2_Days.svg?v=1712038768"
        },
        {
            title: "No Preservatives",
            description: "Pure taste, naturally fresh",
            image: "https://www.anandsweets.in/cdn/shop/files/No_Preservatives.svg?v=1712038843"
        }
    ]
    return (
        <div className="w-full p-10 bg-[rgb(175,32,55)] flex justify-center items-center">
            <div className="w-full h-full flex justify-center items-center">
                        {benifit.map((item)=>{
                            return(
                                <div className="w-[30%] h-full flex flex-col justify-center items-center" key={item.title}>
                                    <img src={item.image} alt="Benifit" className="w-[60px] h-[60px] mb-4"/>
                                    <h1 className="text-white text-normal font-bold">{item.title}</h1>
                                    <p className="text-white text-normal">{item.description}</p>
                                </div>
                            )
                        })}
            </div>
        </div>
    )
}

export default Benifits