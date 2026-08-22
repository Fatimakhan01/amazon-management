import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden bg-[#131921] lg:flex lg:flex-col lg:justify-between">
          <div className="p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF9900] text-xl font-bold text-[#131921]">
                W
              </div>

              <div>
                <h1 className="text-lg font-semibold text-white">
                  Warehouse
                </h1>

                <p className="text-xs text-gray-400">
                  Management System
                </p>
              </div>
            </div>
          </div>

          <div className="px-10 pb-16">
            <h2 className="max-w-md text-4xl font-bold leading-tight text-white">
              Manage your warehouse with confidence.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-gray-400">
              Track products, manage inventory, monitor orders and
              keep your warehouse operations organized.
            </p>

            <div className="mt-8 flex gap-3">
              <div className="h-1.5 w-10 rounded-full bg-[#FF9900]" />
              <div className="h-1.5 w-6 rounded-full bg-gray-600" />
              <div className="h-1.5 w-6 rounded-full bg-gray-600" />
            </div>
          </div>

          <div className="p-10 text-xs text-gray-500">
            © 2026 Warehouse Management System
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF9900] font-bold text-[#131921]">
                W
              </div>

              <div>
                <h1 className="text-base font-semibold text-[#131921]">
                  Warehouse
                </h1>

                <p className="text-[11px] text-gray-500">
                  Management System
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;