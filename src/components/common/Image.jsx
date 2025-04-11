import { useState } from 'react';

const Image = ({ alt, height, src, width, className, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative h-full">
      {isLoading && (
        <div className="h-full inset-0 z-50 flex items-center justify-center bg-white">
          <div className="relative flex flex-col items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border border-gray-200 border-t-[#caa446]"></div>
          </div>
        </div>
      )}
      <img
        alt={alt}
        height={height}
        src={src}
        width={width}
        className={isLoading ? `opacity-0 ${className}` : `opacity-100 ${className}`}
        onLoad={handleLoad}
        onClick={onClick}
        onError={() => setIsLoading(false)} // In case of error, remove loader
      />
    </div>
  );
};

export default Image;