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
  name: "",
  weight: "",
  price: "",
  description: "",
  categoryId: "",
  productImages: "",
  isHidden: false,
  stock: 0,
  lowStockThresold : 0,
  salePrice: 0,
  noOfSaleQuantity: 0,
  saleStartDate: "",
  saleEndDate: ""
}
const ProductForm = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [data,setData] = useState(initialValues);
  const [toastType, setToastType] = useState(''); 
  const [categoryData, setCategoryData] = useState([]);
  const { id } = useParams();

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("product_name_is_required")),
    price: yup.number().required(t("price_is_required")),
    weight: yup.number().required(t("weight_is_required")),
    description: yup.string().required(t("description_is_required")),
    stock: yup.number(),
    lowStockThresold: yup.number(),
    salePrice: yup.number(),
    noOfSaleQuantity: yup.number(),
    saleStartDate: yup.string(),
    saleEndDate: yup.string(),
    productImages: yup.string()
  });

  const onHandleSubmit = async (value) => {
    // if (id) {
    //   // Update Product
    //   updateProduct(value);
    // } else {
      // Create Product
      createProduct(value);
    // }
  };

  
  const toastHandler=()=>{
    if (toastType === 'success') {
       navigate(ROUTES_CONSTANTS.PRODUCTS);
     }
  }

  const successToaster=(response)=>{
    setToastType('success');
    return toast.current.show({
      severity: "success",
      summary: t("success"),
      detail: response?.data?.message,
      life: 500
    });
  };

  const errorToaster=(err)=>{
    setToastType('error');
    return toast.current.show({
      severity: "error",
      summary: t("error"),
      detail: err,
      life: 1000
    });
  };

  const createProduct = (value) => {
    setLoader(true);
    allApiWithHeaderToken(API_CONSTANTS.ADD_PRODUCT, {
        name: value.name,
        weight: value.weight,
        price: value.price,
        description: value.description,
        categoryId: value.category.id,
        productImages: value.image,
        isHidden: true,
        stock: value?.stock,
        lowStockThresold : value?.lowStockThresold,
        salePrice: value?.salePrice,
        noOfSaleQuantity: value?.noOfSaleQuantity,
        saleStartDate: value.saleStartDate ? new Date(value.saleStartDate).toISOString() : null,
        saleEndDate: value.saleEndDate ? new Date(value.saleEndDate).toISOString() : null,
    }, "post").then((response) => {
        console.log("R",response)
        if (response.status === 201 && response?.data?.status === "success") {
          successToaster(response);
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
        errorToaster(err?.response?.data);
      }).finally(()=>{
        setLoader(false);
      });
  };

  const updateProduct = (value) => {
    const payload = {
        name: value.name,
        weight: value.weight,
        price: value.price,
        description: value.description,
        categoryId: value.category.categoryId,
        productImages: value.image,
        isHidden: true,
        stock: 0,
        lowStockThresold : 0,
        salePrice: 0,
        noOfSaleQuantity: 0,
        saleStartDate: "string",
        saleEndDate: "string"
    }
    allApiWithHeaderToken(API_CONSTANTS.UPDATE_PRODUCT, payload, "patch" )
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
  
  const imageHandler= async (file)=>{
    let data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    setFieldValue('image', data);
  }

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
    <div className="flex h-full bg-BgPrimaryColor py-5">
      {loader && <Loading/>}
      <Toast ref={toast} position="top-right" style={{scale: '0.7'}} onHide={toastHandler}/>
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
                imageHandler(e?.target?.files[0]);
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
            value={values?.name}
            onChange={handleChange}
            type="text"
            placeholder={t("product_name")}
            name="name"
            isLabel={true}
            error={errors?.name}
            touched={touched?.name}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.weight}
            onChange={handleChange}
            type="number"
            placeholder={t("product_weight")}
            name="weight"
            isLabel={true}
            error={errors?.weight}
            touched={touched?.weight}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.price}
            onChange={handleChange}
            type="number"
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
            value={values?.description}
            onChange={handleChange}
            type="text"
            placeholder={t("description")}
            name="description"
            isLabel={true}
            error={errors?.description}
            touched={touched?.description}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.stock}
            onChange={handleChange}
            type="number"
            placeholder={t("available_qty")}
            name="stock"
            isLabel={true}
            error={errors?.stock}
            touched={touched?.stock}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.lowStockThresold}
            onChange={handleChange}
            type="number"
            placeholder={t("minimum_stock_available")}
            name="lowStockThresold"
            isLabel={true}
            error={errors?.lowStockThresold}
            touched={touched?.lowStockThresold}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.salePrice}
            onChange={handleChange}
            type="number"
            placeholder={t("sale_price")}
            name="salePrice"
            isLabel={true}
            error={errors?.salePrice}
            touched={touched?.salePrice}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.noOfSaleQuantity}
            onChange={handleChange}
            type="number"
            placeholder={t("no_of_sale_quantity")}
            name="noOfSaleQuantity"
            isLabel={true}
            error={errors?.noOfSaleQuantity}
            touched={touched?.noOfSaleQuantity}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.saleStartDate}
            onChange={handleChange}
            type="date"
            placeholder={t("sale_start_date")}
            name="saleStartDate"
            isLabel={true}
            error={errors?.saleStartDate}
            touched={touched?.saleStartDate}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.saleEndDate}
            onChange={handleChange}
            type="date"
            placeholder={t("sale_end_date")}
            name="saleEndDate"
            isLabel={true}
            error={errors?.saleEndDate}
            touched={touched?.saleEndDate}
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
