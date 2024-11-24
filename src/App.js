import './App.css';

// components
import Loading from '@common/Loading';

// utils
import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

// pages
const Login = lazy(() => import("@pages/LoginPage"));
const Signup = lazy(() => import("@pages/SignupPage"));
const DashboardPage = lazy(() => import("@pages/DashboardPage"));
const CategoryForm = lazy(() => import("@components/Category/CategoryForm"));
const ProductForm = lazy(() => import("@components/Product/ProductForm"));
const MainPage = lazy(()=> import("@pages/MainPage/MainPage"));
const ForgotPassword = lazy(() => import("@pages/ForgotPasswordPage"));
const ResetPassword = lazy(() => import("@pages/ResetPasswordPage"));

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
          <Route path="/create-product" element={<ProductForm />}/>
          <Route path="/edit-product/:id" element={<ProductForm />}/>
        </Routes>
    </Suspense>
  );
}

export default App;
