import {
  FiSearch,
  FiX,
} from "react-icons/fi";

const CategoryFilters = ({
  searchTerm,
  status,
  onSearchChange,
  onStatusChange,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label
            htmlFor="category-search"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Search Categories
          </label>

          <div className="relative">
            <FiSearch
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="category-search"
              type="text"
              value={searchTerm}
              onChange={(event) =>
                onSearchChange(
                  event.target.value
                )
              }
              placeholder="Search by category name or description..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
            />
          </div>
        </div>

        <div className="w-full lg:w-52">
          <label
            htmlFor="category-status"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="category-status"
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="">
              All Statuses
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <FiX size={16} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilters;