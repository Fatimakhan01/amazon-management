import {
  FiAlertTriangle,
  FiPackage,
} from "react-icons/fi";

import Card from "../Card";

import {
  useProductContext,
} from "../../context/ProductContext";

const LOW_STOCK_THRESHOLD = 10;

const LowStockList = () => {
  const { products } =
    useProductContext();

  const lowStockProducts = products
    .filter((product) => {
      const quantity = Number(
        product.quantity || 0
      );

      return (
        quantity > 0 &&
        quantity < LOW_STOCK_THRESHOLD
      );
    })
    .sort(
      (a, b) =>
        Number(a.quantity || 0) -
        Number(b.quantity || 0)
    )
    .slice(0, 5);

  return (
    <Card padding={false}>
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Low Stock
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Products that need restocking.
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
          <FiAlertTriangle size={18} />
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {lowStockProducts.length ===
        0 ? (
          <div className="px-5 py-10 text-center">
            <FiPackage
              size={28}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm font-medium text-gray-600">
              No low-stock products
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Your inventory levels look
              good.
            </p>
          </div>
        ) : (
          lowStockProducts.map(
            (product) => {
              const quantity = Number(
                product.quantity || 0
              );

              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                      <FiPackage
                        size={16}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {product.name}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        SKU:{" "}
                        {product.sku}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-orange-600">
                      {quantity}
                    </p>

                    <p className="text-xs text-gray-400">
                      left
                    </p>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </Card>
  );
};

export default LowStockList;