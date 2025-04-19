// Utils
import { useEffect, useState, lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_CONSTANTS } from "@constants/apiurl";
import { ROUTES_CONSTANTS } from "@constants/routesurl";
import { allApi } from "@api/api";

// Components
import Loading from '@common/Loading';
const Navbar = lazy(() => import("@userpage/Navbar"));
const Footer = lazy(() => import("@userpage/Footer"));
const ProductBuyCard = lazy(() => import("@userpage-components/ProductBuyCard"));
const ShopOurSnackRange = lazy(() => import("@userpage-components/ShopOurSnackRange"));

const features = [
{ icon: "ri-truck-line", text: "National Shipping in 3-5 days" },
{ icon: "ri-timer-line", text: "15 Days Shelf Life" },
{ icon: "ri-earth-line", text: "International Shipping in 5-7 Days" },
{ icon: "ri-leaf-line", text: "No Preservatives" },
];

const CollectionDescription = () => {
  const location = useLocation();
  const { subCategoryId, name, subCategory } = location?.state || {};
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [footerRangeList, setFooterRangeList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
      fetchData();
  },[]);

  const fetchData = async () => {
    setLoader(true);
    const promises = [
      getAllCategories(),
      getCategoryProducts(),
      fetchMenuList()
    ]
    const settledResults = await Promise.allSettled(promises);
    if(settledResults){
      setLoader(false);
    }
  }

  const getCategoryProducts = () =>{
    let body = {
      subcategory_id: subCategoryId
    };
    allApi(API_CONSTANTS.GET_PRODUCT_BY_SUBCATEGORY_ID_URL, body, "post")
    .then((response) => {
      if(response?.status === 200){
        setProducts(response?.data)
      }
    })
    .catch((err) => {
    }).finally(()=> {
    });
  }

  const getAllCategories = ()=>{
    let url = subCategory ? API_CONSTANTS.ALL_SUB_CATEGORY_URL : API_CONSTANTS.ALL_CATEGORY_URL;
    allApi(url, "", "get")
    .then((response) => {
      if(response?.status === 200){
        setCategories(response?.data)
      }
    })
    .catch((err) => {
    }).finally(()=> {
    });
  };

  const collectionDescription=(item)=>{
    navigate(
        `${ROUTES_CONSTANTS.VIEW_COLLECTION_DESCRIPTION}/${item?.name}`, 
    { 
    state: { 
        category_id: item?.id,
        name: item?.name
    } })
  };

  const fetchMenuList = () => {
    return allApi(API_CONSTANTS.MENU_LIST_URL, "" , "get")
    .then((response) => {
      if (response.status === 200) {
          let data = response?.data.filter((item, index) => index <= 6);
          setFooterRangeList(data);
          data.push({name: "About Us"});
          setMenuList(data)
      } 
    })
    .catch((err) => {
    }).finally(()=>{
    });
  };

  return (
    <>
    {loader ? <Loading/> : 
      <>
        <Navbar data={menuList}/>
        <div className="bg-[#fdfaf2] text-center py-8">
            {/* Breadcrumb */}
            <nav className="text-gray-600 text-[16px]">
                <span className='hover:cursor-pointer' onClick={()=>{ navigate("/") }}>Home</span> <span className='px-4'>&gt;</span> <span className="text-gray-600 hover:cursor-pointer">{name}</span>
            </nav>

            {/* Product Count */}
            <h2 className="font-[600] text-lg mt-2"><span className='font-[Tektur]'>6</span> Products</h2>

            {/* Features Section */}
            <div className="flex justify-evenly items-center mt-6 w-full">
                {features?.map((feature, index) => (
                <div key={feature?.id} className="flex flex-col items-center">
                    {/* Icon Wrapper */}
                    <div className="w-14 h-14 bg-[#b89550] text-white flex items-center justify-center rounded-full text-2xl">
                    <i className={`${feature.icon}`}></i>
                    </div>
                    {/* Feature Text */}
                    <p className="mt-2 text-black text-[1rem] font-[600]">{feature.text}</p>
                </div>
                ))}
            </div>
        </div>

        <div className="bg-[#fdfaf2] py-8 px-4">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                {categories?.map((item, index) => (
                <div key={item?.id} className="text-center">
                    {/* Image */}
                    <div className="relative">
                    <img onClick={() => { collectionDescription(item?.category) }}
                        src={item?.category?.image_url}
                        alt={item?.category?.name}
                        className="w-full h-40 object-cover rounded-xl shadow-md hover:cursor-pointer"
                    />
                    </div>
                    {/* Text */}
                    <h3 className="mt-3 text-lg font-semibold font-[playfair] text-gray-600">{item?.category?.name}</h3>
                    <p className="text-sm text-gray-600">{item?.category?.count}</p>
                </div>
                ))}
            </div>
        </div>

        <div className='grid grid-cols-2 gap-4 p-4'>
            {products?.map((item)=>{
                return(
                    <ProductBuyCard data={item} imageHeight="48rem"/>
                )
            })}
        </div>

        <div className="mt-24">
          <ShopOurSnackRange title="Shop Other Categories"/> 
        </div>

        <Footer data={footerRangeList}/>
      </>
    }
    </>
  )
}

export default CollectionDescription