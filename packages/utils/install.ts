import type { App, Plugin, Directive } from 'vue'
import { noop, each } from 'lodash-es'

type SFCWithInstall<T> = T & Plugin

export interface ConfigProps {
  colors?: Record<'primary', string>
}
//全局引入
export function makeInstaller(components: Plugin[]): Plugin {
  const installer = (app: App) => {
    each(components, c => {
      app.use(c)
    })
  }
  return installer as Plugin
}
//按需引入
export const withInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any)?.name
    app.component(name, component as SFCWithInstall<T>)
  }
  return component as SFCWithInstall<T>
}
