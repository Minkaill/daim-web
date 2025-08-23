import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import { TelegramProvider } from "./context/telegram";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BootstrapGate } from "./components/BootstrapGate";
import { OnResolved } from "./components/Resolved";

const App = lazy(() => import("./App"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TelegramProvider>
        <Layout>
          <BootstrapGate>
            {(notifyReady: () => void) => (
              <Suspense fallback={null}>
                <OnResolved onReady={notifyReady} />
                <App />
              </Suspense>
            )}
          </BootstrapGate>
        </Layout>
      </TelegramProvider>
    </BrowserRouter>
    <Toaster
      toastOptions={{
        style: { background: "#1f2937", color: "#fff" },
        success: { iconTheme: { primary: "#10b981", secondary: "#1f2937" } },
        error: { iconTheme: { primary: "#ef4444", secondary: "#1f2937" } },
      }}
      position="top-center"
      reverseOrder={false}
    />
  </StrictMode>
);
