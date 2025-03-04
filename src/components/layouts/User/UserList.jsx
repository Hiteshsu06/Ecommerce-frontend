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
import InputTextComponent from "@common/InputTextComponent";
import { Toast } from "primereact/toast";

const UserList = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");

  const item = {
    heading: t("user"),
    routes: [
      { label: t("dashboard"), route: ROUTES_CONSTANTS.DASHBOARD },
      { label: t("user"), route: ROUTES_CONSTANTS.USERS },
    ],
  };

  const [data, setData] = useState([]);
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => confirmDeleteUser(rowData)}
        />
      </div>
    );
  };

  const columns = [
    { field: "name", header: t("name")},
    { field: "phone_number", header: t("phone_number")},
    { field: "email", header: t("email")},
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const confirmDeleteUser = (item) => {
    setIsConfirm(!isConfirm);
    setDeleteId(item?.id);
  };

  const closeDialogbox = () => {
    setDeleteId(null);
    setIsConfirm(!isConfirm);
  };

  const confirmDialogbox = () => {
    setIsConfirm(!isConfirm);
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_USERS_URL}/${deleteId}`, '', "delete")
      .then((response) => {
        if (response.status === 200) {
          fetchUserList();
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

  const fetchUserList = () => {
    setLoader(true);
    let body = {
      search: search
    }
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_USERS_URL}/filter`, body , "post")
      .then((response) => {
        if (response.status === 200) {
          setData(response?.data);
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
    fetchUserList();
  }, []);

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
        <InputTextComponent
            value={search}
            onChange={(e)=>{ setSearch(e.target.value); fetchUserList(); }}
            type="text"
            placeholder={t("search")}
            name="search"
            className="w-[240px] text-black rounded border-[1px] border-[#ddd] px-[1rem] py-[8px] text-[11px] focus:outline-none"
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

export default UserList;
