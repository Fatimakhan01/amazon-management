import { Outlet } from "react-router-dom";
import { FiPackage, FiShield, FiTrendingUp } from "react-icons/fi";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-[#131921] lg:flex">
          <div className="flex w-full flex-col justify-between p-10 xl:p-14">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF9900] text-[#131921]">
                <FiPackage size={24} />
              </div>

              <div>
                <h1 className="text-lg font-bold text-white">
                  Warehouse
                </h1>

                <p className="text-xs text-gray-400">
                  Management System
                </p>
              </div>
            </div>

            <div className="max-w-lg">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#FF9900]">
                Warehouse Management
              </p>

              <h2 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                Everything you need to manage your warehouse.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-gray-400">
                Manage inventory, products, suppliers, orders and
                warehouse operations from one centralized platform.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/10 p-2 text-[#FF9900]">
                    <FiPackage size={18} />
                  </div>

                  <span className="text-sm text-gray-300">
                    Complete inventory management
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/10 p-2 text-[#FF9900]">
                    <FiTrendingUp size={18} />
                  </div>

                  <span className="text-sm text-gray-300">
                    Real-time business insights
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/10 p-2 text-[#FF9900]">
                    <FiShield size={18} />
                  </div>

                  <span className="text-sm text-gray-300">
                    Secure warehouse operations
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              © 2026 Warehouse Management System
            </p>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF9900] text-[#131921]">
                <FiPackage size={22} />
              </div>

              <div>
                <h1 className="text-lg font-bold text-[#131921]">
                  Warehouse
                </h1>

                <p className="text-xs text-gray-500">
                  Management System
                </p>
              </div>
            </div>

            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthLayout;