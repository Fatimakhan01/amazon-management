import { FiPlus } from "react-icons/fi";

import Button from "../Button";

const CategoryHeader = ({
  onAddCategory,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Categories
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your warehouse product
          categories.
        </p>
      </div>

      <Button
        onClick={onAddCategory}
        className="gap-2"
      >
        <FiPlus size={18} />
        Add Category
      </Button>
    </div>
  );
};

export default CategoryHeader;