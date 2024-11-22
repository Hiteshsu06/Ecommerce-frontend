// components
import { Topbar, Sidebar, CategoryList, ProductList, DashboardStats } from "../components/index";
import Loading from "@common/Loading";

// utils
import { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DashboardPage = () => {
  const [toggle, setToggle] = useState(true);
  const { t } = useTranslation("msg");
  const toggleExpansionSwitch = (key) => {
    setToggle(key);
  };
 
  return (
    <div className="flex h-screen overflow-hidden bg-BgPrimaryColor">
      <div className={`sidebar ${toggle ? "open" : "closed"} h-full`}>
        <Sidebar />
      </div>
      <div className="w-full">
        <Topbar toggleExpansionSwitch={toggleExpansionSwitch} />
        <div className="h-[calc(100%_-_4rem)] bg-BgPrimaryColor px-5 py-2 overflow-y-scroll">
          <Suspense fallback={<Loading loadingText={t("loading")} />}>
            <Routes>
              <Route path="/" element={<DashboardStats />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route
                path="/products"
                element={<ProductList />}
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
