import DefaultTheme from "vitepress/theme";
import { type App } from "vue";
import VizUI from "viz-ui-y";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";

// import "@vitepress-demo-preview/component/style.css";
import "viz-ui-y/dist/index.css";

export default {
    ...DefaultTheme,
    enhanceApp({ app }: { app: App }) {
        app.component("demo-preview", ElementPlusContainer);
        app.use(VizUI);
    },
};