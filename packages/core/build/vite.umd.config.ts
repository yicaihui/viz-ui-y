import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { hooksPlugin as hooks } from "@viz-ui-y/vite-plugins";
import { readFile } from "fs";
import { defer, delay } from "lodash-es";
import shell from "shelljs";
import compression from "vite-plugin-compression";
import terser from "@rollup/plugin-terser";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
//移动index.css
const TRY_MOVE_STYLES_DELAY = 750 as const;
function moveStyles() {
    readFile("./dist/umd/index.css.gz", (err) => {
        if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
        defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
    });
}
export default defineConfig({
    plugins: [
        vue(),
        compression({
            filter: /.(cjs|css)$/i,
        }),
        terser({
            compress: {
                drop_console: ["log"],
                drop_debugger: true,
                passes: 3,
                global_defs: {
                    "@DEV": JSON.stringify(isDev),
                    "@PROD": JSON.stringify(isProd),
                    "@TEST": JSON.stringify(isTest),
                },
            },
        }),
        hooks({
            rmFiles: ["./dist/umd", "./dist/index.css", "./dist/stats.umd.html"],
            afterBuild: moveStyles,
        }),
    ],
    build: {
        outDir: "dist/umd",
        lib: {
            entry: resolve(__dirname, "../index.ts"),
            name: "VizUI",
            fileName: "index",
            formats: ["umd"],
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                exports: "named",
                globals: {
                    vue: "Vue",
                },
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.names && chunkInfo.names[0] === "style.css") {
                        return "index.css";
                    }
                    return chunkInfo.names ? chunkInfo.names[0] as string : '';
                },
            }
        }
    }
});