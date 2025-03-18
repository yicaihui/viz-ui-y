import { makeInstaller } from "@viz-ui-y/utils";
import components from "./components";
import '@viz-ui-y/theme/index.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
const installer = makeInstaller(components);

export * from "../components";
export default installer;