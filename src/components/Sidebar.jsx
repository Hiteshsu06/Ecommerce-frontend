import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation("msg");
  const navigate = useNavigate();
  const items = [
    {
      label: t("dashboard"),
      icon: "ri-dashboard-line",
      command: () => {
        navigate("/dashboard");
      },
    },
    {
      label: t("shops"),
      icon: "ri-store-3-line",
      command: () => {
        navigate("/dashboard/shops");
      },
    },
    {
      label: t("categories"),
      icon: "ri-archive-drawer-line",
      command: () => {
        navigate("/dashboard/categories");
      },
    },
    {
      label: t("products"),
      icon: "ri-instance-line",
      command: () => {
        navigate("/dashboard/products");
      },
    },
    {
      label: t("inventory"),
      icon: "ri-archive-stack-line",
      command: () => {
        navigate("/dashboard/inventory");
      },
    },
  ];

  return (
    <div className="h-full bg-BgTertiaryColor text-TextPrimaryColor">
      <div className="p-5">
        <div>Ecommerce</div>
        <div className="text-[0.6rem]">{t("management_system")}</div>
      </div>
      <Menu
        model={items}
        className="custom-menu-container bg-BgTertiaryColor p-0 text-[0.8rem]"
      />
    </div>
  );
};

export default Sidebar;
