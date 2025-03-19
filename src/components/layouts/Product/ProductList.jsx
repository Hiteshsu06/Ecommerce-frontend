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
import { Dialog } from 'primereact/dialog';
import FileUpload from "@common/FileUpload";

const ProductList = () => {
  const toast = useRef(null);
  const [data, setData] = useState([]);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [toastType, setToastType] = useState(''); 
  const [bulkUploadFile, setBulkUploadFile] = useState(null);

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
          onClick={() => editProduct(rowData)}
        />
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => confirmDeleteProduct(rowData)}
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
        <span>{rowData?.name}</span>
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
    { field: "sub_category_name", header: t("sub_category") },
    { field: "price", header: t("price") },
    { field: "discounted_price", header: t("discount") },
    { field: "final_price", header: t("final_price") },
    { field: "weight", header: t("weight") },
    { field: "description", header: t("description") },
    { header: t("status"), body: statusBodyTemplate },
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const editProduct = (item) => {
    navigate(`/edit-product/${item?.id}`);
  };

  const confirmDeleteProduct = (item) => {
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
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_PRODUCTS_URL}/${deleteId}`,"", "delete")
      .then((response) => {
        if (response?.status === 200) {
          fetchProductList();
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
    fetchProductList();
  }, []);

  const fetchProductList = () => {
    setLoader(true);
    allApiWithHeaderToken(API_CONSTANTS.COMMON_PRODUCTS_URL, "" , "get")
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

  const createStock = () => {
    navigate(ROUTES_CONSTANTS.CREATE_PRODUCT);
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
        <span className="font-bold white-space-nowrap">{t("bulk_product_upload")}</span>
    </div>
  );

  const footerContent = (
      <div className="flex justify-end gap-4">
          <ButtonComponent
            onClick={() => setVisible(false)}
            type="button"
            label={t("back")}
            className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
          />
          <ButtonComponent
            onClick={() => {
              bulkUploadFileHandle();
            }}
            type="submit"
            label={t("submit")}
            className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white"
          />
      </div>
  );

  const bulkUploadFileHandle =()=>{
    let data = {
      file: bulkUploadFile
    };
    setLoader(true);
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_PRODUCTS_URL}/bulk_upload`, data, "post", 'multipart/form-data').then((response) => {
        if (response.status === 200) {
          successToaster(response);
          setVisible(false);
          fetchProductList();
        }
      })
    .catch((err) => {
      errorToaster(err?.response?.data?.errors);
      setLoader(false);
    }).finally(()=>{
      setLoader(false);
    });
  }

  const successToaster=(response)=>{
    setToastType('success');
    return toast.current.show({
      severity: "success",
      summary: t("success"),
      detail: response?.data?.message,
      life: 500
    });
  };

  const errorToaster=(err)=>{
    setToastType('error');
    return toast.current.show({
      severity: "error",
      summary: t("error"),
      detail: err,
      life: 1000
    });
  };

  const importBulkStock = ()=>{
    setVisible(true)
  }

  const downloadTemplate=()=>{
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_PRODUCTS_URL}/download_template`, "" , "get", "", "blob")
    .then((response) => {
      if(response?.status){
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
        const fileName = `${formattedDate}product_template.xlsx`;

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
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
          type="submit"
          onClick={downloadTemplate}
          label={t("download_template")}
          className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white me-2"
        />
        <ButtonComponent
          onClick={importBulkStock}
          type="submit"
          label={t("import_products")}
          className="rounded bg-BgTertiaryColor px-6 py-2 text-[12px] text-white me-2"
        />
        <ButtonComponent
          onClick={createStock}
          type="submit"
          label={t("create_product")}
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
      <Dialog visible={visible} modal header={headerElement} footer={footerContent} style={{ width: '50rem' }} onHide={() => {if (!visible) return; setVisible(false); }}>
          <FileUpload 
              name="image"
              isLabel={t("add_xlsx_file_here")} 
              onChange={(e)=> {
                setBulkUploadFile(e.target.files[0])
              }}
            />   
      </Dialog>
    </div>
  );
};

export default ProductList;
