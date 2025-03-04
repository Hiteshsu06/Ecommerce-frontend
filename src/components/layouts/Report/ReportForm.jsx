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
import FileUpload from "@common/FileUpload";
import Dropdown from "@common/DropdownComponent";

const structure = {
  name: "",
  description: "",
  image: "",
  image_url: "",
  categoryType: {}
};

const statusList = [
  { name: "Active", value: "1"},
  { name: "Inactive", value: "0"}
];

const CategoryForm = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [data, setData] = useState(structure);
  const [loader, setLoader] = useState(false);
  const [categoryList, setCategoryList] = useState([]); 
  const { id } = useParams();

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("name_is_required")),
    description: yup.string().required(t("description_is_required"))
  });

  const onHandleSubmit = async (value) => {
    if (id) {
      // Update
      updateSubCategory(value);
    } else {
      // Create
      createSubCategory(value);
    }
  };

  const createSubCategory = (value) => {
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

  const updateSubCategory = (value) => {
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
          detail: "Something Went Wrong",
          life: 3000,
        });
      }).finally(()=>{
        setLoader(false);
      });
  };

  const handleBack = () => {
    navigate(ROUTES_CONSTANTS.CATEGORIES);
  };

  useEffect(() => {
    if (id) {
      setLoader(true);
      allApiWithHeaderToken(`${API_CONSTANTS.COMMON_SUB_CATEGORIES_URL}/${id}`, "", "get")
        .then((response) => {
          if (response.status === 200) {
            let data = {
              name: response?.data?.name,
              description: response?.data?.description,
              image_url: response?.data?.image_url,
              status: response?.data?.status
            }
            setData(data);
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
            detail: "Something Went Wrong",
            life: 3000,
          });
        }).finally(()=>{
          setLoader(false);
        });
    }

    setLoader(true);
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_SUB_CATEGORIES_URL}`, "" , "get")
      .then((response) => {
        if (response.status === 200) {
          setCategoryList(response?.data);
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
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something Went Wrong",
          life: 3000,
        });
      }).finally(()=>{
        setLoader(false);
      });
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
            {id ? t("update_sub_category") : t("create_sub_category")}
        </div>
        <div className="col-span-2">
          <Dropdown
              value={values?.categoryType}
              onChange={(field, value) => setFieldValue(field, value)}
              data={categoryList}
              name="categoryType"
              placeholder={t("category")}
              className="custom-dropdown col-span-2 w-full rounded border-[1px] border-[#ddd] focus:outline-none"
              optionLabel="name"
            />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.name}
            onChange={handleChange}
            type="text"
            placeholder={t("category_sub_name")}
            name="name"
            isLabel={true}
            error={errors?.name}
            touched={touched?.name}
            className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.description}
            onChange={handleChange}
            type="text"
            placeholder={t("category_sub_description")}
            name="description"
            isLabel={true}
            error={errors?.description}
            touched={touched?.description}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-4 md:col-span-2">
            <FileUpload 
              value={values?.image_url}
              name="image"
              isLabel={t("category_sub_image")} 
              onChange={(e)=> {
                setFieldValue('image', e?.currentTarget?.files[0]);
                setFieldValue('image_url', URL.createObjectURL(e?.target?.files[0]));
              }}/>
        </div>
        {
          id && (
            <>
              <div className="col-span-2">
              <Dropdown
                  value={values?.status}
                  onChange={(field, value) => setFieldValue(field, value)}
                  data={statusList}
                  name="status"
                  placeholder="status"
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
            className="rounded bg-[#1f1f70] px-6 py-2 text-[12px] text-white"
            icon="pi pi-arrow-right"
            iconPos="right"
          />
          <ButtonComponent
            onClick={() => handleSubmit()}
            type="submit"
            label={t("submit")}
            className="rounded bg-[#1f1f70] px-6 py-2 text-[12px] text-white"
            icon="pi pi-arrow-right"
            iconPos="right"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
