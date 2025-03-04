import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mockDevServerPlugin from "vite-plugin-mock-dev-server";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mockDevServerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
