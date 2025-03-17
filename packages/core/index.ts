import { makeInstaller } from "@viz-ui/utils";
import components from "./components";
import '@viz-ui/theme/index.css'

const installer = makeInstaller(components);

export * from "@viz-ui/components";
export default installer;