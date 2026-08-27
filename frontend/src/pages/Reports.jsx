import ReportsHeader from "../components/reports/ReportsHeader";
import ReportStats from "../components/reports/ReportStats";
import InventoryReport from "../components/reports/InventoryReport";
import SalesReport from "../components/reports/SalesReport";
import StockMovementReport from "../components/reports/StockMovementReport";
import WastageReport from "../components/reports/WastageReport";

import { useReportContext } from "../context/ReportsContext";
const Reports = () => {
  const {
    inventoryStats,
    salesStats,
    stockMovementStats,
    wastageStats,
    loading,
    error,
  } = useReportContext();

  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading reports...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReportsHeader />

      <ReportStats
        inventoryStats={inventoryStats}
        salesStats={salesStats}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <InventoryReport inventoryStats={inventoryStats} />

        <SalesReport salesStats={salesStats} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <StockMovementReport
          stockMovementStats={stockMovementStats}
        />

        <WastageReport wastageStats={wastageStats} />
      </div>
    </div>
  );
};

export default Reports;