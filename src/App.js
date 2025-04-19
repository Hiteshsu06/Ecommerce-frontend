import './App.css';

// components
import Loading from '@common/Loading';

// utils
import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

// Admin pages
const Login = lazy(() => import("@pages/LoginPage"));
const Signup = lazy(() => import("@pages/SignupPage"));
const DashboardPage = lazy(() => import("@pages/DashboardPage"));
const ForgotPassword = lazy(() => import("@pages/ForgotPasswordPage"));
const ResetPassword = lazy(() => import("@pages/ResetPasswordPage"));
const NotAuthorizedPage = lazy(() => import("@pages/NotAuthorizedPage"));
const HelpdeskPage = lazy(() => import("@pages/HelpdeskPage"));
const ProfilePage = lazy(() => import("@pages/ProfilePage"));

// User pages
const MainPage = lazy(()=> import("@pages/MainPage"));
const ViewCart = lazy(() => import("@pages/ViewCartPage"));
const CollectionDescription = lazy(() => import("@pages/CollectionDescription"));
const LatestBlogDescription = lazy(() => import("@pages/LatestBlogDescription"));
const ProductDescription = lazy(() => import("@pages/ProductDescription"));
const Payment = lazy(() => import("@pages/Payment"));
const PaymentConfirmed = lazy(() => import("@pages/PaymentConfirmed"));
const PaymentRejected = lazy(() => import("@pages/PaymentRejected"));
const SignIn = lazy(() => import("@pages/SignIn"));
const Register = lazy(() => import("@pages/Register"));
const UserProfilePage = lazy(() => import("@pages/UserProfilePage"));
const UserHelpPage = lazy(() => import("@pages/UserHelpPage"));
const UserResetPasswordPage = lazy(() => import("@pages/UserResetPasswordPage"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const TermsAndCondition = lazy(() => import("@pages/TermsAndCondition"));
const CategoryDescriptionPage = lazy(() => import("@pages/CategoryDescriptionPage"));
const ReturnExchangePolicyPage = lazy(() => import("@pages/ReturnExchangePolicyPage"));
const ShippingPolicyPage = lazy(() => import("@pages/ShippingPolicyPage"));
const PrivacyPolicyPage = lazy(() => import("@pages/PrivacyPolicyPage"));
const ContactUsPage = lazy(() => import("@pages/ContactUsPage"));
const TrackOrderPage = lazy(() => import("@pages/TrackOrderPage"));

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
          <Route path="/collection/:name" element={<CollectionDescription />}/>
          <Route path="/product/:name" element={<ProductDescription />}/>
          <Route path="/payment" element={<Payment />}/>
          <Route path="/payment-confirmed" element={<PaymentConfirmed />}/>
          <Route path="/payment-rejected" element={<PaymentRejected />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/edit-profile" element={<UserProfilePage />}/>
          <Route path="/user-help" element={<UserHelpPage />}/>
          <Route path="/user-reset-password" element={<UserResetPasswordPage />}/>
          <Route path="/about-us" element={<AboutUs />}/>
          <Route path="/terms-condition" element={<TermsAndCondition />}/>
          <Route path="/category-description/:name" element={<CategoryDescriptionPage />}/>
          <Route path="/sub-category-description/:name" element={<CategoryDescriptionPage />}/>
          <Route path="/return-exchange-policy" element={<ReturnExchangePolicyPage />}/>
          <Route path="/shipping-policy" element={<ShippingPolicyPage />}/>
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />}/>
          <Route path="/contact-us" element={<ContactUsPage />}/>
          <Route path="/track-order" element={<TrackOrderPage />}/>
          
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
