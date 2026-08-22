import { FiMinus } from "react-icons/fi";

import Button from "../Button";

const StockOutHeader = ({ onAddStockOut }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Stock Out</h1>

        <p className="mt-1 text-sm text-gray-500">
          Record outgoing inventory and update available stock.
        </p>
      </div>

      <Button onClick={onAddStockOut} className="gap-2">
        <FiMinus size={18} />
        Stock Out
      </Button>
    </div>
  );
};

export default StockOutHeader;
