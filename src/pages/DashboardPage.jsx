import { Topbar, Sidebar, CategoryList, ProductList, DashboardStats, SubCategoryList, InventoryList, OrderList, CouponList, ReportList, DiscountList, UserList, BlogList, FestivalSpecialList } from "../components/index";
import Loading from "@common/Loading";
import { Suspense, useState, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
const CategoryForm = lazy(() => import("@components/Category/CategoryForm"));
const SubCategoryForm = lazy(() => import("@components/SubCategory/SubCategoryForm"));
const ProductForm = lazy(() => import("@components/Product/ProductForm"));
const InventoryForm = lazy(() => import("@components/Inventory/InventoryForm"));
const OrderForm = lazy(() => import("@components/Order/OrderForm"));
const CouponForm = lazy(() => import("@components/Coupon/CouponForm"));
const DiscountForm = lazy(() => import("@components/Discount/DiscountForm"));
const BlogForm = lazy(() => import("@components/Blog/BlogForm"));
const FestivalSpecialForm = lazy(() => import("@components/FestivalSpecial/FestivalSpecialForm"));
const UserForm = lazy(() => import("@components/User/UserForm"));

const DashboardPage = () => {
  const [toggle, setToggle] = useState(true);
  const { t } = useTranslation("msg");
  const location = useLocation(); // Get the current route
  const [searchField, setSearchField] = useState("");

  const toggleExpansionSwitch = (key) => {
    setToggle(key);
  };

  const searchChangeHandler=(e)=>{
    setSearchField(e.target.value);
  }

  // Check if the current route is an edit or create route
  const isCreateOrEditPage = /\/(create|edit)-/.test(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden bg-BgPrimaryColor">
      {/* Conditionally render sidebar */}
      {!isCreateOrEditPage && (
        <div className={`sidebar ${toggle ? "w-[300px]" : "w-[103px]"} h-full`}>
          <Sidebar toggle={toggle} />
        </div>
      )}
      <div className="w-full">
        {/* Conditionally render topbar */}
        {!isCreateOrEditPage && <Topbar toggleExpansionSwitch={toggleExpansionSwitch} searchChangeHandler={searchChangeHandler} searchField={searchField}/>}
        <div className={`${isCreateOrEditPage ? "": "h-full bg-BgPrimaryColor px-5 py-2"}`}>
          <Suspense fallback={<Loading loadingText={t("loading")} />}>
            <Routes>
              <Route path="/" element={<DashboardStats />} />

              {/* Listings */}
              <Route path="/categories" element={<CategoryList search={searchField}/>} />
              <Route path="/sub-categories" element={<SubCategoryList search={searchField}/>} />
              <Route path="/products" element={<ProductList search={searchField}/>} />
              <Route path="/inventories" element={<InventoryList search={searchField}/>} />
              <Route path="/orders" element={<OrderList search={searchField}/>} />
              <Route path="/coupons" element={<CouponList search={searchField}/>} />
              <Route path="/discounts" element={<DiscountList search={searchField}/>} />
              <Route path="/addresess" element={<CouponList search={searchField}/>} />
              <Route path="/users" element={<UserList search={searchField}/>} />
              <Route path="/reports" element={<ReportList search={searchField}/>} />
              <Route path="/blogs" element={<BlogList search={searchField}/>} />
              <Route path="/fests" element={<FestivalSpecialList search={searchField}/>} />

              {/* Create / Update forms */}
              <Route path="/create-category" element={<CategoryForm />} />
              <Route path="/edit-category/:id" element={<CategoryForm />} />
              <Route path="/create-sub-category" element={<SubCategoryForm />} />
              <Route path="/edit-sub-category/:id" element={<SubCategoryForm />} />
              <Route path="/create-product" element={<ProductForm />} />
              <Route path="/edit-product/:id" element={<ProductForm />} />
              <Route path="/create-inventory" element={<InventoryForm />} />
              <Route path="/edit-inventory/:id" element={<InventoryForm />} />
              <Route path="/create-order" element={<OrderForm />} />
              <Route path="/edit-order/:id" element={<OrderForm />} />
              <Route path="/create-coupon" element={<CouponForm />} />
              <Route path="/edit-coupon/:id" element={<CouponForm />} />
              <Route path="/create-discount" element={<DiscountForm />} />
              <Route path="/edit-discount/:id" element={<DiscountForm />} />
              <Route path="create-blog" element={<BlogForm />} />
              <Route path="/edit-blog/:id" element={<BlogForm />} />
              <Route path="/edit-fest-product/:id" element={<FestivalSpecialForm />} />
              <Route path="/create-fest-product" element={<FestivalSpecialForm />} />
              <Route path="/edit-user/:id" element={<UserForm />} />
              <Route path="/create-user" element={<UserForm />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;