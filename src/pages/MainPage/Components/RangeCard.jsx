import { useTranslation } from "react-i18next";

const RangeCard = ({ data }) => {
    const { t } = useTranslation("msg");

    return (
        <div className="flex flex-col cursor-pointer select-none">
            <div className='flex-shrink-0 w-80 h-96 rounded-lg overflow-hidden bg-white shadow-md card aspect-[0.7171875]'>
                <img
                    src={data?.category?.image_url}
                    className="w-full h-full object-cover"
                    alt={data?.category?.name}
                    draggable="false"
                />
            </div>
            <div className="p-4">
                <div className='text-[#242323] text-center font-semibold text-[1.3rem]'>{data?.category?.name}</div>
                <div className='text-center text-[#020202]'>{data?.products_count} {t("products")}</div>
            </div>
        </div>
    );
};

export default RangeCard;
