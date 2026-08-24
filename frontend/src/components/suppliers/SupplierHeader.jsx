import { FiPlus } from "react-icons/fi";

import Button from "../Button";

const SupplierHeader = ({
  onAddSupplier,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Suppliers
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your warehouse suppliers.
        </p>
      </div>

      <Button
        onClick={onAddSupplier}
        className="gap-2"
      >
        <FiPlus size={18} />
        Add Supplier
      </Button>
    </div>
  );
};

export default SupplierHeader;