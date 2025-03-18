import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts'
import { readdirSync } from "fs";
import { defer, delay, filter, map, includes } from "lodash-es";

function getDirectoriesSync(basePath: string) {
    const entries = readdirSync(basePath, { withFileTypes: true });

    return map(
        filter(entries, (entry) => entry.isDirectory()),
        (entry) => entry.name
    );
}
export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: "../../tsconfig.build.json",
            outDir: "dist/types",
        })
    ],
    build: {
        outDir: "dist/es",
        lib: {
            entry: resolve(__dirname, "./index.ts"),
            name: "VizUI",
            fileName: "index",
            formats: ["es"],
        },
        rollupOptions: {
            external: [
                "vue",
                "@fortawesome/fontawesome-svg-core",
                "@fortawesome/free-solid-svg-icons",
                "@fortawesome/vue-fontawesome",
                "@popperjs/core",
                "async-validator",
            ],
            output: {
                exports: "named",
                globals: {
                    vue: "Vue",
                },
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "style.css") {
                        return "index.css";
                    }
                    return chunkInfo.name as string;
                },
                manualChunks(id) {
                    if (id.includes("node_modules")) return "vendor";
                    if (id.includes("/packages/hooks")) return "hooks";
                    if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) return "utils";
                    for (const item of getDirectoriesSync("../components")) {
                        if (id.includes(`/packages/components/${item}`)) return item;
                    }
                },
            }
        }
    }
});