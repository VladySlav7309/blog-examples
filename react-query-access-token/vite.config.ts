import { defineConfig } from "vite";
import { defaultExclude } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["src/setupTests.test.ts"],
    exclude: [...defaultExclude, "src/setupTests.test.ts"],
  },
});
