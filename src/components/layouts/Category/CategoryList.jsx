// hooks
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// components
import Breadcrum from "@common/Breadcrum";
import DataTable from "@common/DataTable";
import ButtonComponent from "@common/ButtonComponent";
import Confirmbox from "@common/Confirmbox";
import { allApi } from "@api/api";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { Toast } from "primereact/toast";

const CatergoryList = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const item = {
    heading: t("category"),
    routes: [
      { label: t("dashboard"), route: ROUTES_CONSTANTS.DASHBOARD },
      { label: t("category"), route: ROUTES_CONSTANTS.CATEGORIES },
    ],
  };

  const [data, setData] = useState([]);
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <ButtonComponent
          icon="ri-pencil-line"
          className="text-[1rem]"
          onClick={() => editCategory(rowData)}
        />
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => confirmDeleteCategory(rowData)}
        />
      </div>
    );
  };
  const columns = [
    { field: "categoryType", header: t("name") },
    { field: "categoryDesc", header: t("description") },
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const editCategory = (item) => {
    navigate(`/edit-category/${item?.id}`);
  };

  const confirmDeleteCategory = (item) => {
    setIsConfirm(!isConfirm);
    setDeleteId(item?.categoryId);
  };

  const closeDialogbox = () => {
    setDeleteId(null);
    setIsConfirm(!isConfirm);
  };

  const confirmDialogbox = () => {
    setIsConfirm(!isConfirm);
    allApi(API_CONSTANTS.DELETE_CATEGORY_DETAILS, { id: deleteId }, "post")
      .then((response) => {
        if (response.status === 200 && response.data.status.toLowerCase() === "success") {
          fetchCategoryList();
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
  };

  const fetchCategoryList = () => {
    // To get all users stored in json
    allApi(API_CONSTANTS.GET_ALL_CATEGORY_DETAILS, {
        "pageNo" : "1",
        "limit" : "1000",
        "searchText" : "",
        "categoryId" : null
    }, "post")
      .then((response) => {
        if (response.status === 200 && response.data?.status.toLowerCase() === "success") {
          setData(response?.data?.data);
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
      });
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const createCategory = () => {
    navigate("/create-category");
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
          onClick={() => createCategory()}
          type="submit"
          label={t("create_category")}
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

export default CatergoryList;
