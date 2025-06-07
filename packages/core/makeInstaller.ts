import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'
import {
  provideGlobalConfig,
  type ConfigProviderProps
} from '@viz-ui-y/components'

//全局引入
export default function makeInstaller(components: Plugin[]): Plugin {
  const installer = (app: App, opt?: ConfigProviderProps) => {
    each(components, c => {
      app.use(c)
    })
    if (opt) provideGlobalConfig(opt, app, true)
  }
  return installer as Plugin
}
