// utils
import * as yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// components
import ButtonComponent from "@common/ButtonComponent";
import InputTextComponent from "@common/InputTextComponent";
import { RadioButton } from "primereact/radiobutton";
import FileUpload from "@common/FileUpload";
import { allApiWithHeaderToken } from "@api/api";
import Loading from '@common/Loading';
import { Toast } from "primereact/toast";
import { ROUTES_CONSTANTS } from "@constants/routesurl";
import { API_CONSTANTS } from "@constants/apiurl";

const structure = {
  name: "",
  email: "",
  gender: "",
  address: "",
  image: "",
  role_id: 1
};

const ProfilePage = () => {
  const { t } = useTranslation("msg");
  const [data, setData] = useState(structure);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const toast = useRef(null);
  const [toastType, setToastType] = useState('');

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("name_is_required")),
    email: yup.string().required(t("email_is_required")),
  });

  const onHandleSubmit = async (value) => {
    setLoader(true);
    let body = {
        email: value?.email,
        name: value?.name,
        role_id: value?.role_id,
        gender: value?.gender,
        phone_number: value?.phoneNumber,
    };
    if(value?.image){
      body['image'] = value?.image
    }
    
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_USERS_URL}/${id}`, body, "put", 'multipart/form-data' )
      .then((response) => {
        if (response.status === 200) {
          navigate(ROUTES_CONSTANTS.USERS);
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
      });
  };

  const backHandler=()=>{
    let userNavigation = JSON.parse(localStorage.getItem("user"))?.role && JSON.parse(localStorage.getItem("user"))?.role === 'admin' && '/dashboard/sector-master';
    if(userNavigation){
      navigate(userNavigation);
    }
    else{
      navigate('/dashboard');
    }
  }

  useEffect(() => {
    setLoader(true);
    try{
        if(id){
          allApiWithHeaderToken(`${API_CONSTANTS.COMMON_USERS_URL}/${id}`, "", "get")
          .then((response) => {
            if (response.status === 200) {
                let data = {
                    name: response?.data?.name,
                    gender: response?.data?.gender,
                    image_url: response?.data?.image_url,
                    phoneNumber: response?.data?.phone_number,
                    email: response?.data?.email,
                    role_id: response?.data?.role_id
                }
                setData(data);
            } 
          })
          .catch((err) => {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: err?.response?.data?.errors,
                life: 3000,
            });
          });
        }
    } catch (err){
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Something Went Wrong",
        life: 3000,
      });
    }finally {
      setLoader(false);
    }
  }, []);

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const toastHandler=()=>{
    if (toastType === 'success') {
        backHandler();
     }
  };

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } = formik;

  return (
    <div className="h-screen p-auto">
      {loader && <Loading/>}
      <Toast ref={toast} position="top-right" style={{scale: '0.7'}} onHide={toastHandler}/>
      <div className="flex min-h-full bg-BgPrimaryColor py-4 overflow-y-auto">
            <div className="mx-4 sm:mx-16 my-auto grid h-fit w-full grid-cols-4 gap-4 bg-BgSecondaryColor p-8 border rounded border-BorderColor">
              <div className="col-span-4 md:col-span-4">
                  <h4 className="xs:text-xl mb-2 font-serif font-extrabold sm:text-xl md:text-2xl lg:text-3xl dark:text-white">
                     {t("my_profile")}
                  </h4>
                  <div>
                    <FileUpload
                      isLabel={t("profile_image")}
                      value={values?.image_url}
                      name="image"
                      onChange={(e)=> {
                        setFieldValue('image', e?.currentTarget?.files[0]);
                        setFieldValue('image_url', URL.createObjectURL(e?.target?.files[0]));
                        }}
                      isProfile={true}
                    />
                  </div>
              </div>
              <div className="col-span-4 md:col-span-2">
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
              <div className="col-span-4 md:col-span-2">
                <InputTextComponent
                  value={values?.phoneNumber}
                  onChange={handleChange}
                  type="text"
                  placeholder={t("phone_number")}
                  name="phoneNumber"
                  isLabel={true}
                  error={errors?.phoneNumber}
                  touched={touched?.phoneNumber}
                  className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <InputTextComponent
                  value={values?.email}
                  onChange={handleChange}
                  type="text"
                  placeholder={t("email")}
                  name="email"
                  isLabel={true}
                  error={errors?.email}
                  touched={touched?.email}
                  disabled={true}
                  className="w-full rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
                />
              </div>
               <div className="col-span-4 md:col-span-2">
                  <label className="text-[12px] text-TextSecondaryColor ms-[4px] font-[600]">{t("gender")}</label>
                  <div className="flex flex-wrap gap-3 mt-2">
                      <div className="flex align-items-center">
                          <RadioButton 
                              name="gender" 
                              value="Male" 
                              onChange={(e) => setFieldValue('gender', e.value)} 
                              checked={values.gender === 'Male'} 
                          />
                          <label className="ml-2 font-[600] text-[12px]">Male</label>
                      </div>
                      <div className="flex align-items-center">
                          <RadioButton 
                              name="gender" 
                              value="Female" 
                              onChange={(e) => setFieldValue('gender', e.value)} 
                              checked={values.gender === 'Female'} 
                          />
                          <label className="ml-2 font-[600] text-[12px]">Female</label>
                      </div>
                      <div className="flex align-items-center">
                          <RadioButton 
                              name="gender" 
                              value="Other" 
                              onChange={(e) => setFieldValue('gender', e.value)} 
                              checked={values.gender === 'Other'} 
                          />
                          <label className="ml-2 font-[600] text-[12px]">Other</label>
                      </div>
                  </div>
                  {errors?.gender && touched?.gender ? (
                      <p className="text-[0.7rem] text-red-600">{errors?.gender}</p>
                      ) : (
                      ""
                  )}
              </div>
              <div className="col-span-4 md:col-span-2"></div>
              <div className="col-span-3"></div>
              <div className="mt-4 flex justify-end gap-4">
              <ButtonComponent
                onClick={backHandler}
                type="button"
                label={t("back")}
                className="rounded bg-[#1f1f70] px-6 py-2 text-[12px] text-white"
              />
              <ButtonComponent
                onClick={() => handleSubmit()}
                type="submit"
                label={t("update")}
                className="rounded bg-[#1f1f70] px-6 py-2 text-[12px] text-white"
              />
              </div>
            </div>
      </div>
    </div>
  );
};

export default ProfilePage;
