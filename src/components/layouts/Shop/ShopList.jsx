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
import { Toast } from "primereact/toast";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import { allApi } from "../../../api/api";

const ShopList = () => {
  const toast = useRef(null);
  const [data, setData] = useState([]);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const item = {
    heading: t("shop"),
    routes: [
      { label: t("dashboard"), route: ROUTES_CONSTANTS.DASHBOARD },
      { label: t("shop"), route: ROUTES_CONSTANTS.SHOPS },
    ],
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <ButtonComponent
          icon="ri-pencil-line"
          className="text-[1rem]"
          onClick={() => editShop(rowData)}
        />
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => confirmDeleteShop(rowData)}
        />
      </div>
    );
  };
  const columns = [
    { field: "shopName", header: t("name") },
    { header: t("address"), body: (data) => data?.addressLine1 + " " + data?.addressLine2 + " " + data?.addressLine3 },
    { field: "landmark", header: t("landmark") },
    { field: "pinCode", header: t("pinCode") },
    { field: "city", header: t("city") },
    { field: "district", header: t("district") },
    { field: "stateName", header: t("stateName") },
    { field: "country", header: t("country") },
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const editShop = (item) => {
    navigate(`/edit-shop/${item?.id}`);
  };

  const confirmDeleteShop = (item) => {
    setIsConfirm(!isConfirm);
    setDeleteId(item?.id);
  };

  const closeDialogbox = () => {
    setDeleteId(null);
    setIsConfirm(!isConfirm);
  };

  const confirmDialogbox = () => {
    setIsConfirm(!isConfirm);
    allApiWithHeaderToken(API_CONSTANTS.DELETE_SHOP_DETAILS, { id: deleteId }, "post")
      .then((response) => {
        if (response.status === 200 && response.data.status.toLowerCase() === "success") {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Shop deleted successfully",
            life: 3000,
          });
          fetchShopList();
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
            detail: "Invalid Username or Password",
            life: 3000,
        });
      });
  };

  useEffect(() => {
    fetchShopList();
  }, []);

  const fetchShopList = () => {
    // To get all stocks stored in json
    allApiWithHeaderToken(API_CONSTANTS.GET_ALL_SHOP_DETAILS, {
      id: localStorage.getItem("id"),
    }, "post")
      .then((response) => {
        if (response.status === 200 && response.data.status.toLowerCase() === "success") {
          setData(response?.data?.data);
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
  };

  const createShop = () => {
    navigate(ROUTES_CONSTANTS.CREATE_SHOP);
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
      <div className="mt-4 flex justify-end bg-BgSecondaryColor p-2 border rounded border-BorderColor">
        <ButtonComponent
          onClick={() => createShop()}
          type="submit"
          label={t("create_shop")}
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
          showGridlines={true}
        />
      </div>
    </div>
  );
};

export default ShopList;
