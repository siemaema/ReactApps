import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // domyślna konfiguracja
      localsConvention: "camelCaseOnly", // zmienia klasy na camelCase
      scopeBehaviour: "local", // wszystkie klasy są lokalne
      globalModulePaths: [/global\.css$/], // wzorce dla globalnych modułów
      generateScopedName: "[name]__[local]___[hash:base64:5]", // nazwa klasy CSS
      hashPrefix: "prefix", // prefiks dla hasha klasy
    },
  },
});
