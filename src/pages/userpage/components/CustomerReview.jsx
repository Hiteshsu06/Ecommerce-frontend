import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Rating } from "primereact/rating";

const CustomerReview = () => {
  const { t } = useTranslation("msg");
  const [addReview, setAddReview] = useState(false);
  const [review, setReview] = useState({
    name: "",
    reviewHeading: "",
    rating: 0,
    email: "",
    file: null
  });

  const reviews = [
    {
        id: 1,
        name: "Manjunatha",
        date: "09/17/2024",
        rating: 5,
        verified: true,
        content: "Items was very good. Sweets was very tasty. It was worth to purchase.",
    },
    {
        id: 2,
        name: "Manjunatha",
        date: "09/17/2024",
        rating: 5,
        verified: true,
        content: "Items was very good. Sweets was very tasty. It was worth to purchase.",
    },
  ];

  const handleFileChange = (event) => {
    setReview({...review, file: event.target.files[0]});
  };

  return (
    <div className="border rounded-lg p-12 bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-2">{t("customer_reviews")}</h2>
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <i className="ri-star-fill" key={i}></i>
          ))}
        </div>
        <p className="text-gray-600"> {t("based_on")} {reviews.length} {t("reviews")}</p>
      </div>
      <div className='mt-4 flex justify-between'>
        <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                {[...Array(stars)].map((_, i) => (
                    <i className="ri-star-fill" key={i}></i>
                ))}
                </div>
                <div className="w-40 h-2 bg-gray-200 rounded">
                {stars === 5 && <div className="h-full bg-yellow-500 w-full rounded"></div>}
                </div>
                <p className="text-gray-600">0% (0)</p>
            </div>
            ))}
        </div>
        <button className="mt-4 px-4 py-2 border rounded text-sm h-[40px]" onClick={()=>{ setAddReview(!addReview) }}>
            {
                addReview ? t("cancel_review") : t("write_a_review")
            }
        </button>
      </div>
      {
        addReview ?
            <div className="mt-8 p-4 border rounded-lg bg-white">
                <div className='mt-4'>
                    <p className="font-semibold mb-2">{t("add_rating")}</p>
                    <Rating value={review?.rating} cancel={false} onChange={(e) => setReview({...review, rating: e.value})}  />
                </div>
                <div className="mb-2 mt-4">
                    <p className="font-semibold">{t("name")}</p>
                    <input
                        className="w-full mt-2 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                        maxLength="20"
                        type="name"
                        value={review?.name}
                        onChange={(e) => setReview({...review, name: e?.target?.value})}
                    />
                </div>
                <div className="mb-2 mt-4">
                    <p className="font-semibold">{t("your_email")}</p>
                    <input
                        className="w-full mt-2 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                        maxLength="20"
                        type="email"
                        value={review?.email}
                        onChange={(e) => setReview({...review, email: e?.target?.value})}
                    />
                </div>
                <div className="mb-4 mt-4 relative">
                    <p className="font-semibold mb-2">{t("add_photo_or_video")}</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-100 relative">
                        <i className={`${review?.file ? "ri-cloud-fill text-[24px]": "ri-cloud-line text-[24px]"}`}></i>
                        <span className="text-gray-600 text-sm mt-2">{review?.file ? t("file_has_been_uploaded", {name: review?.file?.name}) : t("click_here_to_upload")}</span>
                        <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            onChange={handleFileChange} 
                        />
                    </div>
                </div>
                <div>
                    <p className="font-semibold">{t("write_your_review")}</p>
                    <textarea
                        className="w-full mt-2 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                        rows="4"
                        maxLength="400"
                        placeholder={t("would_you_like_to_write")}
                        value={review?.reviewHeading}
                        onChange={(e) => setReview({reviewHeading: e.target.value})}
                    ></textarea>
                    <p className="text-right text-gray-500 text-sm">{400 - review?.reviewHeading?.length} {t("characters_remaining")}</p>
                </div>
                <div className='flex justify-end'>
                    <button className="mt-4 px-4 py-2 border rounded text-sm h-[40px]" onClick={()=>{ setAddReview(!addReview) }}>
                        {t("submit")}
                    </button>
                </div>
            </div>
      : null
      }
      <div className="mt-6 border-t pt-4">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4 mt-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">
              {review.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <i className="ri-star-fill" key={i}></i>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{review.date}</p>
              </div>
              <p className="font-bold flex items-center gap-2">
                {review.verified && (
                  <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">Verified</span>
                )}
                {review.name}
              </p>
              <p className="text-gray-700">{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerReview;