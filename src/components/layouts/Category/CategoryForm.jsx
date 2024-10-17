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
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";

const structure = {
  categoryType: "",
  categoryDescription: ""
};

const CategoryForm = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [data, setData] = useState(structure);
  const { id } = useParams();

  const validationSchema = yup.object().shape({
    categoryType: yup.string().required(t("name_is_required")),
    categoryDescription: yup.string().required(t("description_is_required"))
  });

  const onHandleSubmit = async (value) => {
          console.log("value", value);

    if (id) {
      // Update
      updateCategory(value);
    } else {
      // Create
      createCategory(value);
    }
  };

  const createCategory = (value) => {
    allApi(API_CONSTANTS.ADD_UPDATE_CATEGORY_DETAILS, value, "post")
      .then(() => {
        navigate(ROUTES_CONSTANTS.CATEGORIES);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const updateCategory = (value) => {
    value.categoryId = id;
    allApi(API_CONSTANTS.ADD_UPDATE_CATEGORY_DETAILS, value, "put")
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleBack = () => {
    navigate("/dashboard/categories");
  };

  useEffect(() => {
    if (id) {
      allApi(`category/${id}`, "", "get")
        .then((response) => {
          if (response.status === 200 && response.data.status.toLowerCase() === "success") {
            setData(response?.data);
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
        });
    }
  }, []);

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const { values, errors, handleSubmit, handleChange, touched } = formik;
 console.log("errors",errors)
  return (
    <div className="flex h-screen bg-BgPrimaryColor">
      <Toast ref={toast} position="top-right" />
      <div className="mx-16 my-auto grid h-fit w-full grid-cols-4 gap-4 bg-BgSecondaryColor p-8 border rounded border-BorderColor">
        <div className="col-span-4">
            {t("create_category")}
        </div>
        
        <div className="col-span-2">
          <InputTextComponent
            value={values?.categoryType}
            onChange={handleChange}
            type="text"
            placeholder={t("category_name")}
            name="categoryType"
            isLabel={true}
            error={errors?.categoryType}
            touched={touched?.categoryType}
            className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <InputTextComponent
            value={values?.categoryDescription}
            onChange={handleChange}
            type="text"
            placeholder={t("category_description")}
            name="categoryDescription"
            isLabel={true}
            error={errors?.categoryDescription}
            touched={touched?.categoryDescription}
            className="col-span-2 w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
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
