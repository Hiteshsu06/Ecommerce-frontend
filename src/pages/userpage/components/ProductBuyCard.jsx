// Utils
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import { ROUTES_CONSTANTS } from "@constants/routesurl";
import useCartStore from '@store';
import Image from "@common/Image";

const ProductBuyCard = ({ data, imageHeight }) => {
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [discountedPrice, setDiscountedPrice] = useState(data?.variants[0]?.discountedPrice);
  const [actualPrice, setActualPrice] = useState(data?.variants[0]?.actualPrice);
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  const setTrigger = useCartStore((state) => state.setTrigger);
    
  const changeHandler=(e)=>{
    let obj = data?.variants?.find((item)=> item?.weight === e?.target?.value);
    setWeight(e?.target?.value);
    setDiscountedPrice(obj?.discountedPrice);
    setActualPrice(obj?.actualPrice);
  };

  const productDescription=(item)=>{
    navigate(
        `${ROUTES_CONSTANTS.VIEW_PRODUCT_DESCRIPTION}/${item?.name}`, 
    { 
    state: { 
            id: item?.id,
            name: item?.name, 
            description: item?.description,
            image_url: item?.image_url, 
            variants: item?.variants,
            shelf_life: item?.shelf_life,
            subCategoryName: item?.subCategoryName
        } 
    })
  };

  const addCartHandler=(item)=>{
    let product = {
        id: item?.id,
        name: item?.name,
        weight: weight ? weight : item?.variants[0]?.weight,
        image: item?.image_url,
        quantity: 1,
        actualPrice: actualPrice ? actualPrice : item?.variants[0]?.actualPrice,
        discountedPrice: discountedPrice ? discountedPrice : item?.variants[0]?.discountedPrice
    };

    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists
    const existingProductIndex = cart.findIndex(
      (p) => p.id === product.id && p.weight === product.weight
    );

    if (existingProductIndex !== -1) {
      // If exists, increment quantity
      cart[existingProductIndex].quantity += quantity;
    } else {
      // If not exists, add new product
      cart.push(product);
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    setTrigger();
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col select-none">
        <div style={{ height: imageHeight ? `${imageHeight}` : "18rem" }} className={`flex-shrink-0 w-full rounded-lg overflow-hidden bg-white shadow-md card aspect-[0.7171875]`}>
            <Image
                src={data?.image_url}
                className="w-full h-full object-cover hover:cursor-pointer"
                alt={data?.name}
                height={100}
                onClick={() => { productDescription(data) }}
            />
        </div>
        <div className='mt-2'>
            <div className='text-[#242323] text-[1.1rem] font-semibold truncate '>{data?.name}</div>
            <div className='text-[#242323] font-semibold text-[1rem] mt-1 font-[Tektur]'>
                <span>₹ {discountedPrice}</span>
                { discountedPrice < actualPrice ? <span className='ms-4 text-gray-500 font-thin line-through'>₹ {actualPrice}</span> : null}
            </div>
        </div>
        <select onChange={changeHandler} className="border pe-2 border-[#caa446] hover:cursor-pointer mt-2 bg-[#fffaf0] text-gray-700 rounded-md px-4 py-2 focus:outline-none font-[Tektur]">
           {data?.variants.map((item)=>{
            return(
                <option className='text-[1rem]'>{item?.weight}</option>
            )
           })}
        </select>

        <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center border border-[#caa446] rounded-md overflow-hidden min-w-[113px]">
                <button className="px-3 py-2 text-[1rem] hover:bg-gray-200 w-fit" onClick={decreaseQty}
                    disabled={quantity <= 1}>−</button>
                    <span id="quantity" className="px-4 py-2 text-[1rem] font-[Tektur] w-fit">1</span>
                <button className="px-3 py-2 text-[1rem] hover:bg-gray-200 w-fit" onClick={increaseQty}>+</button>
            </div>

            <button 
                onClick={()=>{ 
                    addCartHandler(data);
                }} 
                className="bg-[#caa446] text-[1rem] hover:bg-[#b29238] w-full text-white font-semibold border border-black px-4 py-2 rounded-md h-full">
                {t("add_to_cart")}
            </button>
        </div>
    </div>
  )
}

export default ProductBuyCard