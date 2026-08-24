import { FiPlus } from "react-icons/fi";

import Button from "../Button";

const StockInHeader = ({
  onAddStockIn,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Stock In
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Record incoming inventory and
          update product stock.
        </p>
      </div>

      <Button
        onClick={onAddStockIn}
        className="gap-2"
      >
        <FiPlus size={18} />
        Stock In
      </Button>
    </div>
  );
};

export default StockInHeader;