import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./components/Layout/index.tsx";
import { BrowserRouter } from "react-router-dom";
import { TelegramProvider } from "./context/telegram/index.tsx";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TelegramProvider>
        <Layout>
          <App />
        </Layout>
      </TelegramProvider>
    </BrowserRouter>
    <Toaster
      toastOptions={{
        style: {
          background: "#1f2937",
          color: "#fff",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#1f2937",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444", // красный (error)
            secondary: "#1f2937",
          },
        },
      }}
      position="top-center"
      reverseOrder={false}
    />
  </StrictMode>
);
