// components
import ButtonComponent from "@common/ButtonComponent";
import InputTextComponent from "@common/InputTextComponent";
import { allApiWithHeaderToken } from "@api/api";

// external libraries
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import Loading from '@common/Loading';
import Dropdown from "@common/DropdownComponent";
import UserFormModal from "../User/UserFormModal";

const structure = {
  user: "",
  coupon: "",
  phoneNumber: "",
  products:[{ product: "", qty: "" }],
  taxPrice: "",
  handlingFee: "",
  // Customer address
  flatLandmark: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  // Shop address 
  shopLandmark: "",
  shopCity: "",
  shopState: "",
  shopZipCode: "",
  shopCountry: "",
};

const OrderForm = () => {
  const { t } = useTranslation("msg");
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(structure);
  const [userList, setUserList] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [billingAddressList, setBillingAddressList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const toast = useRef(null);
  const [couponChecked, setCouponChecked] = useState(false);
  const [products, setProducts] = useState([{ id: 1, product: "", qty: "" }]); //For Multiple Product mapping
  const [productList, setProductList] = useState([]); 
  const [finalTotal, setFinalTotal] = useState({
    totalPrice: 0,
    discount: 0,
    couponPrice: 0,
    finalPrice: 0
  });


  const validationSchema = yup.object().shape({
    user: yup.object().test('non-empty-object', t("user_is_required"), (value) => {
      return value && Object.keys(value).length > 0;
    }),
    coupon: yup.string(),
    phoneNumber: yup.string().required(t("phone_number_is_required")),
    flatLandmark: yup.string().required(t("flat_landmark_is_required")),
    city: yup.string().required(t("city_is_required")),
    state: yup.string().required(t("state_is_required")),
    zipCode: yup.string().required(t("zipcode_is_required")),
    country: yup.string().required(t("country_is_required")),
    shopLandmark: yup.string().required(t("shop_landmark_is_required")),
    shopCity: yup.string().required(t("shop_city_is_required")),
    shopState: yup.string().required(t("shop_state_is_required")),
    shopZipCode: yup.string().required(t("shop_zipCode_is_required")),
    shopCountry: yup.string().required(t("shop_country_is_required")),
    taxPrice: yup.string().required(t("tax_price_is_required")),
    handlingFee: yup.string().required(t("handling_fee_is_required"))
  });

  const onHandleSubmit = async (value) => {
    if (id) {
      // Update
      updateOrder(value);
    } else {
      // Create
      createOrder(value);
    }
  };

  const createOrder = (value) => {
   
    let products = [];

    value?.products?.forEach((item)=>{
      let obj = {
        product_id: Number(item?.product?.id),
        qty: Number(item?.qty)
      };
      products.push(obj);
    });

    let data = {
      user_id: value?.user?.id,
      coupon: value?.coupon,
      tax_price: Number(value?.taxPrice),
      handling_fee: Number(value?.handlingFee),
      billing_address_id: value?.billingAddress?.id,
      payment_status: "Approved",
      order_status: "Delivered",
      payment_mode: "Offline",
      products: products,
      total_price: finalTotal?.finalPrice - finalTotal?.couponPrice + Number(values?.taxPrice) + Number(values?.handlingFee)
    };

    if(value?.address?.id){
      data['shipping_address_id'] = value?.address?.id;
    }else{
      data['shipping_address_details'] = {
        landmark: value?.landmark,
        city: value?.city,
        state: value?.state,
        zip_code: value?.zip_code,
        country: value?.country
      }
    };

    console.log("Result", data)
    setLoader(true);
    allApiWithHeaderToken(API_CONSTANTS.COMMON_ORDER_URL, data , "post")
      .then((response) => {
        console.log("orders",response)
        if (response.status === 201) {
          // navigate(ROUTES_CONSTANTS.ORDERS);
        }
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err?.response?.data?.errors,
          life: 3000,
        });
        setLoader(false);
      }).finally(()=>{
        setLoader(false);
      });
  };

  const updateOrder = (value) => {
    setLoader(true);
    let body = {
      name: value?.name,
      description: value?.description,
      status: Number(value?.status),
    }
    if(value?.image){
      body['image'] = value?.image
    }

    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_SUB_CATEGORIES_URL}/${id}`, body, "put", 'multipart/form-data')
      .then((response) => {
        if (response.status === 200) {
          navigate(ROUTES_CONSTANTS.CATEGORIES);
        } 
      })
      .catch((err) => {
        console.error("err", err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err?.response?.data?.errors,
          life: 3000,
        });
        setLoader(false);
      }).finally(()=>{
        setLoader(false);
      });
  };

  const addProduct = () => {
    setProducts([...products, { id: Date.now(), product: "", qty: "" }]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    }
  };

  const handleBack = () => {
    navigate(ROUTES_CONSTANTS.ORDERS);
  };

  const fetchUserList = async () => {
    setLoader(true);
    try {
      const userResponse = await allApiWithHeaderToken(`${API_CONSTANTS.COMMON_USERS_URL}/filter`,"", "post");
      if (userResponse.status === 200) {
        setUserList(userResponse?.data);
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err?.response?.data?.errors,
        life: 3000,
      });
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const fetchUserAddressList = async (value) => {
    setLoader(true);
    try {
      const addressResponse = await allApiWithHeaderToken(`${API_CONSTANTS.COMMON_ADRESESS_URL}/${value?.id}/get_user_address_list`, "" , "get");
      if (addressResponse.status === 200) {
        setAddressList(addressResponse?.data?.data)
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err?.response?.data?.errors,
        life: 3000,
      });
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const fetchbillingAddressList = async (value) => {
    setLoader(true);
    try {
      const addressResponse = await allApiWithHeaderToken(API_CONSTANTS.COMMON_ADRESESS_URL, "" , "get");
      if (addressResponse.status === 200) {
        setBillingAddressList(addressResponse?.data)
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err?.response?.data?.errors,
        life: 3000,
      });
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const fetchProductList = async () => {
    setLoader(true);
    try {
      const productResponse = await allApiWithHeaderToken(`${API_CONSTANTS.COMMON_PRODUCTS_URL}/active_product`,"", "get");
      if (productResponse.status === 200) {
          setProductList(productResponse?.data);
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err?.response?.data?.errors,
        life: 3000,
      });
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };
  
  const checkCoupon=()=>{
    let data = {
      user_id: values?.user?.id,
      code: values?.coupon
    }
    if(data?.user_id && data?.code){
      setLoader(true);
      allApiWithHeaderToken(`${API_CONSTANTS.COMMON_COUPON_URL}/check_user_coupon`, data , "post")
        .then((response) => {
          if (response.status === 200) {
            console.log("response.",response?.data?.data?.discount_type)
            let discountedValue;

            if(response?.data?.data?.discount_type === 1){
              discountedValue = response?.data?.data?.discount_value;
            }
            else{
              discountedValue = finalTotal?.totalPrice * (response?.data?.data?.discount_value/100);
            }
            setFinalTotal({...finalTotal, couponPrice: discountedValue});
            setCouponChecked(true);
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: response?.data?.message,
              life: 3000,
            });
          }
        })
        .catch((err) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: err?.response?.data?.errors,
            life: 3000,
          });
          setLoader(false);
        }).finally(()=>{
          setLoader(false);
        });
    }else{
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "User or Coupon missing",
        life: 3000,
      });
    }
  };

  const clearCoupon=()=>{
    setFieldValue('coupon', "");
    setCouponChecked(false);
  }

  useEffect(() => {
    fetchProductList();
    fetchUserList();
    fetchbillingAddressList();
  }, [id]);

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const { values, errors, handleSubmit, handleChange, setFieldValue, touched } = formik;

  useEffect(() => {
    let obj =  {
      totalPrice:0 ,
      discount: 0,
      finalPrice: 0
    }
    values?.products.forEach((item)=>{
      if(!obj?.totalPrice){
        obj['totalPrice'] = item?.product?.price * item?.qty;
        obj['discount'] = item?.product?.discounted_price * item?.qty;
        obj['finalPrice'] = item?.product?.final_price * item?.qty;
      }
      else{
        obj['totalPrice'] = obj['totalPrice'] + (item?.product?.price * item?.qty);
        obj['discount'] = obj['discount'] + item?.product?.discounted_price * item?.qty;
        obj['finalPrice'] = obj['finalPrice'] + item?.product?.final_price * item?.qty;
      }
    });
    setFinalTotal({...finalTotal,...obj});
}, [formik.values.products]);

  return (
    <div className="min-h-[80vh] bg-BgPrimaryColor py-4">
    {loader && <Loading/>}
    <Toast ref={toast} position="top-right" style={{scale: '0.7'}} />
    <div className="mx-4 sm:mx-16 my-auto bg-BgSecondaryColor border rounded border-BorderColor">
      <div className="mt-8">
        <label className="text-[14px] text-TextSecondaryColor ms-[4px] font-[600] px-8">{t("user_details")}</label>
        <div className="grid h-fit w-full grid-cols-4 gap-4 px-8 py-4">
          <div className="col-span-4 md:col-span-1">
            <div className="flex gap-2 items-end">
              <Dropdown 
                value={values?.user}
                onChange={(field, value) => {
                  setFieldValue(field, value);
                  setFieldValue("phoneNumber",value?.phone_number)
                  fetchUserAddressList(value);
                }}
                data= {userList}
                placeholder={t("select_customer")}
                name="user"
                editable ={true}
                error={errors?.user}
                touched={touched?.user}
                className="col-span-2 w-full ps-3 rounded border-[1px] border-[#ddd] custom-dropdown focus:outline-none"
                optionLabel="name"
              />
              <ButtonComponent
                onClick={() => setVisible(true)} 
                type="submit"
                icon="ri-add-large-fill"
                className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
              />
            </div>
          </div>
          <div className="col-span-4 md:col-span-1">
            <Dropdown
              value={values?.address}
              onChange={(field, value) => {
                setFieldValue(field, value);
                setFieldValue("country",value?.country);
                setFieldValue("city",value?.city);
                setFieldValue("flatLandmark",value?.flat_no + " " + value?.landmark);
                setFieldValue("state",value?.state);
                setFieldValue("zipCode",value?.zip_code); 
              }}
              type="text"
              label={t("address")}
              placeholder={t("address")}
              name="address"
              className="col-span-2 w-full ps-3 rounded border-[1px] border-[#ddd] custom-dropdown focus:outline-none"
              data={addressList}
              error={errors?.address}
              touched={touched?.address}
              optionLabel="landmark"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.phoneNumber}
              onChange={handleChange}
              type="number"
              placeholder={t("phone_number")}
              name="phoneNumber"
              isLabel={true}
              error={errors?.phoneNumber}
              touched={touched?.phoneNumber}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.flatLandmark}
              onChange={handleChange}
              type="text"
              placeholder={t("flat_no_landmark")}
              name="flatLandmark"
              isLabel={true}
              error={errors?.flatLandmark}
              touched={touched?.flatLandmark}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.city}
              onChange={handleChange}
              type="text"
              placeholder={t("city")}
              name="city"
              isLabel={true}
              error={errors?.city}
              touched={touched?.city}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.zipCode}
              onChange={handleChange}
              type="number"
              placeholder={t("zip_code")}
              name="zipCode"
              isLabel={true}
              error={errors?.zipCode}
              touched={touched?.zipCode}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.state}
              onChange={handleChange}
              type="text"
              placeholder={t("state")}
              name="state"
              isLabel={true}
              error={errors?.state}
              touched={touched?.state}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.country}
              onChange={handleChange}
              type="text"
              placeholder={t("country")}
              name="country"
              disabled={true}
              isLabel={true}
              error={errors?.country}
              touched={touched?.country}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center py-8">
        <hr className="w-[95%]"/>
      </div>
      <div>
        <label className="text-[14px] text-TextSecondaryColor ms-[4px] font-[600] px-8">{t("shop_billing_address")}</label>
        <div className="grid h-fit w-full grid-cols-4 gap-4 px-8 py-4">
          <div className="col-span-4 md:col-span-1">
            <Dropdown
              value={values?.billingAddress}
              onChange={(field, value) => {
                setFieldValue(field, value);
                setFieldValue("shopCountry",value?.country);
                setFieldValue("shopCity",value?.city);
                setFieldValue("shopLandmark",value?.flat_no + " " + value?.landmark);
                setFieldValue("shopState",value?.state);
                setFieldValue("shopZipCode",value?.zip_code); 
              }}
              type="text"
              label={t("billing_address")}
              placeholder={t("billing_address")}
              name="billingAddress"
              className="col-span-2 w-full ps-3 rounded border-[1px] border-[#ddd] custom-dropdown focus:outline-none"
              data={billingAddressList}
              error={errors?.billingAddress}
              touched={touched?.billingAddress}
              optionLabel="landmark"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.shopLandmark}
              onChange={handleChange}
              type="text"
              placeholder={t("shop_landmark")}
              name="shopLandmark"
              disabled={true}
              isLabel={true}
              error={errors?.shopLandmark}
              touched={touched?.shopLandmark}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.shopCity}
              onChange={handleChange}
              type="text"
              placeholder={t("shop_city")}
              name="shopCity"
              disabled={true}
              isLabel={true}
              error={errors?.shopCity}
              touched={touched?.shopCity}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.shopState}
              onChange={handleChange}
              type="text"
              placeholder={t("shop_state")}
              name="shopState"
              disabled={true}
              isLabel={true}
              error={errors?.shopState}
              touched={touched?.shopState}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.shopZipCode}
              onChange={handleChange}
              type="number"
              placeholder={t("shop_zip_code")}
              name="shopZipCode"
              disabled={true}
              isLabel={true}
              error={errors?.shopZipCode}
              touched={touched?.shopZipCode}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <InputTextComponent
              value={values?.shopCountry}
              onChange={handleChange}
              type="text"
              placeholder={t("shop_country")}
              name="shopCountry"
              disabled={true}
              isLabel={true}
              error={errors?.shopCountry}
              touched={touched?.shopCountry}
              className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center py-8">
        <hr className="w-[95%]"/>
      </div>
      <div className="grid h-fit w-full grid-cols-4 gap-4 pe-8">
        <div className="col-span-3 md:col-span-3">
            <div className="grid h-fit w-full grid-cols-3 gap-4 ps-8">
              <div className="col-span-4 md:col-span-1">
                <div className="flex gap-2 items-end relative">
                  <InputTextComponent
                    value={values?.coupon}
                    onChange={handleChange}
                    type="text"
                    placeholder={t("coupon")}
                    name="coupon"
                    disabled={couponChecked}
                    isLabel={true}
                    error={errors?.coupon}
                    touched={touched?.coupon}
                    className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
                  />
                  {
                    couponChecked ?
                      <>
                        <i className="ri-checkbox-circle-line text-[24px] text-[green] absolute right-[4rem] top-[24px]"></i>
                        <ButtonComponent
                          onClick={() => { clearCoupon() }}
                          type="submit"
                          icon="ri-delete-bin-5-line"
                          className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
                        />
                      </>
                      :
                      <ButtonComponent
                        onClick={() => checkCoupon()}
                        type="submit"
                        icon="ri-loop-right-fill"
                        className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
                      />
                  }
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <InputTextComponent
                  value={values?.taxPrice}
                  onChange={handleChange}
                  type="text"
                  placeholder={t("tax_price")}
                  name="taxPrice"
                  isLabel={true}
                  error={errors?.taxPrice}
                  touched={touched?.taxPrice}
                  className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
                />
              </div>
              <div className="col-span-4 md:col-span-1">
                <InputTextComponent
                  value={values?.handlingFee}
                  onChange={handleChange}
                  type="text"
                  placeholder={t("handling_fee")}
                  name="handlingFee"
                  isLabel={true}
                  error={errors?.handlingFee}
                  touched={touched?.handlingFee}
                  className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
                />
              </div>
              <div className="col-span-5 md:col-span-3">
                {products.map((product, index) => (
                  <div key={product.id} className="my-auto grid grid-cols-4 gap-4">
                    <div className="col-span-4 md:col-span-2">
                      <Dropdown
                        value={values?.products[index]?.product || ""}  // Default to "" if undefined
                        onChange={(field, value) => {
                          setFieldValue(`products[${index}].product`, value);
                        }}
                        data={productList}
                        placeholder={t("select_product")}
                        name={`products[${index}].product`}
                        editable={true}
                        error={errors?.products?.[index]?.product}
                        touched={touched?.products?.[index]?.product}
                        className="col-span-2 w-full ps-3 rounded border-[1px] border-[#ddd] custom-dropdown focus:outline-none"
                        optionLabel="name"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <InputTextComponent
                        value={values?.products[index]?.qty || ""}  // Default to "" if undefined
                        onChange={(e) => {
                          const updatedQty = e.target.value;
                          setFieldValue(`products[${index}].qty`, updatedQty);
                        }}
                        type="text"
                        placeholder={t("qty")}
                        name={`products[${index}].qty`}
                        isLabel={true}
                        error={errors?.products?.[index]?.qty}
                        touched={touched?.products?.[index]?.qty}
                        className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-1 flex items-end gap-2">
                      <InputTextComponent
                        value={values?.products[index]?.product?.price}  // Display product price correctly
                        type="text"
                        placeholder={t("price")}
                        disabled={true}
                        name={`products[${index}].product.price`}
                        isLabel={true}
                        className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
                      />
                      {/* Add / Remove Buttons */}
                      {products.length > 1 && (
                        <ButtonComponent
                          onClick={() => {
                            removeProduct(index);
                          }}
                          icon="ri-subtract-line"
                          className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
                        />
                      )}

                      {index === products.length - 1 && (
                        <ButtonComponent
                          onClick={addProduct}
                          icon="ri-add-line"
                          className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
        <div className="col-span-1 md:col-span-1 mb-4">
          <div className="col-span-3 md:col-span-1">
            <h6>Final Product Details</h6>
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
              <tbody>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 text-left border-b border-gray-300">Total Price</th>
                  <td className="p-3 text-right border-b border-gray-300 font-semibold">₹{finalTotal?.totalPrice || 0}</td>
                </tr>
                <tr>
                  <th className="p-3 text-left border-b border-gray-300">Discount</th>
                  <td className="p-3 text-right border-b border-gray-300 text-red-500">-₹{finalTotal?.discount || 0}</td>
                </tr>
                <tr>
                  <th className="p-3 text-left border-b border-gray-300">Coupon</th>
                  <td className="p-3 text-right border-b border-gray-300 text-green">-₹{finalTotal?.couponPrice || 0}</td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border-b border-gray-300">Tax</th>
                  <td className="p-3 text-right border-b border-gray-300">+₹{values?.taxPrice || 0}</td>
                </tr>
                <tr>
                  <th className="p-3 text-left border-b border-gray-300">Handling Fee</th>
                  <td className="p-3 text-right border-b border-gray-300">+₹{values?.handlingFee || 0}</td>
                </tr>
                <tr className="bg-gray-200 font-bold">
                  <th className="p-3 text-left">Final Price</th>
                  <td className="p-3 text-right text-green-600">₹{(finalTotal?.finalPrice - finalTotal?.couponPrice + Number(values?.taxPrice) + Number(values?.handlingFee)) || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <UserFormModal header={t("create_user")} draggable={false} visible={visible} width="50vw" onHide={()=> {setVisible(!visible)}}/>
          </div>
          <div className="col-span-2"></div>
          <div className="mt-4 flex justify-end gap-4">
            <ButtonComponent
              onClick={() => handleBack()}
              type="button"
              label={t("back")}
              className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
            />
            <ButtonComponent
              onClick={() => handleSubmit()}
              type="submit"
              label={id ? t("update") : t("submit")}
              className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrderForm;
