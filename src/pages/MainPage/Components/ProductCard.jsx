import React from 'react';

const ProductCard = ({data}) => {
    const hasHoverImage = !!data?.hoverUrl;

    return (
        <div className="w-[300px] h-[300px] bg-white rounded-xl shadow-md overflow-hidden">
            <div className="w-full h-[200px] relative">
                <img
                    src={hasHoverImage ? data.hoverUrl : data.defaultImage}
                    alt="Product"
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                        hasHoverImage ? "hover:scale-100" : "hover:scale-105"
                    }`}
                />
            </div>
        </div>
    );
}

export default ProductCard;
