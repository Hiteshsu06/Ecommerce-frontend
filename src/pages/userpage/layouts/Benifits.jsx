// components
import { benifits } from '@constants/shopdata.js';

const Benifits = () => {
    return (
        <div className="w-full p-10 bg-[rgb(175,32,55)] flex justify-center items-center">
            <div className="w-full h-full flex justify-center items-center">
                {benifits?.map((item, i)=>{
                    return(
                    <div key={i} className="w-[30%] h-full flex flex-col justify-center items-center">
                        <img src={item?.image} alt="Benifit" className="w-[60px] h-[60px] mb-4"/>
                        <h1 className="text-white text-normal font-bold">{item?.title}</h1>
                        <p className="text-white text-[0.8rem]">{item?.description}</p>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Benifits