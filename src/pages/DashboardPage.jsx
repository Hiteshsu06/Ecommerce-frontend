// components
import { Topbar, Sidebar, CategoryList, ProductList, DashboardStats, SubCategoryList, InventoryList, OrderList, CouponList, ReportList, DiscountList, UserList, BlogList, FestivalSpecialList} from "../components/index";
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
      <div className={`sidebar ${toggle ? "w-[300px]" : "w-[103px]"} h-full`}>
        <Sidebar toggle={toggle}/>
      </div>
      <div className="w-full">
        <Topbar toggleExpansionSwitch={toggleExpansionSwitch} />
        <div className="h-[calc(100%_-_4rem)] bg-BgPrimaryColor px-5 py-2 overflow-y-scroll">
          <Suspense fallback={<Loading loadingText={t("loading")} />}>
            <Routes>
              <Route path="/" element={<DashboardStats />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/sub-categories" element={<SubCategoryList />} />
              <Route path="/products" element={<ProductList />}/>
              <Route path="/inventories" element={<InventoryList />}/>
              <Route path="/orders" element={<OrderList />}/>
              <Route path="/coupons" element={<CouponList />}/>
              <Route path="/discounts" element={<DiscountList />}/>
              <Route path="/addresess" element={<CouponList />}/>
              <Route path="/users" element={<UserList />}/>
              <Route path="/reports" element={<ReportList />}/>
              <Route path="/blogs" element={<BlogList />}/>
              <Route path="/fests" element={<FestivalSpecialList />}/>
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
