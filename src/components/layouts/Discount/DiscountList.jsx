// hooks
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// components
import Breadcrum from "@common/Breadcrum";
import DataTable from "@common/DataTable";
import ButtonComponent from "@common/ButtonComponent";
import Confirmbox from "@common/Confirmbox";
import { allApiWithHeaderToken } from "@api/api";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { Toast } from "primereact/toast";
import { refactorPrefilledDate } from '../../../helper/helper';

const DiscountList = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loader, setLoader] = useState(false);

  const item = {
    heading: t("discount"),
    routes: [
      { label: t("dashboard"), route: ROUTES_CONSTANTS.DASHBOARD },
      { label: t("discount"), route: ROUTES_CONSTANTS.DISCOUNT },
    ],
  };

  const [data, setData] = useState([]);
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <ButtonComponent
          icon="ri-pencil-line"
          className="text-[1rem]"
          onClick={() => editDiscount(rowData)}
        />
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => confirmDeleteDiscount(rowData)}
        />
      </div>
    );
  };

  const checkValidDate=(endDate)=>{
    if(new Date() < new Date(endDate)){
      return true;
    }
  }

  const statusBodyTemplate= (rowData) => {
    return (
      <div className="flex items-center gap-4">
        { checkValidDate(rowData?.end_date) ? <span className="text-[green]">Active</span> : <span className="text-[red]">Inactive</span>}
      </div>
    );
  };

  const columns = [
    { field: "product_name", header: t("product_name")},
    { field: "discount_type", header: t("discount_type")},
    { field: "discount_value", header: t("discount_value")},
    { field: "start_date", header: t("valid_from")},
    { field: "end_date", header: t("valid_until")},
    { header: t("status"), body: statusBodyTemplate },
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const editDiscount = (item) => {
    navigate(`/edit-discount/${item?.id}`);
  };

  const confirmDeleteDiscount = (item) => {
    setIsConfirm(!isConfirm);
    setDeleteId(item?.id);
  };

  const closeDialogbox = () => {
    setDeleteId(null);
    setIsConfirm(!isConfirm);
  };

  const confirmDialogbox = () => {
    setIsConfirm(!isConfirm);
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_DISCOUNT_URL}/${deleteId}`, '', "delete")
      .then((response) => {
        if (response.status === 200) {
          fetchCategoryList();
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
  };

  const fetchCategoryList = () => {
    setLoader(true);
    allApiWithHeaderToken(API_CONSTANTS.COMMON_DISCOUNT_URL, "" , "get")
      .then((response) => {
        if (response.status === 200) {
          let updatedArray = [];
          response?.data.forEach((item)=>{
            let obj = {
              ...item, 
              end_date: refactorPrefilledDate(item?.end_date), 
              start_date: refactorPrefilledDate(item?.start_date),
              discount_type: item?.discount_type == 0 ? "Percentage" : "Fixed"
            }
            updatedArray.push(obj)
          })
          setData(updatedArray);
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

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const createDiscount = () => {
    navigate(ROUTES_CONSTANTS.CREATE_DISCOUNT);
  };

  return (
    <div className="text-TextPrimaryColor">
      <Toast ref={toast} position="top-right" />
      <Confirmbox
        isConfirm={isConfirm}
        closeDialogbox={closeDialogbox}
        confirmDialogbox={confirmDialogbox}
      />
      <Breadcrum item={item} />
      <div className="mt-4 flex justify-end bg-BgSecondaryColor border rounded border-BorderColor p-2">
        <ButtonComponent
          onClick={() => createDiscount()}
          type="submit"
          label={t("create_discount")}
          className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
          icon="pi pi-arrow-right"
          iconPos="right"
        />
      </div>
      <div className="mt-4">
        <DataTable
          className="bg-BgPrimaryColor border rounded border-BorderColor"
          columns={columns}
          data={data}
          loader={loader}
          showGridlines={true}
        />
      </div>
    </div>
  );
};

export default DiscountList;
