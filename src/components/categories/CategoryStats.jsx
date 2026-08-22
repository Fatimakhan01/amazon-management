import {
  FiFolder,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import Card from "../Card";

import {
  useCategoryContext,
} from "../../context/CategoryContext";

const CategoryStats = () => {
  const { categories } =
    useCategoryContext();

  const totalCategories =
    categories.length;

  const activeCategories =
    categories.filter(
      (category) =>
        category.status === "Active"
    ).length;

  const inactiveCategories =
    categories.filter(
      (category) =>
        category.status === "Inactive"
    ).length;

  const stats = [
    {
      title: "Total Categories",
      value: totalCategories,
      icon: FiFolder,
      description:
        "Categories in system",
    },
    {
      title: "Active",
      value: activeCategories,
      icon: FiCheckCircle,
      description:
        "Currently active",
    },
    {
      title: "Inactive",
      value: inactiveCategories,
      icon: FiXCircle,
      description:
        "Currently inactive",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {stat.description}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                <Icon size={20} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CategoryStats;