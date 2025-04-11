// utils
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

// Components
import Loading from '@common/Loading';
import Navbar from '@userpage/Navbar';
import Footer from '@userpage/Footer';
import { allApi } from "@api/api";
import { API_CONSTANTS } from "@constants/apiurl";
import { ROUTES_CONSTANTS } from "@constants/routesurl";
import InputTextComponent from "@common/InputTextComponent";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: ""
};

const Register = () => {
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);
  const [data, setData] = useState(initialValues);

  const validationSchema = yup.object().shape({
    fullName: yup.string().required(t("full_name_is_required")),
    email: yup.string().required(t("email_is_required")),
    password: yup.string().required(t("password_is_required")),
    phoneNumber: yup.string().required(t("phone_number_is_required")),
  });

  const onHandleSubmit = (value) => {
    createCustomer(value);
  };

  const fetchMenuList = () => {
    setLoader(true);
    allApi(API_CONSTANTS.MENU_LIST_URL, "" , "get")
    .then((response) => {
      if (response.status === 200) {
          let data = response?.data;
          data.push({name: "About Us"});
          setMenuList(data)
      } 
    })
    .catch((err) => {
      setLoader(false);
    }).finally(()=>{
      setLoader(false);
    });
  };

  const createCustomer = () => {

  }

  useEffect(()=>{
    fetchMenuList();
  },[]);

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const { values, errors, handleSubmit, handleChange, touched } = formik;

  return (
    <>
      {loader ? <Loading/> : 
      <>
        <Navbar data={menuList}/>
        <div className="min-h-screen mt-[5rem] flex flex-col items-center justify-center bg-white px-6 py-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-[#1D2E43] font-[playfair] font-bold">{t("register")}</h1>
          <div className="text-sm text-gray-600 mt-2">
            <span className="hover:cursor-pointer" onClick={()=>{ navigate("/") }}>{t("home")}</span> <span className="mx-1 text-[11px]">&gt;</span> <span>{t("create_account")}</span>
          </div>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-2xl text-[#1D2E43] mb-6 font-[playfair]">{t("register")}</h2>
          <div className="space-y-4">
            <InputTextComponent
              value={values?.fullName}
              onChange={handleChange}
              type="text"
              placeholder={t("full_name")}
              name="fullName"
              error={errors?.fullName}
              touched={touched?.fullName}
              className="text-[0.8rem] rounded-none w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
            <InputTextComponent
              value={values?.email}
              onChange={handleChange}
              type="text"
              placeholder={t("email")}
              name="email"
              error={errors?.email}
              touched={touched?.email}
              className="text-[0.8rem] rounded-none w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
            <InputTextComponent
              value={values?.password}
              onChange={handleChange}
              type="text"
              placeholder={t("password")}
              name="password"
              error={errors?.password}
              touched={touched?.password}
              className="text-[0.8rem] rounded-none w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
            <InputTextComponent
              value={values?.phoneNumber}
              onChange={handleChange}
              type="text"
              placeholder={t("phone_number")}
              name="phoneNumber"
              error={errors?.phoneNumber}
              touched={touched?.phoneNumber}
              className="text-[0.8rem] rounded-none w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />

            <p className="text-[0.9rem] text-gray-700">
              {t("user_register_description")}
            </p>

            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="text-white w-full text-[1.1rem] font-[playfair] hover:bg-white border border-[#caa446] bg-[#cca438] px-6 py-2 rounded-md hover:text-[#cca438] hover:border hover:border-[#caa446]"
            >
              {t("register")}
            </button>

            <button
              type="button"
              onClick={() => { navigate(ROUTES_CONSTANTS?.SIGN_IN) }}
              className="w-full border border-[#cca438] font-[playfair] text-[1.1rem] hover:text-white hover:bg-[#cca438] text-[#cca438]  px-6 py-2 rounded-md"
            >
              {t("login")}
            </button>
          </div>
        </div>
        </div>
        <Footer/>
      </>
      }
    </>
  )
}

export default Register