// utils
import { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import CheckoutComponent from "@userpage-layouts/CheckoutComponent";
import Navbar from "@userpage/Navbar";
import Loading from '@common/Loading';
import useCartStore from "@store";
import { API_CONSTANTS } from "@constants/apiurl";
import { allApi } from "@api/api";

const ViewCart = () => {
  const [cart, setCart] = useState([]);
  const [visible, setVisible] = useState(false);
  const setTrigger = useCartStore((state) => state.setTrigger);
  const [menuList, setMenuList] = useState([]);
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity <= 0
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => {
        const updatedCart = prevCart.filter((item) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Sync with localStorage
        return updatedCart; // Update the state
    });
    setTrigger(); // Trigger re-render
};

  const subtotal = cart.reduce((acc, item) => acc + Number(item.discountedPrice) * item.quantity, 0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    fetchMenuList();
    setCart(savedCart);
  }, []);

  // Sync cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const fetchMenuList = () => {
    setLoader(true);
    allApi(API_CONSTANTS.MENU_LIST_URL, "" , "get")
    .then((response) => {
      if (response.status === 200) {
          let data = response?.data;
          data.push({name: "About Us"});
          setMenuList(data);
          setLoader(false);
      } 
    })
    .catch((err) => {
      setLoader(false);
    }).finally(()=>{
      setLoader(false);
    });
  };

  return (
    <>
      {loader ? <Loading/> : <>
        <Navbar data={menuList}/>
        <div className="p-6 w-full mt-[5rem]">
        <h1 className="text-[36px] font-bold text-center mb-4 text-[#1D2E43] font-[playfair]">{t("shopping_cart")}</h1>
        <div className="flex justify-center mb-12 text-gray-600">
          <p className="text-[13px] text-[#1D2E43]"><span onClick={()=>{ navigate("/") }}></span> {t("home")} <span className="px-2">&gt;</span>{t("your_shopping_cart")}</p>
        </div>
        <div className="border-t w-full">
          <table className="w-full text-left">
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr className="border-b">
                <th className="p-3">{t("product")}</th>
                <th className="p-3 text-center">{t("discounted_price")}</th>
                <th className="p-3 text-center">{t("actual_price")}</th>
                <th className="p-3 text-center">{t("quantity")}</th>
                <th className="p-3 text-end">{t("total")}</th>
              </tr>
              {cart.map((item) => (
                <tr key={item?.id} className="border-b">
                  <td className="p-3 flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16" />
                    <div>
                      <p className="font-semibold text-[18px]">{item.name}</p>
                      <p className="text-sm">{t("weight")} : <span className="font-[Tektur]">{item.weight}</span></p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="underline text-sm text-gray-500"
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-[16px] font-[Tektur] text-center">₹ {item.discountedPrice}</td>
                  <td className="p-3 text-[16px] font-[Tektur] text-center">{item.discountedPrice < item.actualPrice ? "₹" + " " + item.actualPrice : "-"}</td>
                  <td className="p-3 text-[16px] text-center">
                    <div className="w-full h-full flex justify-center items-start">
                      <div className="flex items-center border rounded w-fit">
                        <button
                          onClick={() => updateQuantity(item.id, -1)} disabled={item?.quantity <= 1}
                          className="px-2 py-1 bg-gray-200"
                        >
                          −
                        </button>
                        <span className="px-4 font-[Tektur]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-[16px] font-[Tektur] text-end">₹ { Number(item.discountedPrice) * item.quantity}</td>
                </tr>
              ))}
            </thead>
          </table>
        </div>
        <div className="flex justify-end mt-16">
          <div className="p-4">
            {/* Subtotal & Price */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{t("subtotal")}</h2>
              <p className="text-lg font-bold">₹ {subtotal}</p>
            </div>
            
            {/* Tax & Shipping Info */}
            <p className="text-sm text-gray-600 mb-4">
              {t("tax_included")}
            </p>

            {/* Checkout Button */}
            <button className="w-full bg-[#C7A756] text-white font-semibold py-3 rounded-md uppercase" onClick={()=>{setVisible(true)}}>
              {t("checkout")}
            </button>
          </div>
        </div>
        <Dialog header="Checkout" blockScroll={true} visible={visible} style={{ width: '30vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
          <CheckoutComponent />
        </Dialog>
        </div>
      </>}
    </>
  );
};

export default ViewCart;

