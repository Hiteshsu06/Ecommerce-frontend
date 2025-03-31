import React, { useState } from 'react'

const ProductBuyCard = ({ data, imageHeight }) => {
  const [discountedPrice, setDiscountedPrice] = useState(data?.variants[0]?.discounted_price);
  const [actualPrice, setActualPrice] = useState(data?.variants[0]?.actual_price);
    
  const changeHandler=(e)=>{
    let obj = data?.variant.find((item)=> item?.weight === e?.target?.value)
    setDiscountedPrice(obj?.discountedPrice);
    setActualPrice(obj?.actualPrice);
  };

  return (
    <div className="flex flex-col select-none">
        <div style={{ height: imageHeight ? `${imageHeight}` : "18rem" }} className={`flex-shrink-0 w-full rounded-lg overflow-hidden bg-white shadow-md card aspect-[0.7171875]`}>
            <img
                src={data?.image_url}
                className="w-full h-full object-cover"
                alt={data?.name}
                draggable="false"
            />
        </div>
        <div className='mt-2'>
            <div className='text-[#242323] text-lg font-semibold truncate '>{data?.name}</div>
            <div className='text-[#242323] font-semibold text-[18px] mt-1 font-[Tektur]'>
                <span>₹ {discountedPrice}</span>
                <span className='ms-4 text-gray-500 font-thin line-through'>₹ {actualPrice}</span>
            </div>
        </div>
        <select onChange={changeHandler} class="border-2 pe-2 border-[#caa446] hover:cursor-pointer mt-2 bg-[#fffaf0] text-gray-700 rounded-md px-4 py-3 focus:outline-none font-[Tektur]">
           {data?.variants.map((item)=>{
            return(
                <option>{item?.weight}</option>
            )
           })}
        </select>

        <div class="flex items-center gap-2 mt-2">
            <div class="flex items-center border-2 border-[#caa446] rounded-md overflow-hidden">
                <button class="px-3 py-2 text-lg hover:bg-gray-200 w-fit" onclick="decreaseQty()">−</button>
                    <span id="quantity" class="px-4 py-2 text-lg font-[Tektur] w-fit">1</span>
                <button class="px-3 py-2 text-lg hover:bg-gray-200 w-fit" onclick="increaseQty()">+</button>
            </div>

            <button class="bg-[#caa446] hover:bg-[#b29238] w-full text-white font-semibold border border-black px-4 py-2 rounded-md h-full">
                Add to cart
            </button>
        </div>
    </div>
  )
}

export default ProductBuyCard