// Utils
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Components
import { ROUTES_CONSTANTS } from "@constants/routesurl";
import Image from "@common/Image";

const CollectionCard = ({ data }) => {
  const { t } = useTranslation("msg");
  const navigate = useNavigate();

  const collectionDescription=(item)=>{
    navigate(
        `${ROUTES_CONSTANTS.VIEW_COLLECTION_DESCRIPTION}/${item?.name}`, 
    { 
    state: { 
        subCategoryId: item?.id,
        name: item?.name,
        subCategory: true
    } })
  }

  return (
    <div className="flex flex-col cursor-pointer select-none pb-1">
        <div className='flex-shrink-0 w-full h-[30rem] rounded-lg overflow-hidden bg-white shadow-md card aspect-[0.7171875]'>
            <Image
                src={data?.image_url}
                className="w-full h-full object-cover"
                alt={data?.name}
                draggable="false"
                onClick={() => { collectionDescription(data) }}
            />
        </div>
        <div className="p-4">
            <div className='text-[#242323] text-center font-semibold text-[1.3rem]'>{data?.name}</div>
            <div className='text-center text-[#020202]'>{data?.description}</div>
        </div>
        <div className='mt-2'>
            <button onClick={() => { collectionDescription(data) }} className="w-full px-8 py-3 text-[#242323] text-[18px] border border-gray-900 rounded-md transition-all duration-300 hover:bg-gray-900 hover:text-white">
                {t("view_collection")}
            </button>
        </div>
    </div>
  )
}

export default CollectionCard;