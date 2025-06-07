import ConfigProvider from './ConfigProvider.vue'
import { withInstall } from '@viz-ui-y/utils'

export const VizConfigProvider = withInstall(ConfigProvider)
export * from './types.ts'
export * from './hooks.ts'
