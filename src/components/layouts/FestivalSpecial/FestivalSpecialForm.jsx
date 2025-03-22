// components
import ButtonComponent from "@common/ButtonComponent";
import MultiselectComponent from "@common/MultiselectComponent";
import { allApiWithHeaderToken } from "@api/api";
import InputTextComponent from "@common/InputTextComponent";

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
import FileUpload from "@common/FileUpload";
import Dropdown from "@common/DropdownComponent";

const structure = {
  name: "",
  products: "",
  status: "",
  image: ""
};

const statusList = [
  { name: "Active", value: "1"},
  { name: "Inactive", value: "0"}
];

const FestivalSpecialForm = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [data, setData] = useState(structure);
  const [loader, setLoader] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { id } = useParams();

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("name_is_required")),
    description: yup.string().required(t("description_is_required"))
  });

  const onHandleSubmit = async (value) => {
    if (id) {
      // Update
      updateFestProducts(value);
    } else {
      // Create
      createFestProducts(value);
    }
  };

  const createFestProducts = (value) => {
    let data = {
      name: value?.name,
      description: value?.description,
      status: 1,
      image: value?.image
    }
    setLoader(true);
    allApiWithHeaderToken(API_CONSTANTS.COMMON_CATEGORIES_URL, data , "post", 'multipart/form-data')
      .then((response) => {
        if (response.status === 201) {
          navigate(ROUTES_CONSTANTS.CATEGORIES);
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

  const updateFestProducts = (value) => {
    setLoader(true);
    let body = {
      name: value?.name,
      description: value?.description,
      status: Number(value?.status),
    }
    if(value?.image){
      body['image'] = value?.image
    }

    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_CATEGORIES_URL}/${id}`, body, "put", 'multipart/form-data')
      .then((response) => {
        if (response.status === 200) {
          navigate(ROUTES_CONSTANTS.CATEGORIES);
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

  const handleBack = () => {
    navigate(ROUTES_CONSTANTS.FEST);
  };

  const fetchProductList = async () => {
    setLoader(true); 
    const productResponse = await allApiWithHeaderToken(API_CONSTANTS.COMMON_PRODUCTS_URL, "", "get");
    if (productResponse.status === 200) { 
      console.log("productResponse?.data",productResponse?.data) 
      setProductList(productResponse?.data);
      setLoader(false); 
    } 
  }

  useEffect(() => {
    fetchProductList();
}, []);

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const { values, errors, handleSubmit, handleChange, setFieldValue, touched } = formik;

  return (
    <div className="flex h-screen bg-BgPrimaryColor">
      {loader && <Loading/>}
      <Toast ref={toast} position="top-right" />
      <div className="mx-16 my-auto grid h-fit w-full grid-cols-4 gap-4 bg-BgSecondaryColor p-8 border rounded border-BorderColor">
        <div className="col-span-4">
            {id ? t("update_fest_product") : t("create_fest_product")}
        </div>
        <div className="col-span-4">
            <FileUpload 
                value={values?.image_url}
                name="image"
                isLabel={t("fest_special_image")} 
                onChange={(e)=> {
                  setFieldValue('image', e?.currentTarget?.files[0]);
                  setFieldValue('image_url', URL.createObjectURL(e?.target?.files[0]));
                }}
              />    
             <label htmlFor="file" className="error text-red-500">{errors?.file}</label>
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.name}
            onChange={handleChange}
            type="text"
            placeholder={t("name")}
            name="name"
            isLabel={true}
            error={errors?.name}
            touched={touched?.name}
            className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <MultiselectComponent
            value={selectedProduct}
            options={productList} 
            optionLabel="products"
            name="products"
            onChange={(field, value) => setFieldValue(field, value)}
            placeholder={t("fest_products")}
            display="chip"
            error={errors?.products}
            touched={touched?.products}
            className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        {
          id && (
            <>
              <div className="col-span-2">
              <Dropdown
                  value={values?.status}
                  onChange={(field, value) => setFieldValue(field, value)}
                  data={statusList}
                  placeholder={t("status")}
                  name="status"
                  className="custom-dropdown col-span-2 w-full rounded border-[1px] border-[#ddd] focus:outline-none"
                  optionLabel="name"
                />
              </div>
              <div className="col-span-2"></div>
            </>
          )
        }
        <div className="col-span-3"></div>
        <div className="mt-4 flex justify-end gap-4">
          <ButtonComponent
            onClick={() => handleBack()}
            type="button"
            label={t("back")}
            className="rounded bg-TextPrimaryColor px-6 py-2 text-[12px] text-white"
          />
          <ButtonComponent
            onClick={() => handleSubmit()}
            type="submit"
            label={id ? t("update") : t("submit")}
            className="rounded bg-TextPrimaryColor px-6 py-2 text-[12px] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default FestivalSpecialForm;
