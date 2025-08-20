import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Products } from "./pages/Products";
import { Profile } from "./pages/Profile";
import { Cart } from "./pages/Cart";
import { Orders } from "./pages/Orders";
import { PromoModal } from "./components/PromoModal";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("promo_seen");
    if (!seen) {
      setOpen(true);
      sessionStorage.setItem("promo_seen", "1");
    }
  }, []);

  return (
    <>
      <PromoModal open={open} onClose={() => setOpen(false)} />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </>
  );
};

export default App;
