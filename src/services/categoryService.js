const CATEGORIES_KEY = "warehouse_categories";

export const getCategories = () => {
  const storedCategories =
    localStorage.getItem(CATEGORIES_KEY);

  if (!storedCategories) {
    return [];
  }

  try {
    return JSON.parse(storedCategories);
  } catch (error) {
    console.error(
      "Failed to parse categories:",
      error
    );

    return [];
  }
};

const saveCategories = (categories) => {
  localStorage.setItem(
    CATEGORIES_KEY,
    JSON.stringify(categories)
  );
};

export const createCategory = (
  categoryData
) => {
  const categories = getCategories();

  const newCategory = {
    ...categoryData,
    id: crypto.randomUUID(),
    date:
      categoryData.date ||
      new Date()
        .toISOString()
        .split("T")[0],
  };

  const updatedCategories = [
    ...categories,
    newCategory,
  ];

  saveCategories(updatedCategories);

  return newCategory;
};

export const updateCategory = (
  categoryId,
  categoryData
) => {
  const categories = getCategories();

  const updatedCategory = {
    ...categoryData,
    id: categoryId,
  };

  const updatedCategories =
    categories.map((category) =>
      category.id === categoryId
        ? updatedCategory
        : category
    );

  saveCategories(updatedCategories);

  return updatedCategory;
};

export const deleteCategory = (
  categoryId
) => {
  const categories = getCategories();

  const updatedCategories =
    categories.filter(
      (category) =>
        category.id !== categoryId
    );

  saveCategories(updatedCategories);

  return updatedCategories;
};