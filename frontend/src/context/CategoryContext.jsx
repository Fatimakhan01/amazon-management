import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const CategoryContext =
  createContext(null);

export const CategoryProvider = ({
  children,
}) => {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const storedCategories =
          await getCategories();

        setCategories(storedCategories);
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const addCategory = async (
    categoryData,
  ) => {
    const newCategory =
      await createCategory(categoryData);

    setCategories(
      (previousCategories) => [
        newCategory,
        ...previousCategories,
      ],
    );

    return newCategory;
  };

  const editCategory = async (
    categoryId,
    categoryData,
  ) => {
    const updatedCategory =
      await updateCategory(
        categoryId,
        categoryData,
      );

    setCategories(
      (previousCategories) =>
        previousCategories.map(
          (category) =>
            category.id === categoryId
              ? updatedCategory
              : category,
        ),
    );

    return updatedCategory;
  };

  const removeCategory = async (
    categoryId,
  ) => {
    await deleteCategory(categoryId);

    setCategories(
      (previousCategories) =>
        previousCategories.filter(
          (category) =>
            category.id !== categoryId,
        ),
    );
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        addCategory,
        editCategory,
        removeCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context =
    useContext(CategoryContext);

  if (!context) {
    throw new Error(
      "useCategoryContext must be used inside CategoryProvider",
    );
  }

  return context;
};