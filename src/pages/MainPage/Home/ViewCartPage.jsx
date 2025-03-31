import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import CheckoutComponent from "../Home/CheckoutComponent";
import Navbar from "../Navbar";

const ViewCart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Motichur Laddu",
      weight: "200g",
      price: 195,
      quantity: 1,
      image: "https://via.placeholder.com/100", // Replace with actual image
    },
    {
      id: 1,
      name: "Motichur Laddu",
      weight: "200g",
      price: 195,
      quantity: 1,
      image: "https://via.placeholder.com/100", // Replace with actual image
    },
    {
      id: 1,
      name: "Motichur Laddu",
      weight: "200g",
      price: 195,
      quantity: 1,
      image: "https://via.placeholder.com/100", // Replace with actual image
    },
    {
      id: 1,
      name: "Motichur Laddu",
      weight: "200g",
      price: 195,
      quantity: 1,
      image: "https://via.placeholder.com/100", // Replace with actual image
    },
  ]);
  const [visible, setVisible] = useState(false);

  // Increase Quantity
  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove Item
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const allCategories = [
    {name: "Shop All", hover: false, items: [
      {name: "Sweets", hover: false, items: [
              {name: "All Sweets"},
              {name: "Burfi"},
              {name: "Mysore Pak"},
              {name: "Laddu"},
              {name: "Pak"},
      ]},
      {name: "Dry Fruits"},
      {name: "Speciality"},
      {name: "Snacks"},
      {name: "Guilt Free"},
      {name: "Grifting"}
    ]},
    {name: "Sweets"},
    {name: "Namkeen", hover: false, items: [
      {name: "All Namkeen"},
      {name: "Northern Special"},
      {name: "Southern Special"}
    ]},
    {name: "Dry Fruits"},
    {name: "Gifting"},
    {name: "About Us"},
    {name: "Explore & Connect"}
  ]

  return (
    <>
      <Navbar categories={allCategories} fix={true}/>
      <div className="p-6 w-full">
      <h1 className="text-[36px] font-bold text-center mb-4 text-[#1D2E43] font-[playfair]">Shopping Cart</h1>
      <div className="flex justify-center mb-12 text-gray-600">
        <p className="text-[13px] text-[#1D2E43]">Home <span className="px-2">&gt;</span>Your Shopping Cart</p>
      </div>
      <div className="border-t w-full">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3" style={{width: '40%'}}>Product</th>
              <th className="p-3 text-center" style={{width: '20%'}}>Price</th>
              <th className="p-3 text-center" style={{width: '20%'}}>Quantity</th>
              <th className="p-3 text-end" style={{width: '20%'}}>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3 flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16" />
                  <div>
                    <p className="font-semibold text-[18px]">{item.name}</p>
                    <p className="text-sm">Weight: <span className="font-[Tektur]">{item.weight}</span></p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="underline text-sm text-gray-500"
                    >
                      Remove
                    </button>
                  </div>
                </td>
                <td className="p-3 text-[16px] font-[Tektur] text-center">₹ {item.price}</td>
                <td className="p-3 text-[16px] text-center">
                  <div className="w-full h-full flex justify-center items-start">
                    <div className="flex items-center border rounded w-fit">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 py-1 bg-gray-200"
                      >
                        −
                      </button>
                      <span className="px-4 font-[Tektur]">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2 py-1 bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-[16px] font-[Tektur] text-end">₹ {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-16">
        <div className="p-4">
          {/* Subtotal & Price */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Subtotal</h2>
            <p className="text-lg font-bold">₹ 2,620</p>
          </div>
          
          {/* Tax & Shipping Info */}
          <p className="text-sm text-gray-600 mb-4">
            Tax included. Shipping calculated at checkout.
          </p>

          {/* Checkout Button */}
          <button className="w-full bg-[#C7A756] text-white font-semibold py-3 rounded-md" onClick={()=>{setVisible(true)}}>
            CHECK OUT
          </button>
        </div>
      </div>
      <Dialog header="Checkout" blockScroll={true} visible={visible} style={{ width: '30vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
        <CheckoutComponent />
      </Dialog>
      </div>
    </>
  );
};

export default ViewCart;

