import { Navigate, Route, Routes } from "react-router-dom";
import { Products } from "./pages/Products";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  );
}

export default App;
