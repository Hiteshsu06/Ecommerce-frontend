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
import { useEffect, useRef, useState } from "react";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import { allApiWithHeaderToken } from "../../../api/api";
import DropdownComponent from "../../common/DropdownComponent";
import Loading from '@common/Loading';

const initialValues = {
  category: {},
  productName: "",
  price: "",
  file: "",
  stockAvailable: "",
  shop: {},
  image: "",
}
const ProductForm = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [data,setData] = useState(initialValues);
  const [categoryData, setCategoryData] = useState([]);
  const { id } = useParams();

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("product_name_is_required")),
    price: yup.number().required(t("price_is_required")),
    category: yup.object().required(t("category_is_required")),
    weight: yup.object().required(t("category_is_required")),
    description: yup.object().required(t("category_is_required")),
    stock: yup.object().required(t("category_is_required")),
    lowStockThresold: yup.object().required(t("category_is_required")),
    salePrice: yup.string(),
    noOfSaleQuantity: yup.string(),
    saleStartDate: yup.string(),
    saleEndDate: yup.string(),
    productImages: yup.string()
  });

  const onHandleSubmit = async (value) => {
    if (id) {
      // Update Product
      updateProduct(value);
    } else {
      // Create Product
      createProduct(value);
    }
  };

  const createProduct = (value) => {
    setLoader(true);
    allApiWithHeaderToken(API_CONSTANTS.ADD_PRODUCT_DETAILS, {
        name: value.shop.id,
        weight: value.productName,
        price: value.price,
        description: value.stockAvailable,
        categoryId: value.category.categoryId,
        productImages: value.file,
        isHidden: false,
        stock: 0,
        lowStockThresold : 0,
        salePrice: 0,
        noOfSaleQuantity: 0,
        saleStartDate: "string",
        saleEndDate: "string"
    }, "post")
      .then((response) => {
        if (response.status === 200 && response.data.status.toLowerCase() === "success") {
          navigate(ROUTES_CONSTANTS.PRODUCTS);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Product added successfully",
            life: 3000,
          });
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
      }).finally(()=>{
        setLoader(false);
      });
  };

  const updateProduct = (value) => {
    const payload = {
        name: value.shop.id,
        weight: value.productName,
        price: value.price,
        description: value.stockAvailable,
        categoryId: value.category.categoryId,
        productImages: value.file,
        isHidden: true,
        stock: 0,
        lowStockThresold : 0,
        salePrice: 0,
        noOfSaleQuantity: 0,
        saleStartDate: "string",
        saleEndDate: "string"
    }
    allApiWithHeaderToken(API_CONSTANTS.UPDATE_PRODUCT_DETAILS, payload, "patch" )
      .then((response) => {
        if (response.status === 200 && response.data.status.toLowerCase() === "success") {
          navigate(ROUTES_CONSTANTS.PRODUCTS);
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

  useEffect(()=>{
     fetchCategoryList();
      if(id){
        allApiWithHeaderToken(API_CONSTANTS.GET_ALL_PRODUCT_DETAILS_BY_PRODUCT_ID, {id:id}, "post")
        .then(async (response) => {
          if (response.status === 200 && response.data.status.toLowerCase() === "success") {
              let fileres = await fetch(response?.data?.data?.imageUrl).then(res => res.blob()).then(blob => new File([blob], response?.data?.data?.imageName, { type: blob.type }));
              setData({
                  file: fileres,
                  image: response.data?.data?.imageUrl,
                  productName: response.data?.data?.productName,
                  price: response.data?.data?.price,
                  stockAvailable: response.data?.data?.stockAvailable,
                  category:  categoryData.find(item=>item.categoryId === response.data?.data?.categoryDtls?.categoryId),
              })
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
  },[id]);

  const fetchCategoryList = () => {
    setLoader(true);
    allApiWithHeaderToken(API_CONSTANTS.GET_ALL_CATEGORY_DETAILS, "" , "get")
      .then((response) => {
        if (response.status === 200 && response.data?.status=== "success") {
          setCategoryData(response?.data?.data);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: response?.data?.data?.statusMessage,
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something Went Wrong",
          life: 3000,
        });
      }).finally(()=>{
        setLoader(false);
      });
  };  

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

  const { values, errors, setFieldValue,handleSubmit, handleChange, touched } = formik;
  return (
    <div className="flex h-screen bg-BgPrimaryColor">
      {loader && <Loading/>}
      <Toast ref={toast} position="top-right" />
      <div className="mx-16 my-auto grid h-fit w-full grid-cols-4 gap-4 bg-BgSecondaryColor p-8 border rounded border-BorderColor">
        <div className="col-span-4">
            {t("create_product")}
        </div>
       <div className="col-span-4">
            <FileUpload 
              isLabel={t("product_image")}
              value={values?.image}
              error={errors?.file}
              touched={touched?.file}
              name="file"
              onChange={(e)=> {
                setFieldValue('file', e?.currentTarget?.files[0]);
                setFieldValue('image', URL.createObjectURL(e?.target?.files[0]));
          }}/>    
             <label htmlFor="file" className="error text-red-500">{errors?.file}</label>
        </div>
        <div className="col-span-2">
          <DropdownComponent 
            value={values?.category}
            onChange={handleChange}
            data= {categoryData}
            placeholder={t("select_category")}
            name="category"
            error={errors?.category}
            touched={touched?.category}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] custom-dropdown focus:outline-none"
            optionLabel="name"
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
            value={values?.stockAvailable}
            onChange={handleChange}
            type="stockAvailable"
            placeholder={t("stockAvailable")}
            name="stockAvailable"
            isLabel={true}
            error={errors?.stockAvailable}
            touched={touched?.stockAvailable}
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
