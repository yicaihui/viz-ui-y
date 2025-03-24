import { makeInstaller } from '@viz-ui-y/utils'
import components from './components'
import '@viz-ui-y/theme/index.css'

const installer = makeInstaller(components)

export * from '../components'
export default installer
