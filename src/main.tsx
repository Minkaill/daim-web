import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./components/Layout/index.tsx";
import { BrowserRouter } from "react-router-dom";
import { TelegramProvider } from "./context/telegram/index.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TelegramProvider>
        <Layout>
          <App />
        </Layout>
      </TelegramProvider>
    </BrowserRouter>
  </StrictMode>
);
