// Utils
import React, {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Components
import { API_CONSTANTS } from "@constants/apiurl";
import { allApiWithHeaderToken } from "@api/api";
import { ROUTES_CONSTANTS } from "@constants/routesurl";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("msg");
  const { order } = location?.state || {};
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (elements == null) {
      return;
    }
  
    setIsProcessing(true); // Show processing state
  
    try {
      // Call elements.submit() first
      const submitResult = await elements.submit();
  
      if (submitResult.error) {
        setErrorMessage(submitResult.error.message); // Show error message from submission
        setIsProcessing(false); // Hide processing state
        return;
      }

      let body ={
        amount: order?.total_price + order?.handling_fee + order?.tax_price
      }
  
      // Make an API call to create the payment intent and get the client secret
      const response = await allApiWithHeaderToken(API_CONSTANTS.PAYMENT_INTENT_CREATE, body, "post");
  
      // Check if the response was successful and get the client_secret
      if (response?.status === 200 && response?.data?.client_secret) {
        const clientSecret = response.data.client_secret;  // Extract the client_secret
  
        // Now, confirm the payment using the client_secret
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: window?.location?.origin + ROUTES_CONSTANTS.PAYMENT_CONFIRMED, // Pass return_url here for Stripe
          },
           redirect: "if_required"
        });
  
        if (error) {
          setErrorMessage(error.message); // Show error message to the user
        } else {
          // paymentIntent.status will help you check the payment status
          if (paymentIntent.status === 'succeeded') {
              navigate(ROUTES_CONSTANTS.PAYMENT_CONFIRMED, { 
                state: { 
                        order: order
                    } 
              });
          } else {
            // Payment failed or was canceled
            setErrorMessage('Payment failed, please try again.'); // Show failure message
          }
        }
      } else {
        setErrorMessage("Failed to retrieve client secret from server.");
      }
    } catch (error) {
        // navigate(ROUTES_CONSTANTS.PAYMENT_REJECTED);
        setErrorMessage("An error occurred while processing your payment.");
    } finally {
      setIsProcessing(false); // Hide processing state
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <PaymentElement className="w-full" />
      
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full mt-4 bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition duration-200 text-sm sm:text-base"
      >
        {isProcessing
          ? t("processing_payment")
          : `Pay ₹ ${order?.total_price + order?.handling_fee + order?.tax_price}`}
      </button>

      <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
        {t("you_will_be_redirected_to_stripe_to_complete_your_payment")}
      </p>

      {errorMessage && (
        <div className="text-red-600 text-xs text-center">{errorMessage}</div>
      )}
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const { order } = location?.state || {};
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { t } = useTranslation("msg");

  // stripe
  
  const stripePromise = loadStripe('pk_test_51RDAUiCpms7NHvWSBlZRktPM4SBH5YbgOo0gWHgfoM5qYLArs1fe55YtX4MW1DS1OdyhMXDKTDWXTfoHLavvoQQn00Nox9H4x6');
  const options = {
    mode: 'payment',
    amount: order?.total_price,
    currency: 'usd',
    enableLink: false,
    wallets: {
      applePay: 'auto',
      googlePay: 'auto'
    },
    // paymentMethodTypes: ['card'],
    automatic_payment_methods: {
      enabled: true
    },
  };

  // Deivery Date
  const today = new Date();
  const fiveDaysFromToday = new Date();
  fiveDaysFromToday.setDate(today.getDate() + 5);
  const eightDaysFromToday = new Date();
  eightDaysFromToday.setDate(today.getDate() + 8);
  const optionsDate = { month: 'long', day: 'numeric' };
  const formattedRange = `${fiveDaysFromToday.toLocaleDateString("en-US", optionsDate)}–${eightDaysFromToday.toLocaleDateString("en-US", optionsDate)}, ${today.getFullYear()}`;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-50 p-4 sm:p-6 md:p-8 border-b">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-bold text-gray-800 mb-2">
            {t("checkout")}
          </h1>
          <p className="text-gray-600 mb-1 text-center text-xs sm:text-sm">
            {t("complete_your_purchase_by_providing_your_payment_details")}
          </p>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Left column - Payment form */}
            <div className="lg:col-span-3 w-full">
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
              </Elements>
            </div>

            {/* Right column - Order summary */}
            <div className="lg:col-span-2 w-full space-y-6">
              <section className="bg-gray-50 p-4 sm:p-6 rounded-md">
                <h2 className="font-semibold text-gray-800 mb-4 text-base">{t("order_summary")}</h2>
                <hr className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span>₹ {order?.total_price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("shipping")}</span>
                    <span>₹ {order?.handling_fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("tax")}</span>
                    <span>₹ {order?.tax_price}</span>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-bold text-sm">
                  <span>{t("total")}</span>
                  <span>₹ {order?.total_price + order?.handling_fee + order?.tax_price}</span>
                </div>
              </section>

              <section className="bg-gray-50 p-4 sm:p-6 rounded-md">
                <h2 className="text-base font-semibold text-gray-800 mb-4">{t("shipping")}</h2>
                <address className="not-italic text-sm">
                  <p className="font-medium">{userDetails?.name}</p>
                  <p>{order?.flat_no} {order?.city}</p>
                  <p>{order?.zip_code} {order?.state}</p>
                  <p>{order?.country}</p>
                </address>
                <p className="text-gray-500 mt-2 text-sm">
                  {t("estimated_delivery")}: {formattedRange}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-xs sm:text-sm text-gray-500 px-2">
        <p>{t("your_payment_information_is_encrypted_and_secure")}</p>
        <p className="mt-1">{t("by_completing_this_purchase_you_agree_terms_and_condition")}</p>
      </div>
    </div>
  )
}

export default Payment;