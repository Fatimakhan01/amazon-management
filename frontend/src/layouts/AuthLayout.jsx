import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#131921]">
              <span className="text-xl font-bold text-[#FF9900]">
                W
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Warehouse Management
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your warehouse efficiently
            </p>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;