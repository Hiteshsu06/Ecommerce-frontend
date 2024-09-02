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
const InventoryForm = lazy(() => import("@components/Inventory/InventoryForm"));
const ShopForm = lazy(()=> import("@components/Shop/ShopForm"));
const MainPage = lazy(()=> import("@pages/MainPage/MainPage"));

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
          <Route path="/signup" element={<Signup />}/>
          <Route path="/dashboard/*" element={<DashboardPage />}/>
          <Route path="/create-category" element={<CategoryForm />}/>
          <Route path="/edit-category/:id" element={<CategoryForm />}/>
          <Route path="/create-product" element={<ProductForm />}/>
          <Route path="/edit-product/:id" element={<ProductForm />}/>
          <Route path="/create-inventory" element={<InventoryForm />}/>
          <Route path="/edit-inventory/:id" element={<InventoryForm />}/>
          <Route path="/create-shop" element={<ShopForm />}/>
          <Route path="/edit-shop/:id" element={<ShopForm />}/>
        </Routes>
    </Suspense>
  );
}

export default App;
