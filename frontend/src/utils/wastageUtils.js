export const calculateWastageLoss = (
  costPrice,
  quantity,
) => {
  return (
    Number(costPrice || 0) *
    Number(quantity || 0)
  );
};