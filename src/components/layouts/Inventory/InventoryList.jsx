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

const InventoryList = () => {
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const item = {
    heading: t("inventory"),
    routes: [
      { label: t("dashboard"), route: "/dashboard" },
      { label: t("inventory"), route: "/dashboard/inventory" },
    ],
  };

  const [data, setData] = useState([]);
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <ButtonComponent
          icon="ri-pencil-line"
          className="text-[1rem]"
          onClick={() => editInventory(rowData)}
        />
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => confirmDeleteInventory(rowData)}
        />
      </div>
    );
  };
  const columns = [
    { field: "name", header: t("name") },
    { field: "product", header: t("address") },
    { field: "stock", header: t("qty") },
    { field: "shopName", header: t("shop_name") },
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const editInventory = (item) => {
    navigate(`/edit-inventory/${item?.id}`);
  };

  const confirmDeleteInventory = (item) => {
    setIsConfirm(!isConfirm);
    setDeleteId(item?.id);
  };

  const closeDialogbox = () => {
    setDeleteId(null);
    setIsConfirm(!isConfirm);
  };

  const confirmDialogbox = () => {
    setIsConfirm(!isConfirm);
    allApi(`inventory/${deleteId}`, "", "delete")
      .then((response) => {
        fetchInventoryList();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const fetchInventoryList = () => {
    // To get all users stored in json
    allApi("inventory", "", "get")
      .then((response) => {
        setData(response?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchInventoryList();
  }, []);

  const createInventory = () => {
    navigate("/create-inventory");
  };

  return (
    <div className="text-TextPrimaryColor">
      <Confirmbox
        isConfirm={isConfirm}
        closeDialogbox={closeDialogbox}
        confirmDialogbox={confirmDialogbox}
      />
      <Breadcrum item={item} />
      <div className="mt-4 flex justify-end bg-BgSecondaryColor border rounded border-BorderColor p-2">
        <ButtonComponent
          onClick={() => createInventory()}
          type="submit"
          label={t("create_inventory")}
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

export default InventoryList;
