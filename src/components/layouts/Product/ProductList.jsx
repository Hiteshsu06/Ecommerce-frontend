// hooks
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// components
import Breadcrum from "@common/Breadcrum";
import DataTable from "@common/DataTable";
import ButtonComponent from "@common/ButtonComponent";
import Confirmbox from "@common/Confirmbox";
import { allApi, allApiWithHeaderToken } from "@api/api";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import { Toast } from "primereact/toast";
import { API_CONSTANTS } from "../../../constants/apiurl";
import Loading from '@common/Loading';

const ProductList = () => {
  const toast = useRef(null);
  const [data, setData] = useState([]);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loader, setLoader] = useState(false);

  const item = {
    heading: t("product"),
    routes: [
      { label: t("dashboard"), route: ROUTES_CONSTANTS.DASHBOARD },
      { label: t("product"), route: ROUTES_CONSTANTS.PRODUCTS },
    ],
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <ButtonComponent
          icon="ri-pencil-line"
          className="text-[1rem]"
          onClick={() => editStock(rowData)}
        />
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => confirmDeleteStock(rowData)}
        />
      </div>
    );
  };

  const categoryBodyTemplate = (rowData) => {
    return (
      <div className="flex">
         {rowData?.name}
      </div>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        {rowData?.productImage?.map((item)=>{
          return(<>{
            <img src={item} alt="" />
          }</>)
        })}
      </div>
    );
  };

  const columns = [
    { body: categoryBodyTemplate, header: t("category") },
    { field: "name", header: t("product_name") },
    { field: "price", header: t("price") },
    { body: imageBodyTemplate, header: t("image") },
    { field: "description", header: t("description") },
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const editStock = (item) => {
    navigate(`/edit-product/${item?.productId}`);
  };

  const confirmDeleteStock = (item) => {
    setIsConfirm(!isConfirm);
    setDeleteId(item?.id);
  };

  const closeDialogbox = () => {
    setDeleteId(null);
    setIsConfirm(!isConfirm);
  };

  const confirmDialogbox = () => {
    setLoader(true);
    setIsConfirm(!isConfirm);
    allApiWithHeaderToken(`${API_CONSTANTS.DELETE_PRODUCT_DETAILS}/${deleteId}`,"", "delete")
      .then((response) => {
        console.log("R",response)
        if (response?.status === 200 && response?.data?.status === "success") {
          fetchStockList();
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
      });;
  };

  useEffect(() => {
    fetchStockList();
  }, []);

  const fetchStockList = () => {
    // To get all stocks stored in json
    allApi(API_CONSTANTS.GET_ALL_PRODUCT_DETAILS, "", "get")
      .then((response) => {
        if (response?.status === 200 && response?.data?.status === "success") {
          setData(response?.data?.data);
          console.log("R",response?.data?.data)
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

  const createStock = () => {
    navigate(ROUTES_CONSTANTS.CREATE_PRODUCT);
  };

  const importBulkStock = ()=>{
    
  }

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
          onClick={() => importBulkStock()}
          type="submit"
          label={t("import_products")}
          className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white me-2"
          icon="pi pi-arrow-right"
          iconPos="right"
        />
        <ButtonComponent
          onClick={() => createStock()}
          type="submit"
          label={t("create_product")}
          className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
          icon="pi pi-arrow-right"
          iconPos="right"
        />
      </div>
      <div className="mt-4">
        <DataTable
          className="bg-BgPrimaryColor border rounded border-BorderColor"
          columns={columns}
          loader={loader}
          data={data}
          showGridlines={true}
        />
      </div>
    </div>
  );
};

export default ProductList;
