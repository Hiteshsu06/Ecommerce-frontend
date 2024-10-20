// components
import ButtonComponent from "@common/ButtonComponent";
import InputTextComponent from "@common/InputTextComponent";
import FileUpload from "@common/FileUpload";
import { allApiWithHeaderToken } from "@api/api";

// external libraries
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { use } from "i18next";

const ShopForm = () => {
  const [data,setData] = useState({
    shopName: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    landmark: "",
    district: "",
    stateName: "",
    pinCode: "",
    country: "",
    shopImageUrl: "",
    shopImage: "",
    city: "",
  });
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object().shape({
    shopName: yup.string().required(t("shopName_is_required")),
    addressLine1: yup.string().required(),
    addressLine2: yup.string(),
    addressLine3: yup.string(),
    landmark: yup.string(),
    district: yup.string().required(t("district_is_required")),
    stateName: yup.string().required(t("state_is_required")),
    pinCode: yup.string().required(t("pincode_is_required")),
    country: yup.string().required(t("country_is_required")),
    shopImageUrl: yup.string(),
    city: yup.string().required(),
  });

  const onHandleSubmit = async (value) => {
    if (id) {
      // Update Stock
      updateStock(value);
    } else {
      // Create Stock
      createStock(value);
    }
  };

  const createStock = (value) => {
    value.userId = localStorage.getItem("id");
    allApiWithHeaderToken(API_CONSTANTS.ADD_UPDATE_SHOP_DETAILS, value, "post", "multipart/form-data")
      .then((response) => {
        if(response?.status === 200 && response?.data?.status?.toLowerCase() === "success"){
          navigate(ROUTES_CONSTANTS.SHOPS);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: response?.data?.statusMessage,
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong",
          life: 3000,
        });
      });
  };

  const updateStock = (value) => {
    value.shopDtlsId=id;
    value.userId = localStorage.getItem("id");
    allApiWithHeaderToken(API_CONSTANTS.ADD_UPDATE_SHOP_DETAILS, value, "post", "multipart/form-data")
      .then((response) => {
        if(response?.status === 200 && response?.data?.status?.toLowerCase() === "success"){
          navigate(ROUTES_CONSTANTS.SHOPS);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: response?.data?.statusMessage,
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong",
          life: 3000,
        });
      });
  };

  useEffect(() => {
    if (id) {
      allApiWithHeaderToken(API_CONSTANTS.GET_ALL_SHOP_DETAILS_BY_SHOP_ID, { id: id }, "post")
        .then(async (response) => {
          if (response?.status === 200 && response?.data?.status?.toLowerCase() === "success") {
            let fileres = await fetch(response?.data?.data?.shopImageUrl).then(res => res.blob()).then(blob => new File([blob], response?.data?.data?.shopImageName, { type: blob.type }));
            setData({ ...response?.data?.data,shopImageUrl: fileres,shopImage: response?.data?.data?.shopImageUrl });
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: response?.data?.statusMessage,
              life: 3000,
            });
          }
        })
        .catch((err) => {
          console.error("err", err);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Something went wrong",
            life: 3000,
          });
        });
    }
  }, []);

  const handleBack = () => {
    navigate(ROUTES_CONSTANTS.PRODUCTS);
  };

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const { values, errors, handleSubmit,setFieldValue, handleChange, touched } = formik;
  return (
    <div className="flex h-screen bg-BgPrimaryColor">
      <Toast ref={toast} position="top-right" />
      <div className="mx-16 my-auto grid h-fit w-full grid-cols-4 gap-4 bg-BgSecondaryColor p-8 border rounded border-BorderColor">
        <div className="col-span-4">
            {t("create_shop")}
        </div>
        <div className="col-span-4">
            <FileUpload 
              isLabel={t("stock_long_term_chart")}
              value={values?.shopImage}
              name="shopImageUrl"
              onChange={(e)=> {
                setFieldValue('shopImageUrl', e?.currentTarget?.files[0]);
                setFieldValue('shopImage', URL.createObjectURL(e?.target?.files[0]));
              }}/>    
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.shopName}
            onChange={handleChange}
            type="shopName"
            placeholder={t("shop_name")}
            name="shopName"
            isLabel={true}
            error={errors?.shopName}
            touched={touched?.shopName}
            className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.addressLine1}
            onChange={handleChange}
            type="addressLine1"
            placeholder={t("addressLine1")}
            name="addressLine1"
            isLabel={true}
            error={errors?.addressLine1}
            touched={touched?.addressLine1}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.addressLine2}
            onChange={handleChange}
            type="addressLine2"
            placeholder={t("addressLine2")}
            name="addressLine2"
            isLabel={true}
            error={errors?.addressLine2}
            touched={touched?.addressLine2}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.addressLine3}
            onChange={handleChange}
            type="addressLine3"
            placeholder={t("addressLine3")}
            name="addressLine3"
            isLabel={true}
            error={errors?.addressLine3}
            touched={touched?.addressLine3}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.landmark}
            onChange={handleChange}
            type="landmark"
            placeholder={t("landmark")}
            name="landmark"
            isLabel={true}
            error={errors?.landmark}
            touched={touched?.landmark}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.district}
            onChange={handleChange}
            type="district"
            placeholder={t("district")}
            name="district"
            isLabel={true}
            error={errors?.district}
            touched={touched?.district}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.stateName}
            onChange={handleChange}
            type="stateName"
            placeholder={t("stateName")}
            name="stateName"
            isLabel={true}
            error={errors?.stateName}
            touched={touched?.stateName}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.pinCode}
            onChange={handleChange}
            type="pincode"
            placeholder={t("pincode")}
            name="pinCode"
            isLabel={true}
            error={errors?.pinCode}
            touched={touched?.pinCode}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.city}
            onChange={handleChange}
            type="city"
            placeholder={t("city")}
            name="city"
            isLabel={true}
            error={errors?.city}
            touched={touched?.city}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.country}
            onChange={handleChange}
            type="country"
            placeholder={t("country")}
            name="country"
            isLabel={true}
            error={errors?.country}
            touched={touched?.country}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-3"></div>
        <div className="mt-4 flex justify-end gap-4">
          <ButtonComponent
            onClick={() => handleBack()}
            type="button"
            label={t("back")}
            className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
            icon="pi pi-arrow-right"
            iconPos="right"
          />
          <ButtonComponent
            onClick={() => handleSubmit()}
            type="submit"
            label={t("submit")}
            className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
            icon="pi pi-arrow-right"
            iconPos="right"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopForm;
