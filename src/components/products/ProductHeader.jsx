import { FiPlus } from "react-icons/fi";

import Button from "../Button";

const ProductHeader = ({
  onAddProduct,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Products
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your warehouse inventory.
        </p>
      </div>

      <Button
        onClick={onAddProduct}
        className="gap-2"
      >
        <FiPlus size={18} />
        Add Product
      </Button>
    </div>
  );
};

export default ProductHeader;