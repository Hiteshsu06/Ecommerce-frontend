// components
import ButtonComponent from "@common/ButtonComponent";
import InputTextComponent from "@common/InputTextComponent";
import FileUpload from "@common/FileUpload";
import { allApi } from "@api/api";

// external libraries
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import { allApiWithHeaderToken } from "../../../api/api";

const data = {
  category: "",
  productName: "",
  price: "",
  image: "",
  qty: "",
  shopName: ""
};

const ProductForm = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object().shape({
    category: yup.string().required(t("category_is_required")),
    productName: yup.string().required(t("product_name_is_required")),
    price: yup.string().required(t("price_is_required")),
    qty: yup.string().required(t("qty_is_required")),
    image: yup.string().required(t("image_is_required")),
    shopName: yup.string().required(t("shop_name_is_required"))
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
    allApiWithHeaderToken(API_CONSTANTS.ADD_UPDATE_PRODUCT_DETAILS, value, "post",'multipart/form-data')
      .then((response) => {
        if (response.status === 200 && response.data.status.toLowerCase() === "success") {
          navigate(ROUTES_CONSTANTS.STOCK_MANAGEMENT);
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
    allApi(API_CONSTANTS.ADD_UPDATE_PRODUCT_DETAILS, value, "post")
      .then((response) => {
        if (response.status === 200 && response.data.status.toLowerCase() === "success") {
          navigate(ROUTES_CONSTANTS.STOCK_MANAGEMENT);
        }else {
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

  const handleBack = () => {
    navigate("/dashboard/products");
  };

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const { values, errors, handleSubmit, handleChange, touched } = formik;
  return (
    <div className="flex h-screen bg-BgPrimaryColor">
      <Toast ref={toast} position="top-right" />
      <div className="mx-16 my-auto grid h-fit w-full grid-cols-4 gap-4 bg-BgSecondaryColor p-8 border rounded border-BorderColor">
        <div className="col-span-4">
            {t("create_product")}
        </div>
        <div className="col-span-4">
            <FileUpload/>
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.category}
            onChange={handleChange}
            type="category"
            placeholder={t("category")}
            name="category"
            isLabel={true}
            error={errors?.category}
            touched={touched?.category}
            className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.productName}
            onChange={handleChange}
            type="productName"
            placeholder={t("product_name")}
            name="productName"
            isLabel={true}
            error={errors?.productName}
            touched={touched?.productName}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.price}
            onChange={handleChange}
            type="price"
            placeholder={t("price")}
            name="price"
            isLabel={true}
            error={errors?.price}
            touched={touched?.price}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.qty}
            onChange={handleChange}
            type="qty"
            placeholder={t("qty")}
            name="qty"
            isLabel={true}
            error={errors?.qty}
            touched={touched?.qty}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
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

export default ProductForm;
