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
const MainPage = lazy(()=> import("@pages/MainPage/MainPage"));
const ForgotPassword = lazy(() => import("@pages/ForgotPasswordPage"));
const ResetPassword = lazy(() => import("@pages/ResetPasswordPage"));
const NotAuthorizedPage = lazy(() => import("@pages/NotAuthorizedPage"));
const HelpdeskPage = lazy(() => import("@pages/HelpdeskPage"));
const ViewCart = lazy(() => import("@pages/MainPage/Home/ViewCartPage"));
const CollectionDescription = lazy(() => import("@pages/MainPage/Home/CollectionDescription"));
const LatestBlogDescription = lazy(() => import("@pages/MainPage/Home/LatestBlogDescription"));
const ProductDescription = lazy(() => import("@pages/MainPage/Home/ProductDescription"));
const ProfilePage = lazy(() => import("@pages/ProfilePage"));

function App() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
      document.body.classList.add('dark-theme');
  }

  return (
    <Suspense fallback={<Loading />}>
        <Routes>
          {/* Routes for user screen */}
          <Route path="/" element={<MainPage />}/>
          <Route path="/view-cart" element={<ViewCart />}/>
          <Route path="/view-blog" element={<LatestBlogDescription />}/>
          <Route path="/collections/:name" element={<CollectionDescription />}/>
          <Route path="/products/*" element={<ProductDescription />}/>
          
          {/* Routes for admin screen */}
          <Route path="/dashboard/*" element={<DashboardPage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/profile/:id" element={<ProfilePage />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path="/not-authorized" element={<NotAuthorizedPage />}/>
          <Route path="/help" element={<HelpdeskPage />}/>
        </Routes>
    </Suspense>
  );
}

export default App;
