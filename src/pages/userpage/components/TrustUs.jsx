const TrustUs = () => {
    return (
      <div className="flex flex-col justify-center items-center p-6 sm:p-10">
        <h2 className="font-sans font-semibold text-center mt-2 text-sm sm:text-base md:text-lg">
          You Can Trust Us
        </h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-1 text-[#1D2E43] font-[playfair]">
          Clean, Authentic and Sustainable
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 px-4 sm:px-10 py-6 justify-center items-center">
          <img
            src="https://www.anandsweets.in/cdn/shop/files/since1988.svg?v=1684409220"
            alt="Trust Us"
            className="w-20 sm:w-24 md:w-32"
          />
          <img
            src="https://www.anandsweets.in/cdn/shop/files/makeinindia.svg?v=1684409255"
            alt="Trust Us"
            className="w-20 sm:w-24 md:w-32"
          />
          <img
            src="https://www.anandsweets.in/cdn/shop/files/iso_edb97c4a-6d94-4ffc-96cc-c17016c17130.svg?v=1684409274"
            alt="Trust Us"
            className="w-20 sm:w-24 md:w-32"
          />
          <img
            src="https://www.anandsweets.in/cdn/shop/files/ecofriendly.svg?v=1684409308"
            alt="Trust Us"
            className="w-20 sm:w-24 md:w-32"
          />
        </div>
      </div>
    );
  };
  
  export default TrustUs;  