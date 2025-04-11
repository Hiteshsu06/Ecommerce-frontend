// Utils
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const Payment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderTotal: 1000,
    orderItems: []
  });
  const { t } = useTranslation("msg");

  const validationSchema = yup.object().shape({
    cardName: yup.string().required("Cardholder name is required"),
    cardNumber: yup
      .string()
      .matches(/^\d{16}$/, "Card number must be 16 digits")
      .required("Card number is required"),
    expDate: yup
      .string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date")
      .required("Expiration date is required"),
    cvv: yup
      .string()
      .matches(/^\d{3}$/, "CVV must be 3 digits")
      .required("CVV is required"),
  });

  const formik = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      // Simulate payment processing
      setTimeout(() => {
        setLoading(false);
        alert("Payment Successful!");
        navigate("/success"); // Redirect after payment
      }, 2000);
    },
  });

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-50 p-6 md:p-8 border-b">
        <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-800 mb-2">
          {t("checkout")}
        </h1>
        <p className="text-gray-600 mb-1 text-center text-[0.8rem]">
          {t("complete_your_purchase_by_providing_your_payment_details")}
        </p>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column - Payment form */}
          <div className="lg:col-span-3 space-y-6">
            <section>
              <h2 className="font-semibold text-gray-800 mb-4 text-[1rem]">{t("payment_method")}</h2>
              <div className="flex items-center mb-6 p-3 border rounded-md bg-blue-50">
                <i className="ri-bank-card-line h-6 w-4 text-blue-600 mr-2"></i>
                <span className="font-medium text-[0.9rem]">{t("debit_card")}</span>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700 text-[0.8rem]">{t("cardholder_name")}</label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="John Smith"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cardName}
                    className="text-[0.8rem] w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700 mt-1"
                  />
                  {formik.touched.cardName && formik.errors.cardName && (
                    <p className="text-red-500 text-[0.8rem]">{formik.errors.cardName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[0.8rem] font-medium text-gray-700">{t("card_number")}</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cardNumber}
                    className="text-[0.8rem] w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700 mt-1"
                  />
                  {formik.touched.cardNumber && formik.errors.cardNumber && (
                    <p className="text-red-500 text-[0.8rem]">{formik.errors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.8rem] font-medium text-gray-700">{t("expiration_date")}</label>
                    <input
                      type="text"
                      name="expDate"
                      placeholder="MM/YY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.expDate}
                      className="text-[0.8rem] w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700 mt-1"
                    />
                    {formik.touched.expDate && formik.errors.expDate && (
                      <p className="text-red-500 text-[0.8rem]">{formik.errors.expDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[0.8rem] font-medium text-gray-700">{t("cvv")}</label>
                    <input
                      type="password"
                      name="cvv"
                      placeholder="123"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cvv}
                      className="text-[0.8rem] w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700 mt-1"
                    />
                    {formik.touched.cvv && formik.errors.cvv && (
                      <p className="text-red-500 text-[0.8rem]">{formik.errors.cvv}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  {loading ? t("processing") : `Pay ${orderDetails?.orderTotal}`}
                </button>
                <p className="text-[0.8rem] text-gray-500 text-center mt-4">
                  {t("you_will_be_redirected_to_stripe_to_complete_your_payment")}
                </p>
              </form>
            </section>
          </div>

          {/* Right column - Order summary */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-gray-50 p-6 rounded-md">
              <h2 className="font-semibold text-gray-800 mb-4 text-[1rem]">{t("order_summary")}</h2>
              
              <div className="space-y-3">
                {orderDetails?.orderItems?.map((item) => (
                  <div key={item?.id} className="flex justify-between text-sm">
                    <span>{item?.name} (x{item?.quantity})</span>
                    <span className="font-medium">{item?.price}</span>
                  </div>
                ))}
              </div>
              
              <hr className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t("subtotal")}</span>
                  <span>$109.95</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t("shipping")}</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t("tax")}</span>
                  <span>$5.00</span>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="flex justify-between font-bold text-[0.9rem]">
                <span>{t("total")}</span>
                <span>${orderDetails?.orderTotal}</span>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-md">
              <h2 className="text-[1rem] font-semibold text-gray-800 mb-4">{t("shipping")}</h2>
              <address className="not-italic text-[0.8rem]">
                <p className="font-medium">Alex Johnson</p>
                <p>123 Main Street</p>
                <p>San Francisco, CA 94105</p>
                <p>United States</p>
              </address>
              <p className="text-gray-500 mt-2 text-[0.8rem]">{t("estimated_delivery")}: April 8-10, 2025</p>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div className="text-center mt-6 text-[0.8rem] text-gray-500">
      <p>{t("your_payment_information_is_encrypted_and_secure")}</p>
      <p className="mt-1">{t("by_completing_this_purchase_you_agree_terms_and_condition")}</p>
    </div>
  </div>
  )
}

export default Payment;