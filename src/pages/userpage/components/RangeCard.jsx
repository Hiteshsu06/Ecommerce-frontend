// Utils
import { useTranslation } from "react-i18next";

// Components
import Image from "@common/Image";

const RangeCard = ({ data }) => {
  const { t } = useTranslation("msg");

  return (
    <div className="flex flex-col cursor-pointer select-none">
      {/* Image Card */}
      <div className="w-full h-[280px] sm:h-[300px] md:h-[360px] lg:h-[380px] rounded-lg overflow-hidden bg-white shadow-md">
        <Image
          src={data?.category?.image_url}
          className="w-full h-full object-cover"
          alt={data?.category?.name}
          draggable="false"
        />
      </div>

      {/* Content */}
      <div className="pt-3 px-2 text-center">
        <div className="text-[#242323] font-semibold text-base sm:text-lg md:text-[1.1rem]">
          {data?.category?.name}
        </div>
        <div className="text-[#020202] text-sm sm:text-base">
          {data?.products_count} {t("products")}
        </div>
      </div>
    </div>
  );
};

export default RangeCard;
