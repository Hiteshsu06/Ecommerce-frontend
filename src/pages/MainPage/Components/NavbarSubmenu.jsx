import { useState} from 'react';
import { useTranslation } from "react-i18next";

const NavbarSubmenu = ({data}) => {
    const [showSubmenu, setShowSubmenu] = useState(data || {});
    const { t } = useTranslation("msg");
    const handleSubmenu = (element)=>{
        setShowSubmenu({...element, hover: !element?.hover})
    }
    const handleInnerSubmenu = (e, i)=>{
        showSubmenu.items[i].hover = !showSubmenu.items[i].hover;
        setShowSubmenu({...showSubmenu})
    }

  return (
    <div className='flex hover: cursor-pointer' onMouseEnter = {()=> {handleSubmenu(showSubmenu)}} onMouseLeave = {()=> {handleSubmenu(showSubmenu)}}>
        <div className='text-[#5a5a5a] font-[500]'>{showSubmenu?.name}</div>
        <div>{ showSubmenu?.items ? < i className="ms-1 ri-arrow-drop-down-line"></i> : null}</div>
        <div className={`absolute mt-6 w-[270px] ${showSubmenu?.items && showSubmenu?.hover ? "border p-4 rounded shadow-lg bg-white" : ""}`}>
            {showSubmenu?.hover && showSubmenu?.items?.map((element, index)=>{
                return (
                <div className='h-9 ps-3 hover:bg-gray-100  hover:text-black text-[#898585] flex items-center rounded justify-between' onMouseEnter = {()=> {handleInnerSubmenu(element, index)}} onMouseLeave = {()=> {handleInnerSubmenu(element, index)}}>
                    <div>{element?.name}</div>
                    <div className='pe-2'>
                         {element?.items ? < i className="ri-arrow-drop-right-line"></i> : null}
                         <div className={`absolute top-0 left-[250px] w-[270px] bg-white ${element?.items && element?.hover ? "border p-4 rounded shadow-lg" : ""}`}>
                            {element?.hover && element?.items?.map((elem)=>{
                                return (
                                <div className='h-9 ps-3 hover:bg-gray-100  hover:text-black text-[#898585] flex items-center rounded justify-between'>
                                    <div>{elem?.name}</div>
                                </div>
                            )})}
                         </div>
                    </div>
                </div>
            )})}
        </div>
    </div>
  )
}

export default NavbarSubmenu