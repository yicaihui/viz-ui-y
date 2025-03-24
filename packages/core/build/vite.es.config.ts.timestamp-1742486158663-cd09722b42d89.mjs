// build/vite.es.config.ts
import { defineConfig } from "file:///D:/front%20study/4-workspace/viz-ui-y/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.24_terser@5.39.0/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import vue from "file:///D:/front%20study/4-workspace/viz-ui-y/node_modules/.pnpm/@vitejs+plugin-vue@5.2.3_vi_f5338428ddee4327dd8b0fd4b2a036e5/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///D:/front%20study/4-workspace/viz-ui-y/node_modules/.pnpm/vite-plugin-dts@3.9.1_@type_50e3718f2063aa5e18cd1d51dbaad88e/node_modules/vite-plugin-dts/dist/index.mjs";
import { readdirSync, readdir } from "fs";
import { defer, delay, filter, map } from "file:///D:/front%20study/4-workspace/viz-ui-y/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell from "file:///D:/front%20study/4-workspace/viz-ui-y/node_modules/.pnpm/shelljs@0.8.5/node_modules/shelljs/shell.js";
import { hooksPlugin as hooks } from "file:///D:/front%20study/4-workspace/viz-ui-y/libs/vite-plugins/.dist/index.js";
import terser from "file:///D:/front%20study/4-workspace/viz-ui-y/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.36.0/node_modules/@rollup/plugin-terser/dist/es/index.js";
import { visualizer } from "file:///D:/front%20study/4-workspace/viz-ui-y/node_modules/.pnpm/rollup-plugin-visualizer@5.14.0_rollup@4.36.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "D:\\front study\\4-workspace\\viz-ui-y\\packages\\core\\build";
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
var TRY_MOVE_STYLES_DELAY = 750;
function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv("./dist/es/theme", "./dist"));
  });
}
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: "dist/stats.es.html"
    }),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest)
        }
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev
      }
    }),
    hooks({
      rmFiles: [
        "./dist/es",
        "./dist/theme",
        "./dist/types",
        "./dist/stats.es.html"
      ],
      afterBuild: moveStyles
    })
  ],
  build: {
    outDir: "dist/es",
    cssCodeSplit: true,
    minify: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "../index.ts"),
      name: "VizUI",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        exports: "named",
        globals: {
          vue: "Vue"
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.names && chunkInfo.names[0] === "style.css") {
            return "index.css";
          }
          if (chunkInfo.type === "asset" && chunkInfo.names && /\.(css)$/i.test(chunkInfo.names[0])) {
            return "theme/[name].[ext]";
          }
          return chunkInfo.names ? chunkInfo.names[0] : "";
        },
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
          if (id.includes("/packages/hooks")) return "hooks";
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) return "utils";
          for (const item of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${item}`)) return item;
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvdml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmcm9udCBzdHVkeVxcXFw0LXdvcmtzcGFjZVxcXFx2aXotdWkteVxcXFxwYWNrYWdlc1xcXFxjb3JlXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udCBzdHVkeVxcXFw0LXdvcmtzcGFjZVxcXFx2aXotdWkteVxcXFxwYWNrYWdlc1xcXFxjb3JlXFxcXGJ1aWxkXFxcXHZpdGUuZXMuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mcm9udCUyMHN0dWR5LzQtd29ya3NwYWNlL3Zpei11aS15L3BhY2thZ2VzL2NvcmUvYnVpbGQvdml0ZS5lcy5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xyXG5pbXBvcnQgeyByZWFkZGlyU3luYywgcmVhZGRpciB9IGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgeyBkZWZlciwgZGVsYXksIGZpbHRlciwgbWFwIH0gZnJvbSBcImxvZGFzaC1lc1wiO1xyXG5pbXBvcnQgc2hlbGwgZnJvbSBcInNoZWxsanNcIjtcclxuaW1wb3J0IHsgaG9va3NQbHVnaW4gYXMgaG9va3MgfSBmcm9tIFwiQHZpei11aS15L3ZpdGUtcGx1Z2luc1wiO1xyXG5pbXBvcnQgdGVyc2VyIGZyb20gXCJAcm9sbHVwL3BsdWdpbi10ZXJzZXJcIjtcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcclxuXHJcbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIjtcclxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiO1xyXG5jb25zdCBpc1Rlc3QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJ0ZXN0XCI7XHJcbmZ1bmN0aW9uIGdldERpcmVjdG9yaWVzU3luYyhiYXNlUGF0aDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBlbnRyaWVzID0gcmVhZGRpclN5bmMoYmFzZVBhdGgsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KTtcclxuXHJcbiAgICByZXR1cm4gbWFwKFxyXG4gICAgICAgIGZpbHRlcihlbnRyaWVzLCAoZW50cnkpID0+IGVudHJ5LmlzRGlyZWN0b3J5KCkpLFxyXG4gICAgICAgIChlbnRyeSkgPT4gZW50cnkubmFtZVxyXG4gICAgKTtcclxufVxyXG4vL1x1NzlGQlx1NTJBOHRoZW1lXHU0RTBCXHU3Njg0XHU2ODM3XHU1RjBGXHJcbmNvbnN0IFRSWV9NT1ZFX1NUWUxFU19ERUxBWSA9IDc1MCBhcyBjb25zdDtcclxuZnVuY3Rpb24gbW92ZVN0eWxlcygpIHtcclxuICAgIHJlYWRkaXIoXCIuL2Rpc3QvZXMvdGhlbWVcIiwgKGVycikgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHJldHVybiBkZWxheShtb3ZlU3R5bGVzLCBUUllfTU9WRV9TVFlMRVNfREVMQVkpO1xyXG4gICAgICAgIGRlZmVyKCgpID0+IHNoZWxsLm12KFwiLi9kaXN0L2VzL3RoZW1lXCIsIFwiLi9kaXN0XCIpKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdnVlKCksXHJcbiAgICAgICAgdmlzdWFsaXplcih7XHJcbiAgICAgICAgICAgIGZpbGVuYW1lOiBcImRpc3Qvc3RhdHMuZXMuaHRtbFwiLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGR0cyh7XHJcbiAgICAgICAgICAgIHRzY29uZmlnUGF0aDogXCIuLi8uLi90c2NvbmZpZy5idWlsZC5qc29uXCIsXHJcbiAgICAgICAgICAgIG91dERpcjogXCJkaXN0L3R5cGVzXCIsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGVyc2VyKHtcclxuICAgICAgICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICAgICAgICAgIHNlcXVlbmNlczogaXNQcm9kLFxyXG4gICAgICAgICAgICAgICAgYXJndW1lbnRzOiBpc1Byb2QsXHJcbiAgICAgICAgICAgICAgICBkcm9wX2NvbnNvbGU6IGlzUHJvZCAmJiBbXCJsb2dcIl0sXHJcbiAgICAgICAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiBpc1Byb2QsXHJcbiAgICAgICAgICAgICAgICBwYXNzZXM6IGlzUHJvZCA/IDQgOiAxLFxyXG4gICAgICAgICAgICAgICAgZ2xvYmFsX2RlZnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcIkBERVZcIjogSlNPTi5zdHJpbmdpZnkoaXNEZXYpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQFBST0RcIjogSlNPTi5zdHJpbmdpZnkoaXNQcm9kKSxcclxuICAgICAgICAgICAgICAgICAgICBcIkBURVNUXCI6IEpTT04uc3RyaW5naWZ5KGlzVGVzdCksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmb3JtYXQ6IHtcclxuICAgICAgICAgICAgICAgIHNlbWljb2xvbnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRoYW5kOiBpc1Byb2QsXHJcbiAgICAgICAgICAgICAgICBicmFjZXM6ICFpc1Byb2QsXHJcbiAgICAgICAgICAgICAgICBiZWF1dGlmeTogIWlzUHJvZCxcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiAhaXNQcm9kLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtYW5nbGU6IHtcclxuICAgICAgICAgICAgICAgIHRvcGxldmVsOiBpc1Byb2QsXHJcbiAgICAgICAgICAgICAgICBldmFsOiBpc1Byb2QsXHJcbiAgICAgICAgICAgICAgICBrZWVwX2NsYXNzbmFtZXM6IGlzRGV2LFxyXG4gICAgICAgICAgICAgICAga2VlcF9mbmFtZXM6IGlzRGV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGhvb2tzKHtcclxuICAgICAgICAgICAgcm1GaWxlczogW1xyXG4gICAgICAgICAgICAgICAgXCIuL2Rpc3QvZXNcIixcclxuICAgICAgICAgICAgICAgIFwiLi9kaXN0L3RoZW1lXCIsXHJcbiAgICAgICAgICAgICAgICBcIi4vZGlzdC90eXBlc1wiLFxyXG4gICAgICAgICAgICAgICAgXCIuL2Rpc3Qvc3RhdHMuZXMuaHRtbFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBhZnRlckJ1aWxkOiBtb3ZlU3R5bGVzLFxyXG4gICAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgb3V0RGlyOiBcImRpc3QvZXNcIixcclxuICAgICAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXHJcbiAgICAgICAgbWluaWZ5OiBmYWxzZSxcclxuICAgICAgICBsaWI6IHtcclxuICAgICAgICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uL2luZGV4LnRzXCIpLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlZpelVJXCIsXHJcbiAgICAgICAgICAgIGZpbGVOYW1lOiBcImluZGV4XCIsXHJcbiAgICAgICAgICAgIGZvcm1hdHM6IFtcImVzXCJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgICAgICAgICAgXCJ2dWVcIixcclxuICAgICAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCIsXHJcbiAgICAgICAgICAgICAgICBcIkBmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29uc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJAZm9ydGF3ZXNvbWUvdnVlLWZvbnRhd2Vzb21lXCIsXHJcbiAgICAgICAgICAgICAgICBcIkBwb3BwZXJqcy9jb3JlXCIsXHJcbiAgICAgICAgICAgICAgICBcImFzeW5jLXZhbGlkYXRvclwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgIGV4cG9ydHM6IFwibmFtZWRcIixcclxuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgICAgICAgICAgICB2dWU6IFwiVnVlXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2h1bmtJbmZvLm5hbWVzICYmIGNodW5rSW5mby5uYW1lc1swXSA9PT0gXCJzdHlsZS5jc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJpbmRleC5jc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaHVua0luZm8udHlwZSA9PT0gXCJhc3NldFwiICYmIGNodW5rSW5mby5uYW1lcyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvXFwuKGNzcykkL2kudGVzdChjaHVua0luZm8ubmFtZXNbMF0gYXMgc3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0aGVtZS9bbmFtZV0uW2V4dF1cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNodW5rSW5mby5uYW1lcyA/IGNodW5rSW5mby5uYW1lc1swXSBhcyBzdHJpbmcgOiAnJztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHJldHVybiBcInZlbmRvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIi9wYWNrYWdlcy9ob29rc1wiKSkgcmV0dXJuIFwiaG9va3NcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvcGFja2FnZXMvdXRpbHNcIikgfHwgaWQuaW5jbHVkZXMoXCJwbHVnaW4tdnVlOmV4cG9ydC1oZWxwZXJcIikpIHJldHVybiBcInV0aWxzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGdldERpcmVjdG9yaWVzU3luYyhcIi4uL2NvbXBvbmVudHNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKGAvcGFja2FnZXMvY29tcG9uZW50cy8ke2l0ZW19YCkpIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlcsU0FBUyxvQkFBb0I7QUFDMVksU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsU0FBUyxhQUFhLGVBQWU7QUFDckMsU0FBUyxPQUFPLE9BQU8sUUFBUSxXQUFXO0FBQzFDLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWUsYUFBYTtBQUNyQyxPQUFPLFlBQVk7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
