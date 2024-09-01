// hooks
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// components
import Breadcrum from "@common/Breadcrum";
import DataTable from "@common/DataTable";
import ButtonComponent from "@common/ButtonComponent";
import Confirmbox from "@common/Confirmbox";
import { allApi } from "@api/api";

const ProductList = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const item = {
    heading: t("product"),
    routes: [
      { label: t("dashboard"), route: "/dashboard" },
      { label: t("product"), route: "/dashboard/products" },
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
  const columns = [
    { field: "category", header: t("category") },
    { field: "productName", header: t("product_name") },
    { field: "price", header: t("price") },
    { field: "image", header: t("image") },
    { field: "stockAvailable", header: t("qty") },
    { field: "shopName", header: t("shop_name") },
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const editStock = (item) => {
    navigate(`/edit-product/${item?.id}`);
  };

  const confirmDeleteStock = (item) => {
    setIsConfirm(!isConfirm);
    setDeleteId(item?.id);
  };

  const closeDialogbox = () => {
    setDeleteId(null);
    setIsConfirm(!isConfirm);
  };

  const importBulkStock = () => {

  }

  const confirmDialogbox = () => {
    setIsConfirm(!isConfirm);
    allApi(`stockManagement/${deleteId}`, "", "delete")
      .then((response) => {
        fetchStockList();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchStockList();
  }, []);

  const fetchStockList = () => {
    // To get all stocks stored in json
    allApi("stockManagement", "", "get")
      .then((response) => {
        setData(response?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const createStock = () => {
    navigate("/create-product");
  };

  return (
    <div className="text-TextPrimaryColor">
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
          data={data}
          showGridlines={true}
        />
      </div>
    </div>
  );
};

export default ProductList;
