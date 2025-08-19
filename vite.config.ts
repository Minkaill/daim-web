import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    allowedHosts: ["b3c9c7c799de.ngrok-free.app"],
    proxy: {
      "/api": {
        target: "http://45.12.238.18/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
