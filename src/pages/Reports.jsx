import ReportsHeader from "../components/reports/ReportsHeader";
import ReportStats from "../components/reports/ReportStats";
import InventoryReport from "../components/reports/InventoryReport";
import SalesReport from "../components/reports/SalesReport";
import StockMovementReport from "../components/reports/StockMovementReport";
import WastageReport from "../components/reports/WastageReport";

import { useProductContext } from "../context/ProductContext";
import { useOrderContext } from "../context/OrderContext";
import { useStockInContext } from "../context/StockInContext";
import { useStockOutContext } from "../context/StockOutContext";
import { useWastageContext } from "../context/WastageContext";

import {calculateInventoryStats,calculateSalesStats,calculateStockMovementStats,calculateWastageStats,} from "../utils/reportUtils";

const Reports = () => {
  const { products } = useProductContext();

  const { orders } = useOrderContext();

  const { stockIns } = useStockInContext();

  const { stockOuts } = useStockOutContext();

  const { wastages } = useWastageContext();

  const inventoryStats = calculateInventoryStats(products);

  const salesStats = calculateSalesStats(orders);

  const stockMovementStats = calculateStockMovementStats(stockIns, stockOuts);

  const wastageStats = calculateWastageStats(wastages);

  return (
    <div className="space-y-6">
      <ReportsHeader />

      <ReportStats inventoryStats={inventoryStats} salesStats={salesStats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <InventoryReport inventoryStats={inventoryStats} />

        <SalesReport salesStats={salesStats} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <StockMovementReport stockMovementStats={stockMovementStats} />

        <WastageReport wastageStats={wastageStats} />
      </div>
    </div>
  );
};

export default Reports;
