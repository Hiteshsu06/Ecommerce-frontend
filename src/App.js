import './App.css';

// components
import Loading from '@common/Loading';

// utils
import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

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

// pages
const Login = lazy(() => import("@pages/LoginPage"));
const Signup = lazy(() => import("@pages/SignupPage"));
const DashboardPage = lazy(() => import("@pages/DashboardPage"));
const MainPage = lazy(()=> import("@pages/MainPage/MainPage"));
const ForgotPassword = lazy(() => import("@pages/ForgotPasswordPage"));
const ResetPassword = lazy(() => import("@pages/ResetPasswordPage"));
const NotAuthorizedPage = lazy(() => import("@pages/NotAuthorizedPage"));
const HelpdeskPage = lazy(() => import("@pages/HelpdeskPage"));

function App() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
      document.body.classList.add('dark-theme');
  }

  return (
    <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/dashboard/*" element={<DashboardPage />}/>
          <Route path="/create-category" element={<CategoryForm />}/>
          <Route path="/edit-category/:id" element={<CategoryForm />}/>
          <Route path="/create-sub-category" element={<SubCategoryForm />}/>
          <Route path="/edit-sub-category/:id" element={<SubCategoryForm />}/>
          <Route path="/create-product" element={<ProductForm />}/>
          <Route path="/edit-product/:id" element={<ProductForm />}/>
          <Route path="/create-inventory" element={<InventoryForm />}/>
          <Route path="/edit-inventory/:id" element={<InventoryForm />}/>
          <Route path="/create-order" element={<OrderForm />}/>
          <Route path="/edit-order/:id" element={<OrderForm />}/>
          <Route path="/create-coupon" element={<CouponForm />}/>
          <Route path="/edit-coupon/:id" element={<CouponForm />}/>
          <Route path="/create-discount" element={<DiscountForm />}/>
          <Route path="/edit-discount/:id" element={<DiscountForm />}/>
          <Route path="create-blog" element={<BlogForm />}/>
          <Route path="/edit-blog/:id" element={<BlogForm />}/>
          <Route path="/edit-fest-product/:id" element={<FestivalSpecialForm />}/>
          <Route path="/create-fest-product" element={<FestivalSpecialForm />}/>
          <Route path="/not-authorized" element={<NotAuthorizedPage />}/>
          <Route path="/help" element={<HelpdeskPage />}/>
        </Routes>
    </Suspense>
  );
}

export default App;
