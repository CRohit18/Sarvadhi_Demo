import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let outDir = "build"; // Default output directory
  // Customize output directory based on the mode
  if (mode === "development") {
    outDir = "dist-dev";
  } else if (mode === "uat") {
    outDir = "dist-uat";
  } else if (mode === "production") {
    outDir = "dist-prod";
  }
  return {
    plugins: [react()],
    // Server Configuration
    server: {
      watch: {
        awaitWriteFinish: true, // Avoids writing partial files
      },
      port: 3000,
      host: true, // Allows external access for testing on multiple devices
    },
    // Module Resolution
    resolve: {
      alias: {
        "@": "/src", // Cleaner alias definition
      },
    },
    // CSS Preprocessor Configuration
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // SCSS modern compiler API
        },
      },
    },
    assetsInclude: ["**/*.gif"],
  };
});
