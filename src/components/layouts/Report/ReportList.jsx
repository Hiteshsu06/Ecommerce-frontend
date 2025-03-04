// hooks
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// components
import Breadcrum from "@common/Breadcrum";
import DataTable from "@common/DataTable";
import ButtonComponent from "@common/ButtonComponent";
import { allApiWithHeaderToken } from "@api/api";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { Toast } from "primereact/toast";

const ReportList = () => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);

  const [loader, setLoader] = useState(false);

  const item = {
    heading: t("report"),
    routes: [
      { label: t("dashboard"), route: ROUTES_CONSTANTS.DASHBOARD },
      { label: t("report"), route: ROUTES_CONSTANTS.REPORTS },
    ],
  };

  const [data, setData] = useState([]);
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <ButtonComponent
          icon="ri-pencil-line"
          className="text-[1rem]"
          onClick={() => editReport(rowData)}
        />
        <ButtonComponent
          icon="ri-delete-bin-line"
          className="text-[1rem]"
          onClick={() => downloadReport(rowData)}
        />
      </div>
    );
  };

  const columns = [
    { field: "name", header: t("name")},
    { field: "description", header: t("description")},
    { header: t("action"), body: actionBodyTemplate, headerStyle: { paddingLeft: '3%'} },
  ];

  const editReport = (item) => {
    navigate(`/edit-report/${item?.id}`);
  };

  const downloadReport = (item) => {
    navigate(`/edit-report/${item?.id}`);
  };

  const fetchReportList = () => {
    setLoader(true);
    allApiWithHeaderToken(API_CONSTANTS.COMMON_REPORT_URL, "" , "get")
      .then((response) => {
        if (response.status === 200) {
          setData(response?.data);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "",
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
      });
  };

  useEffect(() => {
    fetchReportList();
  }, []);

  return (
    <div className="text-TextPrimaryColor">
      <Toast ref={toast} position="top-right" />
      <Breadcrum item={item} />
      <div className="mt-4 flex justify-end bg-BgSecondaryColor border rounded border-BorderColor p-2">
        <ButtonComponent
          onClick={() => downloadReport()}
          type="submit"
          label={t("download_report")}
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
          loader={loader}
          showGridlines={true}
        />
      </div>
    </div>
  );
};

export default ReportList;
