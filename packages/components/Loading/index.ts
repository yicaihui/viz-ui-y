import { vLoading } from './directive.ts'
import { Loading } from './service'

import type { App } from 'vue'

export const VizLoading = {
  name: 'VizLoading',
  install(app: App) {
    app.directive('loading', vLoading)
    app.config.globalProperties.$loading = Loading
  },
  directive: vLoading,
  service: Loading
}

export default VizLoading

export {
  vLoading,
  vLoading as VizLoadingDirective,
  Loading as VizLoadingService
}

export * from './types'
