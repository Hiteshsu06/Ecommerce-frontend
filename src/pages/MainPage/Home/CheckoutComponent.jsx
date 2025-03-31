import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-center justify-between border-b pb-4 mb-4">
      {/* Product Image */}
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-md" />
        <div className="ml-3">
          <p className="text-[14px]">{item.name}</p>
          <span className="text-gray-500 text-sm font-[Tektur]">{item.weight}</span>
            {/* Quantity Control */}
            <div className="flex items-center border rounded-lg w-fit">
              <button
                className="p-1 text-gray-600 bg-[#e7e7e7]"
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              >
                <i className="ri-subtract-line text-[12px]"></i>
              </button>
              <span className="p-1 font-[Tektur] w-[25px] text-center text-[12px]">{item.quantity}</span>
              <button
                className="p-1 text-gray-600 bg-[#e7e7e7]"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              >
                <i className="ri-add-line text-[12px]"></i>
              </button>
            </div>
        </div>
      </div>

      {/* Price and Remove Button */}
      <div className="flex items-center space-x-4">
        <span className="font-semibold font-[Tektur]">₹{item.price}</span>
        <button onClick={() => onRemove(item.id)}>
          <i className="ri-delete-bin-line text-gray-500 text-lg"></i>
        </button>
      </div>
    </div>
  );
};

const CheckoutComponent = () => {
  const [phone, setPhone] = useState("");
  const [toggle, setToggle] = useState(false);
  
  const accordianHandler=()=>{
    setToggle(!toggle)
  };

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Motichur Laddu",
      weight: "200g",
      quantity: 10,
      price: 1950,
      image: "https://via.placeholder.com/50", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Kaju Katli",
      weight: "200g",
      quantity: 1,
      price: 325,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Jaggery Kaju Katli 200g",
      weight: "200g",
      quantity: 1,
      price: 345,
      image: "https://via.placeholder.com/50",
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
        <Accordion className='custom-checkout-accordian-header' onTabOpen={accordianHandler} onTabClose={accordianHandler}>
            <AccordionTab
                header={
                    <div className="flex align-items-center justify-between gap-2 w-full">
                        <div className='flex items-center'>
                          <i class="ri-shopping-cart-line text-[18px] me-2"></i>
                          <span className="font-[500] white-space-nowrap">Order Summary</span>
                        </div>
                        <div className='flex items-center'>
                          <span className='font-[Tektur] me-2 font-[500]'>12</span>
                          <span className='me-1 font-[500]'>items</span>
                          <span>
                             <i
                              className={`icon text-[28px] transition-transform duration-300 ${toggle ? "ri-arrow-drop-down-fill" : "ri-arrow-drop-up-fill"}`}
                            ></i>
                          </span>
                        </div>
                    </div>
                  }
                >
                <div className="bg-white">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                      />
                    ))}

                    {/* Subtotal and Shipping */}
                    <div className="border-t pt-4 mt-4 text-gray-700">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Subtotal</span>
                        <span className="font-semibold">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Shipping</span>
                        <span>Calculated at next step</span>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="flex justify-between font-semibold text-lg mt-4">
                      <span>Total</span>
                      <span>₹{subtotal}</span>
                    </div>
                </div>
            </AccordionTab>
        </Accordion>
        <div className="w-full mx-auto mt-2">
          {/* Coupon Code Input */}
          <div className="relative mb-2 bg-white border rounded">
            <i className='ri-price-tag-3-line absolute left-4 top-4 text-[19px]'></i>
            <input
              type="text"
              placeholder="Enter coupon code"
              className="w-full pl-11 pr-4 py-4 rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Phone Input */}
          <div className="flex bg-white items-center border rounded-lg p-2 mb-4 focus-within:ring-2 focus-within:ring-gray-400">
            <span className="flex items-center space-x-2">
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India Flag"
                className="w-6 h-4"
              />
              <span className="text-gray-700">+91</span>
            </span>
            <input
              type="tel"
              className="ml-2 py-2 flex-1 border-none focus:outline-none"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Add Address Button */}
          <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800">
            Add address
          </button>

          {/* Checkbox */}
          <div className="flex items-center justify-center mt-4">
            <input type="checkbox" className="mr-2" checked/>
            <label htmlFor="offers" className="text-gray-700 text-[12px]">
              Keep me posted about sales and offers
            </label>
          </div>

          {/* Icons (Mockup for bottom icons) */}
          <div className="text-center text-gray-600 text-sm mt-6 pb-16">
            {/* Delivery and Shipping Icons */}
            <div className="flex justify-center space-x-6 mb-3">
              <div className="flex flex-col items-center">
                <i className="ri-truck-line text-2xl"></i>
                <span className='text-[12px]'>Delivers in 5-7 days</span>
              </div>
              <div className="flex flex-col items-center">
                <i className="ri-global-line text-2xl"></i>
                <span className='text-[12px]'>Shipping Worldwide</span>
              </div>
            </div>

            {/* Terms & Privacy */}
            <p className="text-xs mt-12">
              By proceeding, I accept the{" "}
              <span className="font-semibold text-[#382C2C]">T&C</span> and{" "}
              <span className="font-semibold text-[#382C2C]">Privacy Policy</span>
            </p>
          </div>
        </div>
    </>
  )
}

export default CheckoutComponent