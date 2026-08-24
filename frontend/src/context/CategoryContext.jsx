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
    const storedCategories =
      getCategories();

    setCategories(storedCategories);
    setLoading(false);
  }, []);

  const addCategory = (categoryData) => {
    const newCategory =
      createCategory(categoryData);

    setCategories(
      (previousCategories) => [
        ...previousCategories,
        newCategory,
      ]
    );
  };

  const editCategory = (
    categoryId,
    categoryData
  ) => {
    const updatedCategory =
      updateCategory(
        categoryId,
        categoryData
      );

    setCategories(
      (previousCategories) =>
        previousCategories.map(
          (category) =>
            category.id === categoryId
              ? updatedCategory
              : category
        )
    );
  };

  const removeCategory = (
    categoryId
  ) => {
    const updatedCategories =
      deleteCategory(categoryId);

    setCategories(updatedCategories);
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

export const useCategoryContext =
  () => {
    const context =
      useContext(CategoryContext);

    if (!context) {
      throw new Error(
        "useCategoryContext must be used inside CategoryProvider"
      );
    }

    return context;
  };