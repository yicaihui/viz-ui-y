import makeInstaller from './makeInstaller'
import components from './components'
//引入theme下的css
import '@viz-ui-y/theme/index.css'
//引入 图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import printLogo from './printLogo'

library.add(fas)
printLogo()
const installer = makeInstaller(components)
export * from '@viz-ui-y/components'
export * from '@viz-ui-y/locale'
export default installer
