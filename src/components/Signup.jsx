// hooks
import { useRef, useState } from "react";

// components
import ButtonComponent from "@common/ButtonComponent";
import InputTextComponent from "@common/InputTextComponent";
import { allApi } from "@api/api";
import Loading from '@common/Loading';

// external libraries
import * as yup from "yup";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_CONSTANTS } from "../constants/apiurl";
import { ROUTES_CONSTANTS } from "../constants/routesurl";

const data = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  city: "",
  country: "",
  pincode: ""
};

const Signup = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    firstname: yup.string().required(t("first_name_is_required")),
    lastname: yup.string().required(t("last_name_is_required")),
    email: yup
      .string()
      .email(t("please_enter_valid_email"))
      .required(t("email_is_required")),
    password: yup
      .string()
      .min(6, t("please_enter_password_more_then_6_characters"))
      .max(20, t("please_enter_password_less_then_20_characters"))
      .required(t("password_is_required")),
    confirmPassword: yup
      .string()
      .min(6, t("please_enter_password_more_then_6_characters"))
      .max(20, t("please_enter_password_less_then_20_characters"))
      .required(t("confirm_password_is_required"))
      .oneOf(
        [yup.ref("password")],
        t("confirm_password_and_new_password_should_be_same"),
      ),
  });

  const onHandleSubmit = async (value) => {
    setLoader(true);
    let body = structuredClone({
      fname: value.firstname,
      lname: value.lastname,
      email: value.email,
      password: value.password,
      address: value.address,
      city: value.city,
      country: value.country,
      pincode: value.pincode
    });
      allApi(API_CONSTANTS.SINGNUP, body, "post")
      .then((response) => {
        if(response?.status === 201 && response?.data?.status === "success"){
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "User has been created successfully",
            life: 3000,
          });
          setTimeout(() => {
            navigate(ROUTES_CONSTANTS.LOGIN); 
          }, 3000);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: response?.data?.message,
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
      }).finally(()=>{setLoader(true);});
    };

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });
  const { values, errors, handleSubmit, handleChange, touched } =
    formik;

  return (
    <div className="h-screen items-center flex justify-center">
      {loader && <Loading/>}
      <div className="w-1/4 border px-5 max-lg:px-10 max-md:px-5">
        <Toast ref={toast} position="top-right" />
        <div className="my-2 text-left text-[1.5rem] font-[600] tracking-wide max-xl:text-center max-lg:text-[1.4em] max-sm:text-[1rem]">
          {t("signup")}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div>
            <InputTextComponent
              value={values?.firstname}
              onChange={handleChange}
              type="text"
              placeholder={t("first_name")}
              name="firstname"
              error={errors?.firstname}
              touched={touched?.firstname}
              className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div>
            <InputTextComponent
              value={values?.lastname}
              onChange={handleChange}
              type="text"
              placeholder={t("last_name")}
              name="lastname"
              error={errors?.lastname}
              touched={touched?.lastname}
              className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div>
            <InputTextComponent
              value={values?.email}
              onChange={handleChange}
              type="email"
              placeholder={t("your_email")}
              name="email"
              error={errors?.email}
              touched={touched?.email}
              className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div>
            <InputTextComponent
              value={values?.address}
              onChange={handleChange}
              type="address"
              placeholder={t("your_address")}
              name="address"
              error={errors?.address}
              touched={touched?.address}
              className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div>
            <InputTextComponent
              value={values?.city}
              onChange={handleChange}
              type="city"
              placeholder={t("your_city")}
              name="city"
              error={errors?.city}
              touched={touched?.city}
              className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div>
            <InputTextComponent
              value={values?.country}
              onChange={handleChange}
              type="country"
              placeholder={t("your_country")}
              name="country"
              error={errors?.country}
              touched={touched?.country}
              className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
          <div>
            <InputTextComponent
                value={values?.pincode}
                onChange={handleChange}
                type="pincode"
                placeholder={t("your_pincode")}
                name="pincode"
                error={errors?.pincode}
                touched={touched?.pincode}
                className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
              />
          </div>
          <div>
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
          <div>
            <InputTextComponent
              value={values?.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder={t("your_confirm_password")}
              name="confirmPassword"
              error={errors?.confirmPassword}
              touched={touched?.confirmPassword}
              className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-start">
          <div>
            <input
              type="checkbox"
              onChange={() => {
                setChecked(!checked);
              }}
            />
          </div>
          <div className="ms-2 text-[0.8rem]">{t("terms_&_condition")}</div>
        </div>
        <div className="mt-6">
          <ButtonComponent
            disabled={!checked}
            onClick={() => handleSubmit()}
            type="submit"
            label={t("sign_up")}
            className="w-full rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
          />
        </div>
        <div className="mb-4 mt-2 text-center text-[0.8rem]">
          {t("already_have_an_account?")}
          <span className="ps-2 font-[500] text-BgTertiaryColor underline">
            <Link to="/login">{t("sign_in")}</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Signup;
