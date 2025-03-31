import { useState } from "react";
import { Menu } from "primereact/menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES_CONSTANTS } from "../constants/routesurl";
import { Tooltip } from 'primereact/tooltip';

const Sidebar = ({toggle}) => {
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const location = useLocation();

  const [hoveredItem, setHoveredItem] = useState(null);

  // Define menu items with their corresponding routes
  const items = [
    {
      label: t("dashboard"),
      icon: "ri-dashboard-line",
      filledIcon: "ri-dashboard-fill",
      route: ROUTES_CONSTANTS.DASHBOARD,
      command: () => {
        navigate(ROUTES_CONSTANTS.DASHBOARD);
      }
    },
    {
      label: t("categories"),
      icon: "ri-folder-6-line",
      filledIcon: "ri-folder-6-fill",
      route: ROUTES_CONSTANTS.CATEGORIES,
      command: () => {
        navigate(ROUTES_CONSTANTS.CATEGORIES);
      }
    },
    {
      label: t("sub_categories"),
      icon: "ri-folders-line",
      filledIcon: "ri-folders-fill",
      route: ROUTES_CONSTANTS.SUB_CATEGORIES,
      command: () => {
        navigate(ROUTES_CONSTANTS.SUB_CATEGORIES);
      }
    },
    {
      label: t("products"),
      icon: "ri-instance-line",
      filledIcon: "ri-instance-fill",
      route: ROUTES_CONSTANTS.PRODUCTS,
      command: () => {
        navigate(ROUTES_CONSTANTS.PRODUCTS);
      }
    },
    {
      label: t("inventory"),
      icon: "ri-store-2-line",
      filledIcon: "ri-store-2-fill",
      route: ROUTES_CONSTANTS.INVENTORY,
      command: () => {
        navigate(ROUTES_CONSTANTS.INVENTORY);
      }
    },
    {
      label: t("orders"),
      icon: "ri-typhoon-line",
      filledIcon: "ri-typhoon-fill",
      route: ROUTES_CONSTANTS.ORDERS,
      command: () => {
        navigate(ROUTES_CONSTANTS.ORDERS);
      }
    },
    {
      label: t("users"),
      icon: "ri-group-line",
      filledIcon: "ri-group-fill",
      route: ROUTES_CONSTANTS.USERS,
      command: () => {
        navigate(ROUTES_CONSTANTS.USERS);
      }
    },
    {
      label: t("discounts"),
      icon: "ri-booklet-line",
      filledIcon: "ri-booklet-fill",
      route: ROUTES_CONSTANTS.DISCOUNT,
      command: () => {
        navigate(ROUTES_CONSTANTS.DISCOUNT);
      }
    },
    {
      label: t("coupons"),
      icon: "ri-receipt-line",
      filledIcon: "ri-receipt-fill",
      route: ROUTES_CONSTANTS.COUPONS,
      command: () => {
        navigate(ROUTES_CONSTANTS.COUPONS);
      }
    },
    {
      label: t("reports"),
      icon: "ri-layout-horizontal-line",
      filledIcon: "ri-layout-horizontal-fill",
      route: ROUTES_CONSTANTS.REPORTS,
      command: () => {
        navigate(ROUTES_CONSTANTS.REPORTS);
      }
    },
    {
      label: t("reviews"),
      icon: "ri-draft-line",
      filledIcon: "ri-draft-fill",
      route: ROUTES_CONSTANTS.REVIEWS,
      command: () => {
        navigate(ROUTES_CONSTANTS.REVIEWS);
      }
    },
    {
      label: t("blogs"),
      icon: "ri-blogger-line",
      filledIcon: "ri-blogger-fill",
      route: ROUTES_CONSTANTS.BLOGS,
      command: () => {
        navigate(ROUTES_CONSTANTS.BLOGS);
      }
    },
    {
      label: t("fest_special"),
      icon: "ri-flower-line",
      filledIcon: "ri-flower-fill",
      route: ROUTES_CONSTANTS.FEST,
      command: () => {
        navigate(ROUTES_CONSTANTS.FEST);
      }
    }
  ];

  // Function to check if the current path matches the menu item's route
  const isActive = (route) => location.pathname === route;
  
  // Function to handle mouse enter (hover) event
  const handleMouseEnter = (item) => {
    setHoveredItem(item.route);
  };

  // Function to handle mouse leave (hover out) event
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const removeFocusClass = () => {
    const firstFocusedItem = document.querySelector('.p-menuitem.p-focus');
    if (firstFocusedItem) {
      firstFocusedItem.classList.remove('p-focus');
    }
  };

  return (
    <div className="bg-BgTertiaryColor text-TextPrimaryColor">
      <div className={`p-5 flex items-center gap-3 ${toggle ? "" : "justify-center"}`}>
        <i className="ri-shopping-bag-3-line text-[24px] hover:cursor-pointer" onClick={()=>{
          navigate(ROUTES_CONSTANTS.DASHBOARD);
        }}></i>
        {
          toggle && (
            <div>
              <div>{t("ecommerce")}</div>
              <div className="text-[0.6rem]">{t("management_system")}</div>
            </div>
          )
        }
      </div>
      {
          !toggle && <div className="flex width-full justify-center"><hr className="w-[90%]"/></div>
      }
      <div className="px-4 h-[88vh] overflow-y-scroll">
        <Menu
            model={items.map((item, index) => {
              return(
                {
                  ...item,
                  icon: hoveredItem === item.route ? item.filledIcon : item.icon, // Change icon on hover
                  className: isActive(item.route) ? "p-focus" : "", // Add p-focus class if active
                  template: (
                    <div
                      onMouseEnter={() => handleMouseEnter(item)} // Handle mouse enter
                      onMouseLeave={handleMouseLeave} // Handle mouse leave
                      className={`p-menuitem-content ${toggle ? "w-full" : "w-[57px]"}`}
                    >
                      <div className="p-menuitem-link" onClick={()=>{
                          navigate(item.route);
                          setTimeout(()=>{
                            if(item.route !== ROUTES_CONSTANTS.DASHBOARD){
                              removeFocusClass();
                            }
                          },0)
                        }}>
                        <i className={`${(hoveredItem === item.route || isActive(item.route)) ? item.filledIcon : item.icon} p-menuitem-icon custom-target-icon-${index}`} ></i>
                        <span>{toggle ? item.label : ""}</span>
                      </div>
                      <Tooltip target={`.custom-target-icon-${index}`} />
                    </div>
                  )
                }
              )
            })}
            className="custom-menu-container bg-BgTertiaryColor p-0 text-[0.8rem]"
          />
      </div>
    </div>
  );
};

export default Sidebar;