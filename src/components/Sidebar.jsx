import { Menu } from "primereact/menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES_CONSTANTS } from "../constants/routesurl";

const Sidebar = () => {
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items with their corresponding routes
  const items = [
    {
      label: t("dashboard"),
      icon: "ri-dashboard-line",
      route: ROUTES_CONSTANTS.DASHBOARD,
      command: () => {
        navigate(ROUTES_CONSTANTS.DASHBOARD);
      }
    },
    {
      label: t("categories"),
      icon: "ri-dice-4-line",
      route: ROUTES_CONSTANTS.CATEGORIES,
      command: () => {
        navigate(ROUTES_CONSTANTS.CATEGORIES);
      }
    },
    {
      label: t("sub_categories"),
      icon: "ri-dice-6-line",
      route: ROUTES_CONSTANTS.SUB_CATEGORIES,
      command: () => {
        navigate(ROUTES_CONSTANTS.SUB_CATEGORIES);
      }
    },
    {
      label: t("products"),
      icon: "ri-instance-line",
      route: ROUTES_CONSTANTS.PRODUCTS,
      command: () => {
        navigate(ROUTES_CONSTANTS.PRODUCTS);
      }
    },
    {
      label: t("inventory"),
      icon: "ri-store-2-line",
      route: ROUTES_CONSTANTS.INVENTORY,
      command: () => {
        navigate(ROUTES_CONSTANTS.INVENTORY);
      }
    },
    {
      label: t("orders"),
      icon: "ri-typhoon-fill",
      route: ROUTES_CONSTANTS.ORDERS,
      command: () => {
        navigate(ROUTES_CONSTANTS.ORDERS);
      }
    },
    {
      label: t("users"),
      icon: "ri-group-line",
      route: ROUTES_CONSTANTS.USERS,
      command: () => {
        navigate(ROUTES_CONSTANTS.USERS);
      }
    },
    {
      label: t("discounts"),
      icon: "ri-booklet-line",
      route: ROUTES_CONSTANTS.DISCOUNT,
      command: () => {
        navigate(ROUTES_CONSTANTS.DISCOUNT);
      }
    },
    {
      label: t("coupons"),
      icon: "ri-receipt-line",
      route: ROUTES_CONSTANTS.COUPONS,
      command: () => {
        navigate(ROUTES_CONSTANTS.COUPONS);
      }
    },
    {
      label: t("reports"),
      icon: "ri-layout-horizontal-line",
      route: ROUTES_CONSTANTS.REPORTS,
      command: () => {
        navigate(ROUTES_CONSTANTS.REPORTS);
      }
    },
    {
      label: t("blogs"),
      icon: "ri-blogger-line",
      route: ROUTES_CONSTANTS.BLOGS,
      command: () => {
        navigate(ROUTES_CONSTANTS.BLOGS);
      }
    }
  ];

  // Function to check if the current path matches the menu item's route
  const isActive = (route) => location.pathname === route;

  return (
    <div className="h-full bg-BgTertiaryColor text-TextPrimaryColor">
      <div className="p-5">
        <div>Ecommerce</div>
        <div className="text-[0.6rem]">{t("management_system")}</div>
      </div>
      <Menu
        model={items.map(item => ({
          ...item,
          className: isActive(item.route) ? "p-focus" : "", // Add p-focus class if active
        }))}
        className="custom-menu-container bg-BgTertiaryColor p-0 text-[0.8rem]"
      />
    </div>
  );
};

export default Sidebar;