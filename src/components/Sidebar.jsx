import {
  FiHome,
  FiPackage,
  FiGrid,
  FiTruck,
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiShoppingCart,
  FiTrash2,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    label: "Products",
    path: "/products",
    icon: FiPackage,
  },
  {
    label: "Categories",
    path: "/categories",
    icon: FiGrid,
  },
  {
    label: "Suppliers",
    path: "/suppliers",
    icon: FiTruck,
  },
  {
    label: "Stock In",
    path: "/stock-in",
    icon: FiArrowDownCircle,
  },
  {
    label: "Stock Out",
    path: "/stock-out",
    icon: FiArrowUpCircle,
  },
  {
    label: "Orders",
    path: "/orders",
    icon: FiShoppingCart,
  },
  {
    label: "Wastage",
    path: "/wastage",
    icon: FiTrash2,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FiBarChart2,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
          border-r border-gray-200 bg-white
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-0 lg:z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Main Menu
            </p>

            <p className="mt-0.5 text-sm font-semibold text-gray-800">
              Warehouse
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 lg:hidden"
            aria-label="Close navigation menu"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Navigation
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3 rounded-lg px-3 py-2.5
                    text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#FFF3E0] text-[#E47911]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={`
                          shrink-0 transition-colors
                          ${
                            isActive
                              ? "text-[#E47911]"
                              : "text-gray-400 group-hover:text-gray-700"
                          }
                        `}
                      />

                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-gray-200 p-3">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;