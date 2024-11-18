// hooks
import { useRef, useState } from "react";

// components
import ButtonComponent from "@common/ButtonComponent";
import InputTextComponent from "@common/InputTextComponent";
import { allApi, allApiWithHeaderToken } from "@api/api";

// external libraries
import * as yup from "yup";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES_CONSTANTS } from "../constants/routesurl";
import { API_CONSTANTS } from "../constants/apiurl";

const data = {
  email: "",
  password: "",
};

const Login = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const [toastType, setToastType] = useState(''); 
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required(t("email_is_required")),
    password: yup
      .string()
      .min(6, t("please_enter_password_more_then_6_characters"))
      .max(20, t("please_enter_password_less_then_20_characters"))
      .required(t("password_is_required")),
  });

  const onHandleSubmit = async (value) => {
    let data = {...value, "remember": true}
    allApi(API_CONSTANTS.LOGIN, data, "post")
      .then((response) => {
        if(response?.status === 201 && response?.data?.status === "success"){
          localStorage.setItem("token", JSON.stringify(response?.data?.data[0]?.access_token));
          verifyToken();
        }else{
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: response?.data?.message,
            life: 3000,
          });
        }
      })
      .catch(() => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong",
          life: 3000,
        });
      });
  };

  const verifyToken = ()=>{
    allApiWithHeaderToken(API_CONSTANTS.VERIFY_TOKEN, "" , "get")
      .then((response) => {
        if (response.status === 200){
          localStorage.setItem("userDetails", JSON.stringify(response?.data?.data));
          setToastType('success');
          toast.current.show({
            severity: "success",
            summary: t("success"),
            detail: "You have successfully login",
            life: 1000
          });
        } 
        else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Something went wrong",
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

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const toastHandler=()=>{
    if (toastType === 'success') {
       navigate(ROUTES_CONSTANTS.DASHBOARD);
     }
   };
   

  const { values, errors, handleSubmit, handleChange, touched } = formik;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-1/4 border px-5 py-5 max-lg:px-10 max-md:px-5">
        <Toast ref={toast} position="top-right" style={{scale: '0.7'}} onHide={toastHandler}/>
        <div className="text-center text-[1.5rem] font-[600] tracking-wide max-lg:text-[1.4em] max-sm:text-[1rem]">
          {t("login")}
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <InputTextComponent
            value={values?.email}
            onChange={handleChange}
            type="text"
            placeholder={t("your_email")}
            name="email"
            error={errors?.email}
            touched={touched?.email}
            className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
          <InputTextComponent
            value={values?.password}
            onChange={handleChange}
            type="password"
            placeholder={t("your_password")}
            name="password"
            error={errors?.password}
            touched={touched?.password}
            className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-2">
          </div>
          <div className="z-10 text-[0.8rem] text-BgTertiaryColor underline underline-offset-2 hover:cursor-pointer">
            <Link to="/forgot-password">{t("forgot_password")}</Link>
          </div>
        </div>
        <div className="mt-4">
          <ButtonComponent
            onClick={() => handleSubmit()}
            type="submit"
            label={t("log_in")}
            className="w-full rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
            icon="pi pi-arrow-right"
            iconPos="right"
          />
        </div>
        <div className="mt-2 text-center text-[0.8rem]">
          {" "}
          {t("don't_have_an_account?")}
          <span className="ps-2 font-[500] text-BgTertiaryColor underline">
            <Link to="/signup">Signup</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
