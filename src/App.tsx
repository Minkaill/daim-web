import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Products } from "./pages/Products";
import { Profile } from "./pages/Profile";
import { Cart } from "./pages/Cart";
import { Orders } from "./pages/Orders";

const App: React.FC = () => (
  <Routes>
    <Route path="/products" element={<Products />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="*" element={<Navigate to="/products" replace />} />
  </Routes>
);

export default App;
