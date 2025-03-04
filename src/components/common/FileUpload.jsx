const FileUpload = ({value="", name, isLabel, onChange}) => {
  return (
    <div>
        <div className="flex flex-col w-full">
            {isLabel ? (
                <label className="text-[12px] text-TextSecondaryColor ms-[4px] font-[600]">{isLabel}</label>
                ) : null}
            {value ? <div className="relative"  style={{ height: "300px", overflow: "hidden", borderRadius: "8px", border: "1px solid #ddd" }}>
                 <img src={value} alt="" style={{ borderRadius:"5px", maxWidth: "100%", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center"}}/>
                 <div className="absolute right-[4px] top-0 scale-[1.3]">
                   <div className="relative">
                        <span className='ri-pencil-line'></span>
                        <input id="dropzone-file" onChange={onChange} type="file" name={name} className="opacity-0 z-10 w-[25px] absolute right-[20%] top-[15%]" />
                   </div>
                 </div>
                </div> : <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" onChange={onChange} type="file" name={name} className="hidden" />
            </label>}
        </div>
    </div>
  )
}

export default FileUpload