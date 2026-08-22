import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import Orders from "./pages/Orders";
import Wastage from "./pages/Wastage";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route
                path="/"
                element={<Login />}
              />

              <Route
                path="/signup"
                element={<Signup />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                element={<DashboardLayout />}
              >
                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />

                <Route
                  path="/products"
                  element={<Products />}
                />

                <Route
                  path="/categories"
                  element={<Categories />}
                />

                <Route
                  path="/suppliers"
                  element={<Suppliers />}
                />

                <Route
                  path="/stock-in"
                  element={<StockIn />}
                />

                <Route
                  path="/stock-out"
                  element={<StockOut />}
                />

                <Route
                  path="/orders"
                  element={<Orders />}
                />

                <Route
                  path="/wastage"
                  element={<Wastage />}
                />

                <Route
                  path="/reports"
                  element={<Reports />}
                />

                <Route
                  path="/settings"
                  element={<Settings />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;