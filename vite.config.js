import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
/* import eslint from "vite-plugin-eslint"; */
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
  return {
    server: {
      open: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
    define: {
      "process.env": {},
    },
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      // svgr options: https://react-svgr.com/docs/options/
      svgr({ svgrOptions: { icon: true } }),
      // eslint(),
    ],
  };
});
