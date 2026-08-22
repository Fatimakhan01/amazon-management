import { calculateWastageLoss } from "../utils/wastageUtils";

const WASTAGE_KEY = "warehouse_wastage";

export const getWastages = () => {
  const storedWastage = localStorage.getItem(WASTAGE_KEY);

  if (!storedWastage) {
    return [];
  }

  try {
    return JSON.parse(storedWastage);
  } catch (error) {
    console.error("Failed to parse wastage:", error);

    return [];
  }
};

const saveWastages = (wastages) => {
  localStorage.setItem(WASTAGE_KEY, JSON.stringify(wastages));
};

export const createWastage = (wastageData) => {
  const wastages = getWastages();

  const quantity = Number(wastageData.quantity || 0);

  const costPrice = Number(wastageData.costPrice || 0);

  const newWastage = {
    ...wastageData,
    id: crypto.randomUUID(),
    quantity,
    costPrice,
    loss: calculateWastageLoss(costPrice, quantity),
    date: wastageData.date || new Date().toISOString().split("T")[0],
  };

  const updatedWastages = [...wastages, newWastage];

  saveWastages(updatedWastages);

  return newWastage;
};

export const deleteWastage = (wastageId) => {
  const wastages = getWastages();

  const updatedWastages = wastages.filter(
    (wastage) => wastage.id !== wastageId,
  );

  saveWastages(updatedWastages);

  return updatedWastages;
};
