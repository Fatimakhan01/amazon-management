import { FiPlus } from "react-icons/fi";

import Button from "../Button";

const WastageHeader = ({ onAddWastage }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Wastage</h1>

        <p className="mt-1 text-sm text-gray-500">
          Track damaged, expired, or wasted inventory.
        </p>
      </div>

      <Button onClick={onAddWastage} className="gap-2">
        <FiPlus size={18} />
        Add Wastage
      </Button>
    </div>
  );
};

export default WastageHeader;
