const RangeCard = ({ data }) => {
    return (
        <div className="flex flex-col cursor-pointer select-none">
            <div className='flex-shrink-0 w-80 h-96 rounded-lg overflow-hidden bg-white shadow-md card aspect-[0.7171875]'>
                <img
                    src={data?.imageUrl}
                    className="w-full h-full object-cover"
                    alt={data?.name}
                    draggable="false"
                />
            </div>
            <div className="p-4">
                <div className='text-[#242323] text-lg font-semibold'>{data?.name}</div>
                <div className='text-[#252525]'>{data?.numberOfItems} Products</div>
            </div>
        </div>
    );
};

export default RangeCard;
