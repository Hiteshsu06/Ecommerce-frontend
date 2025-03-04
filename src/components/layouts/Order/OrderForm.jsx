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
import AutocompleteComponent from "../../common/Autocomplete";
import UserFormModal from "../User/UserFormModal";

const structure = {
  user: "",
  address: "",
  coupon: "",
  phoneNumber: ""
};

const OrderForm = () => {
  const { t } = useTranslation("msg");
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(structure);
  const [userList, setUserList] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const toast = useRef(null);
  const [couponChecked, setCouponChecked] = useState(false);
  const [products, setProducts] = useState([{ id: 1, product: "", qty: "" }]);

  const validationSchema = yup.object().shape({
    user: yup.object().test('non-empty-object', t("user_is_required"), (value) => {
      return value && Object.keys(value).length > 0;
    }),
    totalPrice: yup.string().required(t("total_price_is_required")),
    paymentStatus: yup.string().required(t("payment_status_is_required")),
    shippingAddressDetails: yup.object().test('non-empty-object', t("shipping_address_details_is_required"), (value) => {
      return value && Object.keys(value).length > 0;
    }),
    billingAddress: yup.string().required(t("billing_address_is_required")),
    orderStatus: yup.string().required(t("order_status_is_required")),
    products: yup.array()
    .of(
      yup.object().shape({
        product_id: yup.number().required(t("product_id_is_required")),
        quantity: yup.number().positive().integer().required(t("quantity_is_required"))
          .min(1, t("quantity_should_be_at_least_1")),
      })
    )
    .min(1, t("at_least_one_product_is_required"))
    .required(t("products_is_required")),
    coupon: yup.string()
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
    let data = {
      name: value?.name,
      description: value?.description,
      status: 1,
      image: value?.image,
      category_id: value?.categoryType?.id
    }
    setLoader(true);
    allApiWithHeaderToken(API_CONSTANTS.COMMON_SUB_CATEGORIES_URL, data , "post", 'multipart/form-data')
      .then((response) => {
        if (response.status === 201) {
          navigate(ROUTES_CONSTANTS.SUB_CATEGORIES);
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

   // Remove Product Field
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

  const fetchAddressList = async (value) => {
    setLoader(true);
    try {
      const addressResponse = await allApiWithHeaderToken(`${API_CONSTANTS.COMMON_ADRESESS_URL}/get_user_address_list/${value?.id}`, "" , "get");
      if (addressResponse.status === 200) {
        setUserList(addressResponse?.data);
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
            console.log("response.",response)
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
  };

  useEffect(() => {
    fetchUserList();
  }, [id]);

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const { values, errors, handleSubmit, handleChange, setFieldValue, touched } = formik;
  return (
    <div className="flex min-h-[80vh] bg-BgPrimaryColor py-4">
    {loader && <Loading/>}
    <Toast ref={toast} position="top-right" style={{scale: '0.7'}} />
    <div className="mx-4 sm:mx-16 my-auto grid h-fit w-full grid-cols-4 gap-4 bg-BgSecondaryColor p-8 border rounded border-BorderColor">
        <div className="col-span-4 md:col-span-2">
          <div className="flex gap-2 items-end">
            <Dropdown 
              value={values?.user}
              onChange={(field, value) => {
                setFieldValue(field, value);
                setFieldValue("phoneNumber",value?.phone_number)
                fetchAddressList(value);
              }}
              data= {userList}
              placeholder={t("select_user")}
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
          <AutocompleteComponent
            value={values?.address}
            onChange={handleChange}
            type="text"
            label={t("address")}
            placeholder={t("address")}
            name="address"
            data={addressData}
            error={errors?.name}
            touched={touched?.name}
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
            value={values?.country}
            onChange={handleChange}
            type="text"
            placeholder={t("country")}
            name="country"
            isLabel={true}
            error={errors?.country}
            touched={touched?.country}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
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
        <div className="col-span-3"></div>
        <div className="col-span-4 md:col-span-2">
          {products.map((product, index) => (
            <div key={product.id} className="my-auto grid grid-cols-4 gap-4">
              <div className="col-span-4 md:col-span-2">
                <Dropdown 
                    value={values?.product}
                    onChange={handleChange}
                    data= {[]}
                    placeholder={t("select_product")}
                    name="product"
                    editable ={true}
                    error={errors?.product}
                    touched={touched?.product}
                    className="col-span-2 w-full ps-3 rounded border-[1px] border-[#ddd] custom-dropdown focus:outline-none"
                    optionLabel="name"
                  />
              </div>
              <div className="col-span-4 md:col-span-1">
                <InputTextComponent
                  value={values?.qty}
                  onChange={(e) => {
                    const newProducts = [...products];
                    newProducts[index].qty = e.target.value;
                    setProducts(newProducts);
                  }}
                  type="text"
                  placeholder={t("qty")}
                  name="qty"
                  isLabel={true}
                  error={errors?.qty}
                  touched={touched?.qty}
                  className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
                />
              </div>
              <div className="col-span-1 md:col-span-1 flex items-end gap-2">
                {/* Add / Remove Buttons */}
                {products.length > 1 && (
                  <ButtonComponent
                    onClick={() => removeProduct(index)}
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
        <div className="col-span-4 md:col-span-2">
          <h6>Final Product Details</h6>
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <tbody>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left border-b border-gray-300">Total Price</th>
                <td className="p-3 text-right border-b border-gray-300 font-semibold">₹80</td>
              </tr>
              <tr>
                <th className="p-3 text-left border-b border-gray-300">Discount</th>
                <td className="p-3 text-right border-b border-gray-300 text-red-500">-₹5</td>
              </tr>
              <tr>
                <th className="p-3 text-left border-b border-gray-300">Coupon</th>
                <td className="p-3 text-right border-b border-gray-300 text-green">Applied</td>
              </tr>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border-b border-gray-300">Tax</th>
                <td className="p-3 text-right border-b border-gray-300">₹6</td>
              </tr>
              <tr>
                <th className="p-3 text-left border-b border-gray-300">Handling Fee</th>
                <td className="p-3 text-right border-b border-gray-300">₹10</td>
              </tr>
              <tr className="bg-gray-200 font-bold">
                <th className="p-3 text-left">Final Price</th>
                <td className="p-3 text-right text-green-600">₹91</td>
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
  );
};

export default OrderForm;
