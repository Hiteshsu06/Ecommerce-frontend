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

const ShopList = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const item = {
    heading: t("shop"),
    routes: [
      { label: t("dashboard"), route: "/dashboard" },
      { label: t("shop"), route: "/dashboard/shops" },
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
    { field: "name", header: t("name") },
    { field: "description", header: t("description") },
    { field: "gstNo", header: t("gst_no") },
    { field: "image", header: t("image") },
    { field: "address", header: t("address") },
    { field: "contactNumber", header: t("contact_number") },
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
    allApi(`shop/${deleteId}`, "", "delete")
      .then((response) => {
        fetchShopList();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchShopList();
  }, []);

  const fetchShopList = () => {
    // To get all stocks stored in json
    allApi("shop", "", "get")
      .then((response) => {
        setData(response?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const createShop = () => {
    navigate("/create-shop");
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
