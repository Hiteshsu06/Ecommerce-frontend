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
import { Toast } from "primereact/toast";
import { API_CONSTANTS } from "../../../constants/apiurl";
import DefaultImage from "../../../assets/no-image.jpeg";

const BlogList = () => {
  const toast = useRef(null);
  const [data, setData] = useState([]);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loader, setLoader] = useState(false);

  const item = {
    heading: t("blog"),
    routes: [
      { label: t("dashboard"), route: ROUTES_CONSTANTS.DASHBOARD },
      { label: t("blog"), route: ROUTES_CONSTANTS.BLOGS },
    ],
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <ButtonComponent
          icon="ri-pencil-line"
          className="text-[1rem]"
          onClick={() => editBlog(rowData)}
        />
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => confirmDeleteBlog(rowData)}
        />
      </div>
    );
  };

  const nameBodyTemplate= (rowData) => {
    return (
      <div className="flex items-center gap-4">
        <div className="w-[60px] overflow-hidden h-[60px]">
          <img src={rowData?.image_url ? rowData?.image_url : DefaultImage} alt="" width={80} style={{height: "100%"}}/>
        </div>
        <span>{rowData?.heading}</span>
      </div>
    );
  };

  const statusBodyTemplate= (rowData) => {
    return (
      <div className="flex items-center gap-4">
        {rowData?.status === 1 ? <span className="text-[green]">Active</span> : <span className="text-[red]">Inactive</span>}
      </div>
    );
  };

  const columns = [
    { header: t("name"), body: nameBodyTemplate, headerStyle: { paddingLeft: '3%'} },
    { field: "description", header: t("description") },
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const editBlog = (item) => {
    navigate(`/edit-blog/${item?.id}`);
  };

  const confirmDeleteBlog = (item) => {
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
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_BLOGS_URL}/${deleteId}`,"", "delete")
      .then((response) => {
        if (response?.status === 200) {
          fetchBlogList();
        } 
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err?.response?.data?.errors,
          life: 3000,
        });
      }).finally(()=>{
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  const fetchBlogList = () => {
    setLoader(true);
    allApiWithHeaderToken(API_CONSTANTS.COMMON_BLOGS_URL, "" , "get")
      .then((response) => {
        if (response?.status === 200) {
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
      }).finally(()=>{
        setLoader(false);
      });
  };

  const createBlog = () => {
    navigate(ROUTES_CONSTANTS.CREATE_BLOG);
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
          onClick={() => createBlog()}
          type="submit"
          label={t("create_blog")}
          className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
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

export default BlogList;
