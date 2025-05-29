import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [tailwindcss(), tsconfigPaths(), TanStackRouterVite({
    routeTreeFileHeader: [
      "/* eslint-disable eslint-comments/no-unlimited-disable */",
      "/* eslint-disable */",
    ],
    generatedRouteTree: "./src/route-tree.gen.ts",
  }), react()],
  resolve: {
    alias: {
      "@/web": path.resolve(__dirname, "./src"),
    },
  },
});
