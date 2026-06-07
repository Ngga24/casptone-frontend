import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig({
  plugins: [react(), removeConsole()],
  server: {
    allowedHosts: [
      "dtwin.projectbase.my.id",
      "smart-dtwin.projectbase.my.id",
      "localhost",
    ],
    host: "0.0.0.0",
    port: 85,
  },
});
