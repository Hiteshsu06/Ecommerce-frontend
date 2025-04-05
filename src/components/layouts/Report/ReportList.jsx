// hooks
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// components
import Breadcrum from "@common/Breadcrum";
import DataTable from "@common/DataTable";
import ButtonComponent from "@common/ButtonComponent";
import { allApiWithHeaderToken } from "@api/api";
import { ROUTES_CONSTANTS } from "@constants/routesurl";
import { API_CONSTANTS } from "@constants/apiurl";
import { Toast } from "primereact/toast";

const dummyData = [
  {id: "1", year: "2024", month: "July", report: "July_Month_Revenue_Report.csv"},
  {id: "2", year: "2024", month: "August", report: "August_Month_Revenue_Report.csv"},
  {id: "3", year: "2024", month: "September", report: "September_Month_Revenue_Report.csv"},
  {id: "4", year: "2024", month: "October", report: "October_Month_Revenue_Report.csv"},
  {id: "5", year: "2024", month: "November", report: "November_Month_Revenue_Report.csv"},
  {id: "6", year: "2024", month: "December", report: "December_Month_Revenue_Report.csv"},
  {id: "7", year: "2025", month: "January", report: "January_Month_Revenue_Report.csv"}
];

const ReportList = ({search}) => {
  const toast = useRef(null);
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const [data, setData] = useState(dummyData);
  const [loader, setLoader] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const item = {
    heading: t("report"),
    routes: [
      { label: t("dashboard"), route: ROUTES_CONSTANTS.DASHBOARD },
      { label: t("report"), route: ROUTES_CONSTANTS.REPORTS },
    ],
  };

  const reportTemplate= (rowData) => {
    return (
      <div className="flex items-center gap-4">
        <a href="/" target="_blank" rel="noopener noreferrer" className="text-[#0000EE]">{rowData?.report}</a>
      </div>
    );
  };

  const columns = [
    { field: "year", header: t("year")},
    { field: "month", header: t("month")},
    { header: t("report"),  body: reportTemplate}
  ];

  const fetchReportList = () => {
    // setLoader(true);
    // allApiWithHeaderToken(API_CONSTANTS.COMMON_REPORT_URL, "" , "get")
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setData(response?.data);
    //     } else {
    //       toast.current.show({
    //         severity: "error",
    //         summary: "Error",
    //         detail: "",
    //         life: 3000,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("err", err);
    //     toast.current.show({
    //       severity: "error",
    //       summary: "Error",
    //       detail: "Something Went Wrong",
    //       life: 3000,
    //     });
    //   }).finally(()=>{
    //     setLoader(false);
    //   });
  };

  useEffect(() => {
    fetchReportList(0,5);
  }, [search]);

  const paginationChangeHandler = (skip, limit) => {
    setSkip(skip);
    setLimit(limit);
    fetchReportList(skip, limit);
  };

  return (
    <div className="text-TextPrimaryColor">
      <Toast ref={toast} position="top-right" />
      <Breadcrum item={item} />
      <div className="mt-4 flex justify-start bg-BgSecondaryColor border rounded border-BorderColor p-2 py-3">
        <span className="text-[13px] text-TextSecondaryColor ms-[4px] font-[600]">
          {t("month_wise_revenue_report")}  
        </span> 
      </div>
      <div className="mt-4">
        <DataTable
          className="bg-BgPrimaryColor border rounded border-BorderColor"
          columns={columns}
          data={data}
          skip={skip}
          rows={limit}
          total={total}
          paginationChangeHandler={paginationChangeHandler}
          loader={loader}
          showGridlines={true}
        />
      </div>
    </div>
  );
};

export default ReportList;
