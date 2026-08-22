import { FiMenu, FiBell, FiUser, FiChevronDown } from "react-icons/fi";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-gray-200 bg-[#131921] text-white">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Open navigation menu"
          >
            <FiMenu size={22} />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF9900] font-bold text-[#131921]">
              W
            </div>

            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold leading-none">
                Warehouse
              </h1>

              <p className="mt-1 text-[11px] text-gray-400">
                Management System
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          
          <button
            type="button"
            className="relative rounded-lg p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Notifications"
          >
            <FiBell size={20} />

            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-[#FF9900]" />
          </button>

          <div className="hidden h-8 w-px bg-white/10 sm:block" />

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-white/10"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700">
              <FiUser size={18} />
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-medium">
                Admin
              </p>

              <p className="text-xs text-gray-400">
                Administrator
              </p>
            </div>

            <FiChevronDown
              size={16}
              className="hidden text-gray-400 md:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;