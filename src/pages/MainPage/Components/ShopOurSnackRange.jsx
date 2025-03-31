import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";

const ShopOurSnackRange = ({title, data}) => {
    const navigate = useNavigate();
    const snackDescription=(item)=>{
        navigate(
            ROUTES_CONSTANTS.VIEW_BLOG_DESCRIPTION, 
            { 
            state: { 
                image_url: item?.image_url, 
                heading: item?.heading, 
                description: item?.description,
                createdAt: item?.created_at
            } })
    };

    return (
        <section className="relative h-[660px]">
            <div className="absolute w-full h-[345px] z-0 inset-0 bg-[#ede9dd]">
            </div>
            <div className="relative flex flex-col justify-center items-center">
                <h1 className="text-[#1D2E43] font-[playfair] text-[36px] font-bold text-center mt-10">{title}</h1>
                <div className="grid xl:grid-cols-5 gap-5 px-10 py-10 justify-center items-center z-10">
                    {data?.map((item)=>{
                        return(
                            <a key={item?.id} onClick={() => snackDescription(item)} className="grid-cols-1 rounded-xl flex flex-col items-center justify-center hover:cursor-pointer">
                                <div>
                                    <img src={item?.image_url} alt="Snacks" />
                                </div>
                                <div>
                                    <p className="font-bold text-xl my-4">{item?.name}</p>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )

}

export default ShopOurSnackRange