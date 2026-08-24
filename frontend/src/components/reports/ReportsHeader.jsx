import { FiBarChart2 } from "react-icons/fi";

const ReportsHeader = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

        <p className="mt-1 text-sm text-gray-500">
          Analyze inventory, sales, stock movement and wastage.
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        <FiBarChart2 size={20} />
      </div>
    </div>
  );
};

export default ReportsHeader;
