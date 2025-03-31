// hooks
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// components
import Breadcrum from "@common/Breadcrum";
import NestedDatatable from "@common/NestedDatatable";
import ButtonComponent from "@common/ButtonComponent";
import Confirmbox from "@common/Confirmbox";
import { allApiWithHeaderToken } from "@api/api";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { Toast } from "primereact/toast";

const FestivalSpecialList = ({search}) => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loader, setLoader] = useState(false);

  const item = {
    heading: t("festival_special"),
    routes: [
      { label: t("dashboard"), route: ROUTES_CONSTANTS.DASHBOARD },
      { label: t("festival_special"), route: ROUTES_CONSTANTS.CATEGORIES },
    ],
  };

  const [data, setData] = useState([]);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <ButtonComponent
          icon="ri-pencil-line"
          className="text-[1rem]"
          onClick={() => editFestProducts(rowData)}
        />
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => confirmDeleteFestProducts(rowData)}
        />
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

  const nestedActionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <ButtonComponent
          icon="ri-pencil-line"
          className="text-[1rem]"
          onClick={() => editFestProducts(rowData)}
        />
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => confirmDeleteFestProducts(rowData)}
        />
      </div>
    );
  };

  const columns = [
    { field: "name", header: t("festival_name")},
    { header: t("status"), body: statusBodyTemplate },
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const nestedColumns = [
    { field: "product_name", header: t("product_name")},
    { header: t("action"), body: nestedActionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const editFestProducts = (item) => {
    navigate(`/edit-category/${item?.id}`);
  };

  const confirmDeleteFestProducts = (item) => {
    setIsConfirm(!isConfirm);
    setDeleteId(item?.id);
  };

  const closeDialogbox = () => {
    setDeleteId(null);
    setIsConfirm(!isConfirm);
  };

  const confirmDialogbox = () => {
    setIsConfirm(!isConfirm);
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_CATEGORIES_URL}/${deleteId}`, '', "delete")
      .then((response) => {
        if (response.status === 200) {
          fetchFestProductsList();
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

  function transformData(input) {
      return input.map((item, index) => ({
        key: `${index}`,
        data: {
          id: item?.id,
          name: item?.name,
          description: item?.description,
          createdAt: item?.createdAt,
          updatedAt: item?.updatedAt,
        },
        children: (item.children || []).map((child, childIndex) => ({
          key: `${index}-${childIndex}`,
          data: {
            name: child.product_name
          }
        })),
      }));
    }

  const fetchFestProductsList = () => {
    setLoader(true);
    let body = {
      search: search,
      skip: 0,
      limit:10
    }
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_CATEGORIES_URL}/filter`, body , "post")
      .then((response) => {
        if (response.status === 200) {
          let nestedData = [
            {
                key: '0',
                name: 'Documents',
                data: 'Documents Folder',
                icon: 'pi pi-fw pi-inbox',
                children: [
                    {
                        key: '0-0',
                        product_name: 'Work',
                        data: 'Work Folder'
                    },
                    {
                      key: '0-0',
                      product_name: 'Work',
                      data: 'Work Folder'
                    },
                ]
            },
            {
                key: '1',
                name: 'Events',
                data: 'Events Folder',
                icon: 'pi pi-fw pi-calendar',
                children: [
                  {
                    key: '0-0',
                    product_name: 'Work',
                    data: 'Work Folder'
                  },
                  {
                    key: '0-0',
                    product_name: 'Work',
                    data: 'Work Folder'
                  },
                ]
          }]
          let transformedData = transformData(nestedData);
          setData(transformedData);
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
    fetchFestProductsList();
  }, [search]);

  const createFestProducts = () => {
    navigate(ROUTES_CONSTANTS.CREATE_FEST_PRODUCT);
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
          onClick={() => createFestProducts()}
          type="submit"
          label={t("create_fest_special")}
          className="rounded bg-TextPrimaryColor px-6 py-2 text-[12px] text-white"
        />
      </div>
      <div className="mt-4">
        <NestedDatatable
          className="bg-BgPrimaryColor border rounded border-BorderColor"
          columns={columns}
          nestedColumns={nestedColumns}
          data={data}
          loader={loader}
          showGridlines={true}
        />
      </div>
    </div>
  );
};

export default FestivalSpecialList;
