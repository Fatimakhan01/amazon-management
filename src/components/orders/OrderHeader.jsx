import { FiPlus } from "react-icons/fi";

import Button from "../Button";

const OrderHeader = ({ onAddOrder }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage warehouse orders and sales.
        </p>
      </div>

      <Button onClick={onAddOrder} className="gap-2">
        <FiPlus size={18} />
        Add Order
      </Button>
    </div>
  );
};

export default OrderHeader;
